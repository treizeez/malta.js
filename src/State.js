import { VDom } from "./VDom";

export function State(arg) {
  const subscribers = new Set();

  let initialValue = arg;

  function setState(value) {
    if (value !== initialValue) {
      initialValue = value;
      Array.from(subscribers).map((value) => {
        if (value.root?.$component) {
          VDom.update({
            current: value.root?.$current,
            next: value.root?.$component(),
            el: value.root,
          });
        }
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
