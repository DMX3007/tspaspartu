import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im'
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Scrollbar, Navigation } from "swiper/modules";
import { BsFilterLeft } from 'react-icons/bs'
import Image from 'next/image';
import classNames from 'classnames';

import { Data } from '@/types/biblioGlobusApi';
import { InfoColumn } from '@/components/InfoColumn/InfoColumn';
import { FilterColumn } from '@/components/FilterColumn/FilterColumn';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { comfortaa, rubic } from '@/utils/fonts';
import { Icon } from '../components/SearchBar/Icon/Icon';
import { requestPriceList } from '@/utils/requestPriceList';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from '../styles/Routes.module.scss'

const filters = [
    {
        title: "Price",
        type: "radio",
        options: [
            { value: "low-to-high", label: "Low to high" },
        ],
    },
    {
        title: "Duration",
        type: "radio",
        options: [
            { value: "<10", label: "<10 days" },
            { value: "10-20", label: "10-20 days" },
            { value: "20-30", label: "20-30 days" },
            { value: ">30", label: ">30 days" },
        ],
    },
    {
        title: "Trip Style",
        type: "checkbox",
        options: [
            { value: "culture", label: "Culture" },
            { value: "luxury", label: "Luxury" },
            { value: "solo", label: "Solo" },
            { value: "spring", label: "Spring" },
            { value: "adventures", label: "Adventures" },
        ],
    },
];

const getImages = async (hotelName: string, hotelCity: string, hotelCountry: string) => {
    // return await fetch(`/api/retrievePriceList?hotelName=${hotelName}&hotelCity=${hotelCity}&hotelCountry=${hotelCountry}`)
}

export default function Routes() {
    const INDPRICELISTDEFAULT = 0;
    // init value from data.entries array such as : [ Phuket , Patayya ... ] 
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(INDPRICELISTDEFAULT);

    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isSearchBarVisible, setSearchBarVisible] = useState(true);
    const [swiperRef, setSwiperRef] = useState(() => { });
    const router = useRouter()
    const { idCity, idCountry } = router.query;

    const { isLoading, data: priceLists, isError } = useQuery(['entries'], () => {
        if (!idCity || !idCountry) {
            return Promise.reject(new Error('idCity or idCountry is missing'));
        }
        const city = Array.isArray(idCity) ? idCity[0] : idCity;
        const country = Array.isArray(idCountry) ? idCountry[0] : idCountry;
        return requestPriceList(String(country), String(city));
    }, { enabled: !!(idCity && idCountry), staleTime: 300000, refetchOnWindowFocus: false });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    // const { data } = useQuery({ queryKey: ["href"], queryFn: () => { getImages() } })

    const handleButtonClick = () => {
        setFilterVisible(!isFilterVisible);
    };
    const handleSearchVisible = () => {
        setSearchBarVisible(!isSearchBarVisible)
    }
    const hadleSelectedSlide = () => {
        setSelectedRouteIndex(swiperRef.clickedIndex)
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }} className={classNames(styles.container, comfortaa.className)}>
                <div style={{
                    zIndex: '10000',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    top: 10,
                    minWidth: '96vw',
                }}>
                    <Icon onClick={handleButtonClick}>
                        <BsFilterLeft />
                    </Icon>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Image
                            className={styles.logo}
                            src="/paspartu-logo.png"
                            alt="logo"
                            width={35}
                            height={35}
                            priority
                        />
                        <h2 style={{ color: 'rgba(104, 178, 192, 1)' }} className={classNames(styles.logoTitle, rubic.className)}>
                            ПасПарТу
                            <br></br>
                            <span style={{ color: "rgba(119, 61, 6, 1)" }
                            }>travel</span>
                        </h2>
                    </div>
                    <Icon onClick={handleSearchVisible}>
                        <ImSearch />
                    </Icon >
                </div>

                <Swiper style={{
                    width: '100%', height: '75px', marginTop: '20px',
                    "--swiper-pagination-top": "61px",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.5",
                    "--swiper-pagination-bullet-size": "8px",
                    "--swiper-pagination-bullet-horizontal-gap": "1%",
                }}
                    onSwiper={setSwiperRef}
                    onSlideChange={() => console.log('slide change')}
                    spaceBetween={10}
                    slidesPerView={2}
                    autoHeight={false}
                    freeMode
                    centeredSlides
                    grabCursor
                    centeredSlidesBounds
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className={styles.swiper}
                >
                    {priceLists.mrArr && priceLists.mrArr.length ? priceLists.mrArr.map(offer => (
                        <SwiperSlide style={{
                            fontWeight: 'bold',
                            color: '#333',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }
                        } key={offer.name + offer.id} onClick={hadleSelectedSlide}>
                            <div className={styles['swiper-slide-transform']}>{offer.name}</div>
                        </SwiperSlide>
                    )) : ['EMPTY ROUTES']}
                </Swiper>
                <div className={isSearchBarVisible ? styles.searchBar_hidden : styles.searchBar_visible}>
                    <SearchBar font={comfortaa.className} />
                </div>
                <FilterColumn filters={filters} isFilterVisible={isFilterVisible} />
                {priceLists.entries ?
                    <InfoColumn priceList={priceLists.entries} selectedRouteIndex={selectedRouteIndex} /> :
                    <div>...LOADING HOTELS</div>
                }
            </div >
        </>
    );
}