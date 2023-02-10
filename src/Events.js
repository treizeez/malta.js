export const initEvents = ({ node, el }) =>
  Object.keys(node).map((key) => {
    if (key.startsWith("on")) {
      const event = key.toLowerCase();
      const func = node[key];
      el[event] = func;
    }
  });
