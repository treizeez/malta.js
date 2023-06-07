"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeEffect = void 0;
const MakeEffect = (callback, deps) => {
    if (deps.length === 0) {
        return callback();
    }
    let depsChanged = false;
    const effectCallback = () => {
        if (!depsChanged) {
            depsChanged = true;
            Promise.resolve().then(() => {
                depsChanged = false;
                callback();
            });
        }
    };
    return deps.forEach((dep) => {
        dep.effect && dep.effect(effectCallback);
    });
};
exports.MakeEffect = MakeEffect;
//# sourceMappingURL=MakeEffect.js.map