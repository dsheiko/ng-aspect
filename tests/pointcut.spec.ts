import { Before, After, Pointcut } from "../aspect";
const expect = chai.expect;

export function PointcutSpec() {

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
}
