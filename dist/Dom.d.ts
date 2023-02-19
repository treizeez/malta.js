import { MaltaElement, MaltaDom } from "./types";
interface domConstructor {
    node?: MaltaElement;
    el?: MaltaDom;
}
export declare class Dom {
    node: MaltaElement;
    el: MaltaDom;
    constructor({ node, el }: domConstructor);
    create(): void;
    setAttributes(): void;
    textNode(): void;
    initEvents(): void;
    style(): void;
}
export {};
