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

function filterUniqHotels(arr: Entries[], condition: string, modified: [Entries[]]): void {
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

async function fetchHotelData(hotelsIds: string[]) {
    try {
        const response = await fetch(`api/hotels?key=${hotelsIds}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error while fetching hotel data:", error);
        throw error;
    }
}

export const HotelInfo = ({ entries }: IHotelInfo) => {
    let uniqueHotelsIds: string[] = [];
    let nextIndex = 0;
    let src = '/';
    let arrayOfUniqHotels = [];
    if (entries && entries.length) {
        uniqueHotelsIds = [...new Set(entries.map(el => el.id_hotel))];
        uniqueHotelsIds.forEach(uniqId => {
            filterUniqHotels(entries, uniqId, arrayOfUniqHotels);
        })
    }

    const { data: hotelImgUrls, isLoading, isError } = useQuery({
        queryKey: ['urls'], queryFn: () => {
            return fetchImages(uniqueHotelsIds);
        }, enabled: !!(entries && entries.length),
    })

    const { data: hotelData, isLoading: LoadingHotels, isError: ErrorHotels } = useQuery({
        queryKey: ['name'], queryFn: () => {
            return fetchHotelData(uniqueHotelsIds);
        }, enabled: !!(entries && entries.length),
    })
    console.log(hotelData);

    if (isLoading) {
        return <div>is LOading...</div>
    }

    function getNextElement(arr, currentIndex) {
        currentIndex = (currentIndex + 1) % arr.length; // Используем оператор % для перехода к следующему индексу в массиве
        return currentIndex;
    }

    const buttonStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#ff385c',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#e6004d',
    };

    const activeStyle = {
        backgroundColor: '#cc003f',
    };

    const cardStyle = {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
    };

    const titleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    const descriptionStyle = {
        fontSize: '16px',
        color: '#666',
        marginBottom: '10px',
    };

    const priceStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
    };
    console.log(arrayOfUniqHotels)
    return (
        <div>
            {arrayOfUniqHotels.length ? (
                arrayOfUniqHotels.map((el) => {
                    return (
                        <Swiper
                            effect={'cards'}
                            key={el.id}
                            grabCursor={true}
                            modules={[EffectCards]}
                            style={{ width: '240px', height: '350px', marginBottom: '10px' }}
                        >
                            {el.map((subEl: Entries, index: number) => {
                                try {
                                    nextIndex = getNextElement(hotelImgUrls![Number(subEl.id_hotel)], index);
                                    src = hotelImgUrls![Number(subEl.id_hotel)]![nextIndex]!.image_url;
                                } catch (error) {
                                    nextIndex = 0;
                                }

                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={cardStyle}
                                    >
                                        <div className={styles.hotel_desc}>
                                            <p>{subEl.town}</p>
                                            {hotelImgUrls &&
                                                hotelImgUrls[Number(subEl.id_hotel)] &&
                                                hotelImgUrls[Number(subEl.id_hotel)]![nextIndex] ? (
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

                                            <h2 style={titleStyle}>{subEl.id_hotel}</h2>
                                            <p style={descriptionStyle}>{subEl.tour_date}</p>
                                            <p style={descriptionStyle}>{subEl.duration}</p>
                                            <button style={buttonStyle} >
                                                {subEl.prices.map(el => el.amount)}
                                            </button>


                                            {/* <Button appliedStyle="booking" innerText={subEl.prices.map(el => el.amount)} /> */}
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