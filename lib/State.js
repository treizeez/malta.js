"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = void 0;
const VDom_1 = require("./VDom");
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
      } else {
        initialValue = value;
      }
      for (const el of subscribers) {
        const component = el.$component;
        if (component) {
          VDom_1.VDom.update({
            current: el.$current,
            next: component(),
            el
          });
        }
      }
    }
  }
  function getState(context) {
    if (context) {
      subscribers.add(context);
    }
    return initialValue;
  }
  getState.effect = function (callback) {
    callbacks.add(callback);
  };
  return [getState, setState];
}
exports.State = State;