export function Before( Ctor: Function, method: string );
export function After( Ctor: Function, method: string );
export function Pointcut( target: Object | Function, method: string,
  descriptor: PropertyDescriptor ): PropertyDescriptor;

