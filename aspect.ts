

export class Aspect {
  private aspectMap = new Map< Function, Map< string, Map< string, Function[] > > >();

  /**
   * Obtain advice list from the storage
   * @param {Function} Ctor - Pointcut constructor
   * @param {string} method - Pointcut method
   * @param {string} point - "before", "after"
   * @return Function[]
   */
  getAdvicelist( Ctor: Function, method: string, point: string ): Function[] {
    let prevCtor = this.aspectMap.get( Ctor ) || new Map< string, Map< string, Function[] > >();
    let prevMethod = prevCtor.get( method ) || new Map< string, Function[] >();
    return prevMethod.get( point ) || [];
  }
  /**
   * Persist modified advice list in the storage
   * @param {Function} Ctor - Pointcut constructor
   * @param {string} method - Pointcut method
   * @param {string} point - "before", "after"
   * @param {Function[]} advices - array of callbacks
   */
  setAdvicelist( Ctor: Function, method: string, point: string, advices: Function[] ) {
    let newCtor = this.aspectMap.get( Ctor ) || new Map< string, Map< string, Function[] > >();
    let nextMethod = newCtor.get( method ) || new Map< string, Function[] >();
    nextMethod.set( point, advices );
    newCtor.set( method, nextMethod );
    this.aspectMap.set( Ctor, newCtor );
  }

  /**
   * Add advice for pre-execution
   * @param {Function} Ctor - Pointcut constructor
   * @param {string} method - Pointcut method
   * @param {Function} advice
   */
  addAdviceBefore( Ctor: Function, method: string, advice: Function ) {
    let advices = this.getAdvicelist( Ctor, method, "before" );
    advices.push( advice );
    this.setAdvicelist( Ctor, method, "before", advices );
  }

  /**
   * Add advice for post-execution
   * @param {Function} Ctor - Pointcut constructor
   * @param {string} method - Pointcut method
   * @param {Function} advice
   */
  addAdviceAfter( Ctor: Function, method: string, advice: Function ) {
    let advices = this.getAdvicelist( Ctor, method, "after" );
    advices.push( advice );
    this.setAdvicelist( Ctor, method, "after", advices );
  }
}

let aspect = new Aspect();


/**
 * Decorator to map pre-execution advice to a pointcut
 * @param {Function} Ctor - Pointcut constructor
 * @param {string} method - Pointcut method
 */
export function Before( Ctor: Function, method: string ) {
  return function(target: Object | Function, propKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const callback = descriptor.value;
    aspect.addAdviceBefore( Ctor, method, callback );
    return descriptor;
  };
}

/**
 * Decorator to map post-execution advice to a pointcut
 * @param {Function} Ctor - Pointcut constructor
 * @param {string} method - Pointcut method
 */
export function After( Ctor: Function, method: string ) {
  return function(target: Object | Function, propKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const callback = descriptor.value;
    aspect.addAdviceAfter( Ctor, method, callback );
    return descriptor;
  };
}

/**
 * Decorator to resolve the pointcut
 */
export function Pointcut( target: Object | Function, method: string,
  descriptor: PropertyDescriptor ): PropertyDescriptor {

  const callback = descriptor.value,
    Ctor = <Function>( ( typeof target === "function" ) ? target : target.constructor );

  return <PropertyDescriptor>Object.assign({}, descriptor, {
    value: function() {

      const args = Array.from( arguments );
      aspect.getAdvicelist( Ctor, method, "before" ).forEach(( cb ) => {
        cb.apply( this, args );
      });
      let retVal = callback.apply( this, args );
      aspect.getAdvicelist( Ctor, method, "after" ).forEach(( cb ) => {
        cb.apply( this, args );
      });
      return retVal;
    }
  });
}
