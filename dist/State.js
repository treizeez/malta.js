"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.StateStack = void 0;
const VDom_1 = require("./VDom");
class StateStack {
    static get stack() {
        return this.data;
    }
    static push(component) {
        this.data.add(component);
    }
    static reset() {
        this.data.clear();
    }
    static setContext(context) {
        for (const state of this.data) {
            state.apply(context);
        }
    }
}
exports.StateStack = StateStack;
StateStack.data = new Set();
function State(arg) {
    const subscribers = new Set();
    const callbacks = new Set();
    let initialValue = arg;
    function setState(value) {
        if (value !== initialValue) {
            for (const callback of callbacks) {
                callback();
            }
            if (typeof value === "function") {
                initialValue = value(initialValue);
            }
            else {
                initialValue = value;
            }
            for (const dom of subscribers) {
                const component = dom.el.$component;
                if (component) {
                    const next = component();
                    VDom_1.VDom.update({
                        current: dom.el.$current,
                        next,
                        el: dom.el,
                    });
                    StateStack.reset();
                }
            }
        }
    }
    function getState() {
        StateStack.push(getState);
        if (this) {
            subscribers.add(this);
        }
        return initialValue;
    }
    getState.effect = function (callback) {
        callbacks.add(callback);
    };
    return [getState, setState];
}
exports.State = State;
//# sourceMappingURL=State.js.map