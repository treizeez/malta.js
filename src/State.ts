import { Dom } from "./Dom";
import { MaltaDom } from "./types";
import { VDom } from "./VDom";

export class StateStack {
  private static data: Set<Function> = new Set();

  public static get stack(): Set<Function> {
    return this.data;
  }

  public static push(component: Function): void {
    this.data.add(component);
  }

  public static reset(): void {
    this.data.clear();
  }

  public static setContext(context: Dom): void {
    for (const state of this.data) {
      state.apply(context);
    }
  }
}

export function State<T>(
  arg: T
): [() => T, (value: T | ((prev: T) => T)) => void] {
  const subscribers: Set<Dom> = new Set();
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

      for (const dom of subscribers) {
        const component = dom.el.$component;
        if (component) {
          const next = component();
          VDom.update({
            current: dom.el.$current,
            next,
            el: dom.el,
          });
          StateStack.reset();
        }
      }
    }
  }

  function getState(): T {
    StateStack.push(getState);
    if (this) {
      subscribers.add(this);
    }

    return initialValue;
  }

  getState.effect = function (callback: Function) {
    callbacks.add(callback);
  };

  return [getState, setState];
}
