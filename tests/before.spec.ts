import { Before, Pointcut } from "../aspect";
const expect = chai.expect;

export function BeforeSpec() {


  describe( "@Pointcut/@Before", function(){

      it( "maps an advice to a pointcut as @Before( Foo, 'bar' )", function() {
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


      it( "maps an advice to a pointcut as @Before([ Foo, 'bar' ])", function() {
        let calls:string[] = [];
        class Foo {
          @Pointcut
          bar(){
            calls.push( "pointcut" );
          }
        }

        class Advice {
          @Before([ Foo, "bar" ])
          log() {
            calls.push( "advice" );
          }
        }
        (new Foo()).bar();
        expect( calls.shift() ).to.eql( "advice" );
        expect( calls.shift() ).to.eql( "pointcut" );
      });


      it( "maps an advice to a pointcut as @Before([[ Foo, 'bar' ],..])", function() {
        let calls:string[] = [];
        class Foo {
          @Pointcut
          bar(){
            calls.push( "bar" );
          }
          @Pointcut
          baz(){
            calls.push( "baz" );
          }
        }

        class Advice {
          @Before([
            [ Foo, "bar" ],
            [ Foo, "baz" ]
          ])
          log() {
            calls.push( "advice" );
          }
        }
        (new Foo()).bar();
        (new Foo()).baz();
        expect( calls ).to.include( "advice" );
        expect( calls ).to.include( "bar" );
        expect( calls ).to.include( "baz" );
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


}
