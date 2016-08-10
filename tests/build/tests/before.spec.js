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
function BeforeSpec() {
    describe("@Pointcut/@Before", function () {
        it("maps an advice to a pointcut as @Before( Foo, 'bar' )", function () {
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
                    aspect_1.Before(Foo, "bar"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice.prototype, "log", null);
                return Advice;
            }());
            (new Foo()).bar();
            expect(calls.shift()).to.eql("advice");
            expect(calls.shift()).to.eql("pointcut");
        });
        it("maps an advice to a pointcut as @Before([ Foo, 'bar' ])", function () {
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
                    aspect_1.Before([Foo, "bar"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice.prototype, "log", null);
                return Advice;
            }());
            (new Foo()).bar();
            expect(calls.shift()).to.eql("advice");
            expect(calls.shift()).to.eql("pointcut");
        });
        it("maps an advice to a pointcut as @Before([[ Foo, 'bar' ],..])", function () {
            var calls = [];
            var Foo = (function () {
                function Foo() {
                }
                Foo.prototype.bar = function () {
                    calls.push("bar");
                };
                Foo.prototype.baz = function () {
                    calls.push("baz");
                };
                __decorate([
                    aspect_1.Pointcut, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Foo.prototype, "bar", null);
                __decorate([
                    aspect_1.Pointcut, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Foo.prototype, "baz", null);
                return Foo;
            }());
            var Advice = (function () {
                function Advice() {
                }
                Advice.prototype.log = function () {
                    calls.push("advice");
                };
                __decorate([
                    aspect_1.Before([
                        [Foo, "bar"],
                        [Foo, "baz"]
                    ]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice.prototype, "log", null);
                return Advice;
            }());
            (new Foo()).bar();
            (new Foo()).baz();
            expect(calls).to.include("advice");
            expect(calls).to.include("bar");
            expect(calls).to.include("baz");
        });
        it("maps an advice to a pointcut (static advice)", function () {
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
                Advice.log = function () {
                    calls.push("advice");
                };
                __decorate([
                    aspect_1.Before(Foo, "bar"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice, "log", null);
                return Advice;
            }());
            (new Foo()).bar();
            expect(calls.shift()).to.eql("advice");
            expect(calls.shift()).to.eql("pointcut");
        });
        it("maps an advice to a pointcut (static pointcut)", function () {
            var calls = [];
            var Foo = (function () {
                function Foo() {
                }
                Foo.bar = function () {
                    calls.push("pointcut");
                };
                __decorate([
                    aspect_1.Pointcut, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Foo, "bar", null);
                return Foo;
            }());
            var Advice = (function () {
                function Advice() {
                }
                Advice.prototype.log = function () {
                    calls.push("advice");
                };
                __decorate([
                    aspect_1.Before(Foo, "bar"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Advice.prototype, "log", null);
                return Advice;
            }());
            Foo.bar();
            expect(calls.shift()).to.eql("advice");
            expect(calls.shift()).to.eql("pointcut");
        });
    });
}
exports.BeforeSpec = BeforeSpec;
