import { Data, NestedObject } from "@/types/biblioGlobusApi";

export async function requestPriceList(countryTo: string, cityFrom: string): Promise<Data> {
    // const response = await fetch(`/api/retrievePriceList?cityFromId=${cityFrom}&countryToId=${countryTo}`);
    const response = await fetch(`/api/retrievePriceList?cityFromId=${cityFrom}&countryToId=${countryTo}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Data = await response.json().catch((err) => {
        console.error(err);
    }) as Data;
    console.log(data)
    return data;
}