export declare type MaltaElement = ({
    [key in `on${keyof GlobalEventHandlersEventMap}`]?: (event: Event) => any;
} & {
    tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
    textNode?: string | boolean | Number;
    attrs?: Partial<HTMLElement | HTMLHyperlinkElementUtils | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLIElement | HTMLLabelElement | HTMLLegendElement | HTMLLinkElement | HTMLMapElement | HTMLMediaElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLModElement | HTMLOListElement | HTMLObjectElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOptionsCollection | HTMLOrSVGElement | HTMLOutputElement | HTMLParagraphElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLVideoElement | HTMLVideoElementEventMap | HTMLUnknownElement | HTMLUListElement | HTMLUListElement | HTMLTrackElement | HTMLTitleElement | HTMLTimeElement | HTMLTextAreaElement | HTMLTemplateElement | HTMLSourceElement> | {
        [key: string]: string;
    };
    content?: (MaltaElement | Function | boolean)[] | MaltaElement | Function;
    style?: MaltaCss;
});
export declare interface MaltaDom extends HTMLElement {
    $component?: Function;
    $memo?: {
        state?: {
            execSchedule: number;
            values: Map<number, any>;
        };
    };
    $current: MaltaElement;
    $renderCount?: number;
    children: HTMLCollectionOf<MaltaDom>;
}
type PseudoClass = ":active" | "::after" | "::backdrop" | ":before" | "::before" | ":checked" | ":default" | ":defined" | ":dir" | ":disabled" | ":empty" | ":enabled" | "::first-letter" | "::first-line" | ":first-of-type" | ":focus" | ":focus-visible" | ":focus-within" | "::grammar-error" | ":hover" | ":in-range" | "::marker" | ":not" | ":nth-child" | ":nth-last-child" | ":nth-last-of-type" | ":nth-of-type" | ":only-child" | ":only-of-type" | ":optional" | "::placeholder" | ":read-only" | ":read-write" | "::selection" | ":target" | ":valid" | ":visited";
export declare type MaltaCss = {
    [key in keyof CSSStyleDeclaration]?: keyof CSSStyleDeclaration | string | number;
} | {
    [key: string]: MaltaCss;
} | {
    [key in `&${PseudoClass}`]: MaltaCss;
} | {
    inline?: boolean;
};
export interface StatefulFunction extends Function {
    effect?: (callback: Function) => void;
}
export {};
