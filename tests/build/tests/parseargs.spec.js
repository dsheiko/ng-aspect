"use strict";
var aspect_1 = require("../aspect");
var expect = chai.expect;
function ParseArgsSpec() {
    describe("parseArgs", function () {
        it("returns MappingArray when ( Ctor, method )", function () {
            var Ctor = function Ctor() { }, method = "method", ret = aspect_1.parseArgs(Ctor, method);
            expect(ret[0][0]).to.eql(Ctor);
            expect(ret[0][1]).to.eql(method);
        });
        it("returns MappingArray when ([ Ctor, method ])", function () {
            var Ctor = function Ctor() { }, method = "method", ret = aspect_1.parseArgs([Ctor, method]);
            expect(ret[0][0]).to.eql(Ctor);
            expect(ret[0][1]).to.eql(method);
        });
        it("returns MappingArray when ([[ Ctor, method ], .. ])", function () {
            var Ctor = function Ctor() { }, method = "method", ret = aspect_1.parseArgs([[Ctor, method], [Ctor, method]]);
            expect(ret[0][0]).to.eql(Ctor);
            expect(ret[0][1]).to.eql(method);
        });
    });
}
exports.ParseArgsSpec = ParseArgsSpec;
