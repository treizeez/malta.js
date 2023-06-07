export const compareObjects = (o1, o2) => {
  let same = true;

  for (const key in o1) {
    if (typeof o1[key] === "object") {
      return compareObjects(o1[key], o2[key]);
    }

    if (o1[key] !== o2[key]) {
      same = false;
    }
  }

  return same;
};

export const isFunction = (arg) => (typeof arg === "function" ? arg() : arg);
