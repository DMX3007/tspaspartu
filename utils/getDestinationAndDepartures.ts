import { ApiResponseStructure } from "@/types/biblioGlobusApi";

export const getDestinationAndDepartures = async ():Promise<ApiResponseStructure> => {
    const data = await fetch('/api/fromto');
    return await data.json() as ApiResponseStructure;
}
