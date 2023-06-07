"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dom = void 0;
const CssEngine_1 = require("./CssEngine");
class Dom {
  constructor({
    node,
    el
  }) {
    if (node) {
      this.node = node;
    }
    if (el) {
      this.el = el;
    }
  }
  create() {
    const maltaExt = document.createElement(this.node.tag);
    maltaExt.$current = this.node;
    this.el = maltaExt;
  }
  setAttributes() {
    var _a;
    const attributes = (_a = this.node) === null || _a === void 0 ? void 0 : _a.attrs;
    if (attributes) {
      for (const attribute in attributes) {
        this.el.setAttribute(attribute, attributes[attribute]);
      }
    }
  }
  textNode() {
    var _a;
    const textNode = (_a = this.node) === null || _a === void 0 ? void 0 : _a.textNode;
    if (textNode) {
      const text = document.createTextNode(textNode);
      this.el.appendChild(text);
    }
  }
  initEvents() {
    for (const key in this.node) {
      if (key.startsWith("on")) {
        const event = key.toLowerCase();
        const func = this.node[key];
        this.el[event] = func;
      }
    }
  }
  style() {
    var _a;
    if (this.node.style) {
      if (this.node.style["inline"]) {
        return this.el.setAttribute("style", CssEngine_1.CssInJs.inline(this.node.style).main);
      }
      const css = CssEngine_1.CssInJs.toCss((_a = this.node) === null || _a === void 0 ? void 0 : _a.style);
      return this.el.classList.add(css);
    }
  }
}
exports.Dom = Dom;