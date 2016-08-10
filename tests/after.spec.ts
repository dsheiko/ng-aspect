import { After, Pointcut } from "../aspect";
const expect = chai.expect;

export function AfterSpec() {
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

}
