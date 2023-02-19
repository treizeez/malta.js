import { MaltaDom } from "./types";
import { VDom } from "./VDom";

export function State<T>(
  arg: T
): [(context?: MaltaDom) => T, (value: T | ((prev: T) => T)) => void] {
  const subscribers: Set<MaltaDom> = new Set();
  const callbacks: Set<Function> = new Set();

  let initialValue: T = arg;

  function setState(value: T | ((prev: T) => T)) {
    if (value !== initialValue) {
      for (const callback of callbacks) {
        callback();
      }
      if (typeof value === "function") {
        initialValue = (value as (prev: T) => T)(initialValue);
      } else {
        initialValue = value;
      }
      for (const el of subscribers) {
        const component = el.$component;
        if (component) {
          VDom.update({
            current: el.$current,
            next: component(),
            el,
          });
        }
      }
    }
  }

  function getState(context?: MaltaDom): T {
    if (context) {
      subscribers.add(context);
    }
    return initialValue;
  }

  getState.effect = function (callback: Function) {
    callbacks.add(callback);
  };

  return [getState, setState];
}
