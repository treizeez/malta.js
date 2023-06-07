"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssInJs = exports.generateName = void 0;
const VCss = new Map();
const allNames = new Set();
const style = document.createElement("style");
const generateName = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    allNames.add(result);
    return result;
};
exports.generateName = generateName;
const formatRule = (name, rules) => {
    var _a, _b;
    const formattedRules = [];
    formattedRules.push(`.${name}{${rules.main}}`);
    if (((_a = rules === null || rules === void 0 ? void 0 : rules.queries) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        rules.queries.forEach((q) => formattedRules.push(`${q.type}{${formatRule(name, q.rule).join("")}}`));
    }
    if (((_b = rules === null || rules === void 0 ? void 0 : rules.pseudo) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        rules.pseudo.forEach((p) => formattedRules.push(`.${name}${p.type}{${p.rule}}`));
    }
    return formattedRules;
};
const createCssClass = (rules) => {
    var _a, _b;
    let name = `malta-${(0, exports.generateName)(10)}`;
    const sheet = (_b = (_a = document.getElementsByTagName("style")[0]) === null || _a === void 0 ? void 0 : _a.sheet) !== null && _b !== void 0 ? _b : document.head.appendChild(document.createElement("style")).sheet;
    while (allNames.has(name)) {
        name = `malta-${(0, exports.generateName)(10)}`;
    }
    const formattedRules = formatRule(name, rules);
    for (const rule of formattedRules) {
        sheet.insertRule(rule, sheet.cssRules.length);
    }
    return name;
};
class CssInJs {
    static inline(obj) {
        const rules = {
            main: "",
            pseudo: [],
            queries: [],
        };
        Object.keys(obj).map((key) => {
            const splitByUpperCase = key.split(/(?=[A-Z])/);
            const joined = splitByUpperCase.join("-").toLowerCase();
            if (key !== "inline") {
                if (joined.startsWith("&")) {
                    return rules.pseudo.push({
                        type: joined.replace("&", ""),
                        rule: this.inline(obj[key]).main,
                    });
                }
                if (joined.startsWith("@")) {
                    return rules.queries.push({
                        type: joined,
                        rule: this.inline(obj[key]),
                    });
                }
                return (rules.main += `${joined}:${obj[key]};`);
            }
        });
        return rules;
    }
    static toCss(obj) {
        const stringified = JSON.stringify(obj);
        if (VCss.has(stringified)) {
            const cssClassName = VCss.get(stringified);
            if (cssClassName) {
                return cssClassName;
            }
        }
        const createdCss = createCssClass(this.inline(obj));
        VCss.set(stringified, createdCss);
        return createdCss;
    }
}
exports.CssInJs = CssInJs;
//# sourceMappingURL=CssEngine.js.map