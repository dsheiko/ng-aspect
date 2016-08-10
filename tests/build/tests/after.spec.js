"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aspect_1 = require("../aspect");
var expect = chai.expect;
function AfterSpec() {
    describe("@Pointcut/@After", function () {
        it("maps an advice to a pointcut", function () {
            var calls = [];
            var Foo = (function () {
                function Foo() {
                }
                Foo.prototype.bar = function () {
                    calls.push("pointcut");
                };
                __decorate([
                    aspect_1.Pointcut, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Foo.prototype, "bar", null);
                return Foo;
            }());
            var Advice = (function () {
                function Advice() {
                }
                Advice.prototype.log = function () {
                    calls.push("advice");
                };
                __decorate([
                    aspect_1.After(Foo, "bar"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice.prototype, "log", null);
                return Advice;
            }());
            (new Foo()).bar();
            expect(calls.shift()).to.eql("pointcut");
            expect(calls.shift()).to.eql("advice");
        });
    });
}
exports.AfterSpec = AfterSpec;
