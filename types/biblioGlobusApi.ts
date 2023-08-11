export type NestedObject = {
    n_f?: string;
    n?: string;
    t?: number[];
}

export type NestedArray = [number, NestedObject][];

export type ApiResponseStructure = {
    flt2from?: NestedArray;
    flt2?: NestedArray;
    flt?: NestedArray;
    [key: string]: NestedArray | undefined;
}

export interface Entry {
    date: string;
    route: string;
    duration: string;
    url: string;
    id_price: string;
    minprice: string;
    minindex: string;
    imp: string;
    cur: string;
    mrId: string;
    avId: string;
    lu4: string;
}

export interface MrArr {
    id: string;
    name: string;
}

export interface AvArr {
    id: string;
    name: string;
}

export interface Data {
    entries: Entry[];
    mrArr: MrArr[];
    avArr: AvArr[];
}