import { initEvents } from "./Events";

export class Dom {
  constructor(node) {
    this.node = node;
  }

  create() {
    this.el = document.createElement(this.node.tag);
  }

  setAttributes() {
    const attributes = this.node?.attrs;
    if (attributes) {
      Object.keys(attributes).map((attribute) =>
        this.el.setAttribute(attribute, attributes[attribute])
      );
    }
  }

  textNode() {
    const textNode = this.node?.textNode;
    if (textNode) {
      const text = document.createTextNode(textNode);
      this.el.appendChild(text);
    }
  }

  init() {
    this.create();
    this.setAttributes();
    this.textNode();
    initEvents({ node: this.node, el: this.el });
    return this.el;
  }
}
