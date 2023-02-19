import { MaltaElement } from "./types";

import { VDom } from "./VDom";

export const Render = (
  component: MaltaElement[] | MaltaElement,
  root: HTMLElement = document.body
): void => {
  if (Array.isArray(component)) {
    return component.forEach((node) => {
      const mounted = VDom.mount(node);
      mounted && root.appendChild(mounted);
    });
  }

  const mounted = VDom.mount(component);
  mounted && root.appendChild(mounted);
};
