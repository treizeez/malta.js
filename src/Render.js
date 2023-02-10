import { VDom } from "./VDom";

export const Render = (component = [{}], root = document.body) =>
  VDom.mount(component).map((node) => {
    return node && root.appendChild(node);
  });
