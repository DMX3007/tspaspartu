import Image from 'next/image'
import { Button } from '../Button/Button';
import { Entries } from '../../types/biblioGlobusApi';
import { useQuery } from '@tanstack/react-query';
import { Hotel } from '../Hotel/Hotel';
import { HotelUrls } from '@/pages/api/hotelImages';
import styles from './HotelInfo.module.scss'
interface IHotelInfo {
    entries: Entries[],
}

async function fetchImages(hotelsIds: string[]): Promise<HotelUrls> {
    const response = await fetch(`api/hotelImages`, {
        method: 'POST',
        body: JSON.stringify([...new Set(hotelsIds)]),
    });
    const data = await response.json();
    return data as HotelUrls;
}

export const HotelInfo = ({ entries }: IHotelInfo) => {
    console.log(entries)
    const { data: hotelImgUrls, isLoading, isError } = useQuery({
        queryKey: ['urls'], queryFn: () => {
            const hotelsIds = entries.map(el => el.id_hotel);
            // console.log(hotelsIds)
            return fetchImages(hotelsIds)
        }, enabled: !!(entries && entries.length),
    })

    if (isLoading) {
        return <div>is LOading...</div>
    }
    console.log(hotelImgUrls)


    return (
        <div className={styles.hotel_info}>
            {entries && entries.map(
                (hotel, id) => {
                    return (<>
                        {/* <Hotel key={id}></Hotel> */}
                        {hotelImgUrls && hotelImgUrls[Number(hotel.id_hotel)] && hotelImgUrls[Number(hotel.id_hotel)]![0] ?
                            <Image loader={() => hotelImgUrls[Number(hotel.id_hotel)]![0]!.image_url}
                                src={hotelImgUrls[Number(hotel.id_hotel)]![0]!.image_url}
                                width={100}
                                height={100}
                                alt=''>
                            </Image > : ''}
                        {/* <Image src={imagesUrl[0]} /> */}
                        {/* {hotelImgUrls ? hotelImgUrls.map(el => (<li>{el.image_url}</li>)) : ''} */}
                        <div className={styles.hotel_desc}>
                            <p>{hotel.town}</p>
                            <p>{hotel.id_hotel}</p>
                            <p className={styles.price}>{hotel.prices.map(el => el.amount)}</p>
                            <Button appliedStyle='booking' innerText='оставить заявку' />
                        </div>
                    </>)
                }
            )}
        </div >
    );
}