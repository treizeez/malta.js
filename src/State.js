import { VDom } from "./VDom";

export function State(arg) {
  const subscribers = new Set();

  let initialValue = arg;

  function setState(value) {
    if (value !== initialValue) {
      initialValue = value;
      Array.from(subscribers).map((value) => {
        VDom.update({
          current: value.$current,
          next: value.$component(),
          el: value,
        });
      });
    }
  }

  function getState(context) {
    if (context) {
      subscribers.add(context);
    }
    return initialValue;
  }

  return [getState, setState];
}
