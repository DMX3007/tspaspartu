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


export interface Partner {
    RUR: string;
    entries: Entries[]; // Replace 'any' with the appropriate type for entries
    href0: string;
    next_page: string;
    prx: string;
}

export interface Entries {
    aircompany: string;
    dt: string;
    duration: string;
    href1: string;
    id_hotel: string;
    id_ns: string;
    id_price: string;
    o_duration: string;
    prices: Prices[]; // Replace 'any' with the appropriate type for prices
    quota: string;
    room: string;
    sr?: string;
    tour_date: string;
    town: string;
}
export interface Prices {
    ag: string;
    amount: string;
    href2: string;
}
