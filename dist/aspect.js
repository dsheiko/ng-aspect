"use strict";
var Aspect = (function () {
    function Aspect() {
        this.aspectMap = new Map();
    }
    /**
     * Obtain advice list from the storage
     * @param {Function} Ctor - Pointcut constructor
     * @param {string} method - Pointcut method
     * @param {string} point - "before", "after"
     * @return Function[]
     */
    Aspect.prototype.getAdvicelist = function (Ctor, method, point) {
        var prevCtor = this.aspectMap.get(Ctor) || new Map();
        var prevMethod = prevCtor.get(method) || new Map();
        return prevMethod.get(point) || [];
    };
    /**
     * Persist modified advice list in the storage
     * @param {Function} Ctor - Pointcut constructor
     * @param {string} method - Pointcut method
     * @param {string} point - "before", "after"
     * @param {Function[]} advices - array of callbacks
     */
    Aspect.prototype.setAdvicelist = function (Ctor, method, point, advices) {
        var newCtor = this.aspectMap.get(Ctor) || new Map();
        var nextMethod = newCtor.get(method) || new Map();
        nextMethod.set(point, advices);
        newCtor.set(method, nextMethod);
        this.aspectMap.set(Ctor, newCtor);
    };
    /**
     * Add advice for pre-execution
     * @param {Function} Ctor - Pointcut constructor
     * @param {string} method - Pointcut method
     * @param {Function} advice
     */
    Aspect.prototype.addAdviceBefore = function (Ctor, method, advice) {
        var advices = this.getAdvicelist(Ctor, method, "before");
        advices.push(advice);
        this.setAdvicelist(Ctor, method, "before", advices);
    };
    /**
     * Add advice for post-execution
     * @param {Function} Ctor - Pointcut constructor
     * @param {string} method - Pointcut method
     * @param {Function} advice
     */
    Aspect.prototype.addAdviceAfter = function (Ctor, method, advice) {
        var advices = this.getAdvicelist(Ctor, method, "after");
        advices.push(advice);
        this.setAdvicelist(Ctor, method, "after", advices);
    };
    return Aspect;
}());
exports.Aspect = Aspect;
var aspect = new Aspect();
/**
 * Decorator to map pre-execution advice to a pointcut
 * @param {Function} Ctor - Pointcut constructor
 * @param {string} method - Pointcut method
 */
function Before(Ctor, method) {
    return function (target, propKey, descriptor) {
        var callback = descriptor.value;
        aspect.addAdviceBefore(Ctor, method, callback);
        return descriptor;
    };
}
exports.Before = Before;
/**
 * Decorator to map post-execution advice to a pointcut
 * @param {Function} Ctor - Pointcut constructor
 * @param {string} method - Pointcut method
 */
function After(Ctor, method) {
    return function (target, propKey, descriptor) {
        var callback = descriptor.value;
        aspect.addAdviceAfter(Ctor, method, callback);
        return descriptor;
    };
}
exports.After = After;
/**
 * Decorator to resolve the pointcut
 */
function Pointcut(target, method, descriptor) {
    var callback = descriptor.value, context = (typeof target === "function") ? null : target, Ctor = ((typeof target === "function") ? target : target.constructor);
    return Object.assign({}, descriptor, {
        value: function () {
            console.info("CTX", this);
            var args = Array.from(arguments);
            aspect.getAdvicelist(Ctor, method, "before").forEach(function (cb) {
                cb.apply(context, args);
            });
            var retVal = callback.apply(context, args);
            aspect.getAdvicelist(Ctor, method, "after").forEach(function (cb) {
                cb.apply(context, args);
            });
            return retVal;
        }
    });
}
exports.Pointcut = Pointcut;
