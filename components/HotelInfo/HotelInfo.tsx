import Image from 'next/image'
import { ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Button } from '../Button/Button';
import { Entries } from '../../types/biblioGlobusApi';
import { useQuery } from '@tanstack/react-query';
import { Hotel } from '../Hotel/Hotel';
import { HotelUrls } from '@/pages/api/hotelImages';
import { SwipeWrapper } from './SwipeWrapper/SwiperWrapper';

import styles from './HotelInfo.module.scss'
import 'swiper/scss';
import 'swiper/scss/effect-cards';
interface IHotelInfo {
    entries: Entries[],
}

function filterHotels(arr: Entries[], condition: string, modified: [Entries[]]): void {
    const filtered = arr.filter(el => el.id_hotel === condition);
    modified.push(filtered);
}

async function fetchImages(hotelsIds: string[]): Promise<HotelUrls> {
    const response = await fetch(`api/hotelImages`, {
        method: 'POST',
        body: JSON.stringify(hotelsIds),
    });
    const data = await response.json();
    return data as HotelUrls;
}

export const HotelInfo = ({ entries }: IHotelInfo) => {
    let uniqueHotelsIds: string[] = [];
    let modifiedEntries = [];
    if (entries && entries.length) {
        uniqueHotelsIds = [...new Set(entries.map(el => el.id_hotel))];
        uniqueHotelsIds.forEach(uniqId => {
            filterHotels(entries, uniqId, modifiedEntries);
        })
    }

    const { data: hotelImgUrls, isLoading, isError } = useQuery({
        queryKey: ['urls'], queryFn: () => {
            // const hotelsIds = entries.map(el => el.id_hotel);
            // console.log(hotelsIds)
            return fetchImages(uniqueHotelsIds);
        }, enabled: !!(entries && entries.length),
    })

    if (isLoading) {
        return <div>is LOading...</div>
    }

    function getNextElement(arr, currentIndex) {
        const element = arr[currentIndex];
        currentIndex = (currentIndex + 1) % arr.length; // Используем оператор % для перехода к следующему индексу в массиве
        return currentIndex;
    }

    return (
        <div>
            {modifiedEntries.length ? (
                modifiedEntries.map((el) => {

                    return (
                        <Swiper
                            effect={'cards'}
                            key={el.id}
                            grabCursor={true}
                            modules={[EffectCards]}
                            style={{ width: '240px', height: '350px', marginBottom: '10px' }}
                        >
                            {el.map((subEl: Entries, index) => {
                                const nextIndex = getNextElement(hotelImgUrls[Number(subEl.id_hotel)], index);
                                const src = hotelImgUrls[Number(subEl.id_hotel)][nextIndex]!.image_url;
                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={{
                                            backgroundColor: '#FeFeFe',
                                            boxShadow: '3px 3px 5px 0px grey, 0px 0px 5px 0px grey',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '18px',
                                        }}
                                    >
                                        <div className={styles.hotel_desc}>
                                            <p>{subEl.town}</p>
                                            {hotelImgUrls &&
                                                hotelImgUrls[Number(subEl.id_hotel)] &&
                                                hotelImgUrls[Number(subEl.id_hotel)][nextIndex] ? (
                                                <Image
                                                    loader={({ src, width }) => { return src + "?w=" + width }}
                                                    src={src}
                                                    width={200}
                                                    height={200}
                                                    alt="изображение отеля"
                                                />
                                            ) : (
                                                <Image src="/" width={200} height={200} alt="" />
                                            )}
                                            <p>{subEl.id_hotel}</p>
                                            {/* <p className={styles.price}>{subEl.prices.map(el => el.amount)}</p> */}
                                            <p>{subEl.room}</p>
                                            <Button appliedStyle="booking" innerText={subEl.prices.map(el => el.amount)} />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    );
                })
            ) : (
                ''
            )}
        </div>
    );
}