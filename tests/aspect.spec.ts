import { Aspect, Before, After, Pointcut } from "../aspect";
const expect = chai.expect;

export function AspectSpec() {
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
}
