import { useId } from "react";
import { HotelInfo } from "../HotelInfo/HotelInfo";
import styles from './InfoColumn.module.scss'
import { Entry, Partner } from '../../types/biblioGlobusApi'
import { useQuery } from "@tanstack/react-query";
interface IInfoColumn {
    priceList: Entry[],
    selectedRouteIndex: number;
}

async function fetchData(url: string) {
    return (await fetch(`api/finals/?url=${encodeURIComponent(url)}`, { credentials: 'include' })).json() as Promise<Partner>;
}

export const InfoColumn = ({ priceList, selectedRouteIndex }: IInfoColumn) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['hotels'], queryFn: async () => {
            if (priceList && priceList[selectedRouteIndex]) {
                return await fetchData(priceList[selectedRouteIndex]!.url);
            } else if (priceList.length) {
                console.log('array not empty')
            } else {
                console.log('dope')
            }
        }
        , staleTime: 300000
    })

    const id = useId();

    if (isLoading) {
        return <div>Loading ...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }
    return (
        <div className={styles.info_column}>
            {/* {data?.entries.map(hotel => (<li>{hotel.id_hotel}</li>))}; */}
            <HotelInfo entries={data?.entries!} />
        </div>)
}