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
}

export const getDestinationAndDepartures = async ():Promise<ApiResponseStructure> => {
    const data = await fetch('/api//fromto');
    return await data.json() as ApiResponseStructure;
}
