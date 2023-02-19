import { MaltaElement, MaltaDom } from "./types";
export interface Update {
    current: MaltaElement;
    next: MaltaElement;
    el: MaltaDom;
}
export declare class VDom {
    static mount(node: Function | MaltaElement): MaltaDom;
    static update({ current, next, el }: Update): void;
}
