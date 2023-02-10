import { Dom } from "./Dom";
import { initEvents } from "./Events";

const isFunction = (arg) => (typeof arg === "function" ? arg() : arg);

export class VDom {
  static mount(nodes) {
    return nodes.map((node) => {
      const context = {};

      if (typeof node === "function") {
        node.root = context;
      }

      const withContext = typeof node === "function" && node.bind(context); //binding dom to vdom component

      const component = withContext ? withContext() : node; //check if component is a function or object

      if (component) {
        context.root = new Dom(component).init();

        context.root.$component = node; //binding vdom component to dom

        context.root.$current = component;

        //if vdom node has child, executing recursive function
        if (component?.content) {
          this.mount(component.content).map(
            (content) => content && context.root.appendChild(content) //append new child node to a parent node
          );
        }

        return context.root;
      }
    });
  }

  static update({ current, next, el }) {
    if (current.tag !== next?.tag) {
      return el.replaceWith(this.mount([next])[0]);
    }

    if (current.content || next.content) {
      for (let i = 0; i < el.children.length; i++) {
        while (!next.content[i] && el.children[i]) {
          el.removeChild(el.children[i]);
        }

        let component = next.content[i];

        if (typeof next.content[i] === "function") {
          el.children[i].$component = next.content[i];
          component = next.content[i].bind({ root: el.children[i] });
        }

        if (el.children[i]) {
          this.update({
            current: el.children[i].$current,
            next: isFunction(component),
            el: el.children[i],
          });
        }
      }

      for (let i = 0; i < next.content.length; i++) {
        if (!el.children[i]) {
          const mounted = this.mount([next.content[i]])[0];

          mounted && el.appendChild(mounted);
        }
      }
    }

    if (next?.attrs) {
      Object.keys(next.attrs).map((attribute) =>
        el.setAttribute(attribute, next.attrs[attribute])
      );
    }

    if (current.textNode || next?.textNode) {
      if (current.textNode !== next.textNode) {
        const nodes = el?.childNodes;
        for (const i in nodes) {
          if (nodes[i].nodeName === "#text") {
            nodes[i].nodeValue = next.textNode;
          }
        }
      }
    }

    initEvents({ node: next, el });

    el.$current = next;
  }
}