import { Aspect, Before, After, Pointcut } from "../aspect";
const expect = chai.expect;

describe( "Aspect", function(){
  beforeEach(function(){
    this.aspect = new Aspect();
  });
  describe( "getAdvicelist", function(){
    it( "returns [] on initial run", function() {
      let advices = this.aspect.getAdvicelist( Aspect, "foo", "before" );
      expect( advices ).to.eql( [] );
    });
  });
  describe( "setAdvicelist", function(){
    it( "modifies target list in the storage", function() {
      this.aspect.setAdvicelist( Aspect, "foo", "before", [ 1 ] );
      let advices = this.aspect.getAdvicelist( Aspect, "foo", "before" );
      expect( advices ).to.eql( [ 1 ] );
    });
  });

  describe( "addAdviceBefore", function(){
    it( "pushes advice to the before-list", function() {
      let fn = function fixture(){};
      this.aspect.addAdviceBefore( Aspect, "foo", fn );
      let advices = this.aspect.getAdvicelist( Aspect, "foo", "before" ),
          advice = advices.shift();
      expect( advice ).to.eql( fn );
    });
  });

  describe( "addAdviceAfter", function(){
    it( "pushes advice to the after-list", function() {
      let fn = function fixture(){};
      this.aspect.addAdviceAfter( Aspect, "foo", fn );
      let advices = this.aspect.getAdvicelist( Aspect, "foo", "after" ),
          advice = advices.shift();
      expect( advice ).to.eql( fn );
    });
  });

});


describe( "@Pointcut/@Before", function(){
    it( "maps an advice to a pointcut", function() {
      let calls:string[] = [];
      class Foo {
        @Pointcut
        bar(){
          calls.push( "pointcut" );
        }
      }

      class Advice {
        @Before( Foo, "bar" )
        log() {
          calls.push( "advice" );
        }
      }
      (new Foo()).bar();
      expect( calls.shift() ).to.eql( "advice" );
      expect( calls.shift() ).to.eql( "pointcut" );
    });

    it( "maps an advice to a pointcut (static advice)", function() {
      let calls:string[] = [];
      class Foo {
        @Pointcut
        bar(){
          calls.push( "pointcut" );
        }
      }

      class Advice {
        @Before( Foo, "bar" )
        static log() {
          calls.push( "advice" );
        }
      }
      (new Foo()).bar();
      expect( calls.shift() ).to.eql( "advice" );
      expect( calls.shift() ).to.eql( "pointcut" );
    });

    it( "maps an advice to a pointcut (static pointcut)", function() {
      let calls:string[] = [];
      class Foo {
        @Pointcut
        static bar(){
          calls.push( "pointcut" );
        }
      }

      class Advice {
        @Before( Foo, "bar" )
        log() {
          calls.push( "advice" );
        }
      }
      Foo.bar();
      expect( calls.shift() ).to.eql( "advice" );
      expect( calls.shift() ).to.eql( "pointcut" );
    });

});


describe( "@Pointcut/@After", function(){
    it( "maps an advice to a pointcut", function() {
      let calls:string[] = [];
      class Foo {
        @Pointcut
        bar(){
          calls.push( "pointcut" );
        }
      }

      class Advice {
        @After( Foo, "bar" )
        log() {
          calls.push( "advice" );
        }
      }
      (new Foo()).bar();
      expect( calls.shift() ).to.eql( "pointcut" );
      expect( calls.shift() ).to.eql( "advice" );
    });
});

describe( "@Pointcut", function(){
    it( "does not lose the return value", function() {
      class Foo {
        @Pointcut
        bar(){
          return "bar";
        }
      }

      class Advice {
        @Before( Foo, "bar" )
        log() {
        }
      }
      let ret = (new Foo()).bar();
      expect( ret ).to.eql( "bar" );
    });
    it( "does not lose the context", function() {
      class Foo {
        quiz = "quiz";
        @Pointcut
        bar(){
          return this.baz();
        }
        baz(){
          return "baz";
        }
      }

      class Advice {
        @Before( Foo, "bar" )
        log() {
        }
      }
      let foo = new Foo();
      expect( foo.bar() ).to.eql( "baz" );
      expect( foo.quiz ).to.eql( "quiz" );

    });
});