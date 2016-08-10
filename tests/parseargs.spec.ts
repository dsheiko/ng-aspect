import { parseArgs } from "../aspect";
const expect = chai.expect;

export function ParseArgsSpec() {
  describe( "parseArgs", function(){
      it( "returns MappingArray when ( Ctor, method )", function() {
        let Ctor = function Ctor(){},
            method = "method",
            ret = parseArgs( Ctor, method );
        expect( ret[ 0 ][ 0 ] ).to.eql( Ctor );
        expect( ret[ 0 ][ 1 ] ).to.eql( method );
      });
      it( "returns MappingArray when ([ Ctor, method ])", function() {
        let Ctor = function Ctor(){},
            method = "method",
            ret = parseArgs([ Ctor, method ]);
        expect( ret[ 0 ][ 0 ] ).to.eql( Ctor );
        expect( ret[ 0 ][ 1 ] ).to.eql( method );
      });
      it( "returns MappingArray when ([[ Ctor, method ], .. ])", function() {
        let Ctor = function Ctor(){},
            method = "method",
            ret = parseArgs([ [ Ctor, method ], [ Ctor, method ] ]);

        expect( ret[ 0 ][ 0 ] ).to.eql( Ctor );
        expect( ret[ 0 ][ 1 ] ).to.eql( method );
      });
  });
}
