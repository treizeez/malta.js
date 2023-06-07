"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareObjects = void 0;
const compareObjects = (o1, o2) => {
  let same = true;
  for (const key in o1) {
    if (typeof o1[key] === "object") {
      return (0, exports.compareObjects)(o1[key], o2[key]);
    }
    if (o1[key] !== o2[key]) {
      same = false;
    }
  }
  return same;
};
exports.compareObjects = compareObjects;