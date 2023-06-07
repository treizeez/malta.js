import { Dom } from "./Dom";
export declare class StateStack {
    private static data;
    static get stack(): Set<Function>;
    static push(component: Function): void;
    static reset(): void;
    static setContext(context: Dom): void;
}
export declare function State<T>(arg: T): [() => T, (value: T | ((prev: T) => T)) => void];
