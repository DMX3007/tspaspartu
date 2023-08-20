import { useId } from "react";
import { HotelInfo } from "../HotelInfo/HotelInfo";
import styles from './InfoColumn.module.scss'
import { Entry } from '../../types/biblioGlobusApi'
import { useQuery } from "@tanstack/react-query";

interface Partner {
    RUR: string;
    entries: any[]; // Replace 'any' with the appropriate type for entries
    href0: string;
    next_page: string;
    prx: string;
}

interface Entries {
    airCompany: string;
    dt: string;
    duration: string;
    href1: string;
    id_hotel: string;
    id_ns: string;
    id_price: string;
    o_duration: string;
    prices: any[]; // Replace 'any' with the appropriate type for prices
    quota: string;
    room: string;
    sr: string;
    tour_date: string;
    town: string;
}


async function fetchData(url: string) {
    return (await fetch(`api/finals/?url=${encodeURIComponent(url)}`, { credentials: 'include' })).json() as Promise<Partner>;
}

export const InfoColumn = ({ priceList }) => {
    console.log(priceList.url)

    const { data } = useQuery({
        queryKey: ['hotels'], queryFn: () => {
            if (priceList && priceList[0]) {
                console.log(priceList[0].url)
                return fetchData(priceList[0].url);
            } else if (priceList.length) {
                console.log('array not empty')
            } else {
                console.log(priceList[0].url)
                return 1
            }
        }
    })

    const id = useId();
    console.log(data)
    return (
        <div className={styles.info_column}>
            {/* {data ? data.entries.map((hotel, ind) => (
                <HotelInfo key={`${ind}-${id}`} {...hotel} />
            )) : <div>Loading...</div>} */}
        </div>
    );
}