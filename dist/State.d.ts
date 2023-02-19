import { MaltaDom } from "./types";
export declare function State<T>(arg: T): [(context?: MaltaDom) => T, (value: T | ((prev: T) => T)) => void];
