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
describe("Aspect", function () {
    beforeEach(function () {
        this.aspect = new aspect_1.Aspect();
    });
    describe("getAdvicelist", function () {
        it("returns [] on initial run", function () {
            var advices = this.aspect.getAdvicelist(aspect_1.Aspect, "foo", "before");
            expect(advices).to.eql([]);
        });
    });
    describe("setAdvicelist", function () {
        it("modifies target list in the storage", function () {
            this.aspect.setAdvicelist(aspect_1.Aspect, "foo", "before", [1]);
            var advices = this.aspect.getAdvicelist(aspect_1.Aspect, "foo", "before");
            expect(advices).to.eql([1]);
        });
    });
    describe("addAdviceBefore", function () {
        it("pushes advice to the before-list", function () {
            var fn = function fixture() { };
            this.aspect.addAdviceBefore(aspect_1.Aspect, "foo", fn);
            var advices = this.aspect.getAdvicelist(aspect_1.Aspect, "foo", "before"), advice = advices.shift();
            expect(advice).to.eql(fn);
        });
    });
    describe("addAdviceAfter", function () {
        it("pushes advice to the after-list", function () {
            var fn = function fixture() { };
            this.aspect.addAdviceAfter(aspect_1.Aspect, "foo", fn);
            var advices = this.aspect.getAdvicelist(aspect_1.Aspect, "foo", "after"), advice = advices.shift();
            expect(advice).to.eql(fn);
        });
    });
});
describe("@Pointcut/@Before", function () {
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
describe("@Pointcut", function () {
    it("does not lose the return value", function () {
        var Foo = (function () {
            function Foo() {
            }
            Foo.prototype.bar = function () {
                return "bar";
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
            };
            __decorate([
                aspect_1.Before(Foo, "bar"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], Advice.prototype, "log", null);
            return Advice;
        }());
        var ret = (new Foo()).bar();
        expect(ret).to.eql("bar");
    });
    it("does not lose the context", function () {
        var Foo = (function () {
            function Foo() {
            }
            Foo.prototype.bar = function () {
                return this.baz();
            };
            Foo.prototype.baz = function () {
                return "baz";
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
            };
            __decorate([
                aspect_1.Before(Foo, "bar"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], Advice.prototype, "log", null);
            return Advice;
        }());
        var ret = (new Foo()).bar();
        expect(ret).to.eql("baz");
    });
});
