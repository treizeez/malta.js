"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = void 0;
const VDom_1 = require("./VDom");
const Render = (component, root = document.body) => {
  if (Array.isArray(component)) {
    return component.forEach(node => {
      const mounted = VDom_1.VDom.mount(node);
      mounted && root.appendChild(mounted);
    });
  }
  const mounted = VDom_1.VDom.mount(component);
  mounted && root.appendChild(mounted);
};
exports.Render = Render;