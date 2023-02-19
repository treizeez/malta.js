import { StatefulFunction } from "./types";

export const MakeEffect = (callback: Function, deps: StatefulFunction[]) => {
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

  return deps.forEach((dep) => dep.effect && dep.effect(effectCallback));
};
