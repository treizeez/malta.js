import { MaltaElement, MaltaDom } from "./types";
export declare class Dom {
    node: MaltaElement;
    el: MaltaDom;
    constructor({ node, el }: {
        node?: MaltaElement;
        el?: MaltaDom;
    });
    create(): void;
    setAttributes(): void;
    textNode(): void;
    initEvents(): void;
    style(): void;
}
