import { MaltaCss } from "./types";
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
export declare const generateName: (length: any) => string;
export declare class CssInJs {
    static inline(obj: MaltaCss): Rules;
    static toCss(obj: MaltaCss): string;
}
export {};
