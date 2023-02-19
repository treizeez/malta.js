import { MaltaElement, MaltaDom } from "./types";

import { compareObjects } from "./utils/compareObjects";
import { Dom } from "./Dom";

const isFunction = (arg) => (typeof arg === "function" ? arg() : arg);

export interface Update {
  current: MaltaElement;
  next: MaltaElement;
  el: MaltaDom;
}

export class VDom {
  static mount(node: Function | MaltaElement) {
    const dom = new Dom({ node: isFunction(node) });

    if (dom.node) {
      dom.create();

      if (typeof node === "function") {
        dom.el.$component = node;
        node.call(dom.el);
      }

      dom.setAttributes();
      dom.textNode();
      dom.style();
      dom.initEvents();

      if (dom.node.content) {
        if (Array.isArray(dom.node.content)) {
          dom.node.content.forEach((c) => {
            if (typeof c !== "boolean") {
              const mounted = this.mount(c);
              mounted && dom.el.appendChild(mounted);
            }
          });
        } else {
          const mounted = this.mount(dom.node.content);

          mounted && dom.el.appendChild(mounted);
        }
      }

      return dom.el;
    }
  }

  static update({ current, next, el }: Update) {
    if (current.tag !== next?.tag) {
      const newEl = this.mount(next);
      newEl && el.replaceWith(newEl);
    }

    const { content, attrs, textNode, style } = next;

    const isStyleSame = style && compareObjects(current.style, style);

    const updatedDom = new Dom({ node: next, el });

    if (content) {
      for (let i = 0; i < el.children.length; i++) {
        const nextContent = content[i];

        while (!nextContent && el.children[i]) {
          el.removeChild(el.children[i]);
        }

        if (typeof nextContent === "function") {
          el.children[i].$component = nextContent;
          nextContent.call(el.children[i]);
        }

        if (el.children[i]) {
          this.update({
            current: el.children[i].$current,
            next: isFunction(nextContent),
            el: el.children[i],
          });
        }
      }

      for (const i in content) {
        if (!el.children[i]) {
          const mounted = this.mount(content[i]);

          mounted && el.appendChild(mounted);
        }
      }
    }

    if (attrs) {
      updatedDom.setAttributes();
    }

    if (!isStyleSame) {
      updatedDom.style();
    }

    if (textNode) {
      if (current?.textNode !== textNode) {
        const nodes = el?.childNodes;
        for (const i in nodes) {
          if (nodes[i].nodeName === "#text") {
            nodes[i].nodeValue = textNode;
          }
        }
      }
    }

    updatedDom.initEvents();

    el.$current = next;
  }
}
