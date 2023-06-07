import { CssInJs } from "./CssEngine";
import { MaltaElement, MaltaDom } from "./types";

export class Dom {
  public node: MaltaElement;
  public el: MaltaDom;

  constructor({ node, el }: { node?: MaltaElement; el?: MaltaDom }) {
    if (node) {
      this.node = node;
    }
    if (el) {
      this.el = el;
    }
  }

  create() {
    const maltaExt: any = document.createElement(this.node.tag);
    maltaExt.$current = this.node;

    this.el = maltaExt;
  }

  setAttributes() {
    const attributes = this.node?.attrs;
    if (attributes) {
      for (const attribute in attributes) {
        this.el.setAttribute(attribute, attributes[attribute]);
      }
    }
  }

  textNode() {
    const textNode = this.node?.textNode;
    if (textNode && typeof textNode !== "boolean") {
      const text = document.createTextNode(String(textNode));
      this.el.appendChild(text);
    }
  }

  initEvents() {
    for (const key in this.node) {
      if (key.startsWith("on")) {
        const event = key.toLowerCase();
        const func: (event?: Event) => any = this.node[key];
        this.el[event] = func;
      }
    }
  }

  style() {
    if (this.node.style) {
      if (this.node.style["inline"]) {
        return this.el.setAttribute(
          "style",
          CssInJs.inline(this.node.style).main
        );
      }

      const classList = this.el.classList;

      classList.forEach((name) => {
        if (name.startsWith("malta")) {
          return classList.remove(name);
        }
      });

      const css = CssInJs.toCss(this.node?.style);
      return this.el.classList.add(css);
    }
  }
}
