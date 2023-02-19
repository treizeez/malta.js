import { MaltaCss } from "./types";
const VCss: Map<string, string> = new Map();
const allNames: Set<string> = new Set();

const style = document.createElement("style");

interface Rules {
  main: string;
  pseudo: {
    type: string;
    rule: string;
  }[];
  queries: {
    type: string;
    rule: Rules;
  }[];
}

export const generateName = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  allNames.add(result);

  return result;
};

const formatRule = (name: string, rules: Rules) => {
  const formattedRules: string[] = [];

  if (rules?.queries?.length > 0) {
    rules.queries.forEach((q) =>
      formattedRules.push(`${q.type}{${formatRule(name, q.rule).join("")}}`)
    );
  }

  if (rules?.pseudo?.length > 0) {
    rules.pseudo.forEach((p) =>
      formattedRules.push(`.${name}${p.type}{${p.rule}}`)
    );
  }

  formattedRules.push(`.${name}{${rules.main}}`);

  return formattedRules;
};

const createCssClass = (rules: Rules): string => {
  let name = `malta-${generateName(10)}`;

  const sheet =
    document.getElementsByTagName("style")[0]?.sheet ??
    document.head.appendChild(document.createElement("style")).sheet;

  while (allNames.has(name)) {
    name = `malta-${generateName(10)}`;
  }

  const formattedRules = formatRule(name, rules);

  for (const rule of formattedRules) {
    sheet.insertRule(rule, sheet.cssRules.length);
  }

  return name;
};

export class CssInJs {
  static inline(obj: MaltaCss): Rules {
    const rules: Rules = {
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

  static toCss(obj: MaltaCss): string {
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
