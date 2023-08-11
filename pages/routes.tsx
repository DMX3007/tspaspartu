import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im'
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Scrollbar } from "swiper/modules";
import { BsFilterLeft } from 'react-icons/bs'
import Image from 'next/image';
import styles from '../styles/Routes.module.scss'
import { Data } from '@/types/biblioGlobusApi';
import { InfoColumn } from '@/components/InfoColumn/InfoColumn';
import { FilterColumn } from '@/components/FilterColumn/FilterColumn';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { comfortaa, rubic } from '@/utils/fonts';
import { Icon } from '../components/SearchBar/Icon/Icon';
import { requestPriceList } from '@/utils/requestPriceList';
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
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

const hotels = [
    {
        imgSrc: "https://via.placeholder.com/150",
        description: "Hotel 1 description",
        price: "$100",
    }, {
        imgSrc: "https://via.placeholder.com/150",
        description: "Hotel 1 description",
        price: "$100",
    }, {
        imgSrc: "https://via.placeholder.com/150",
        description: "Hotel 1 description",
        price: "$100",
    }, {
        imgSrc: "https://via.placeholder.com/150",
        description: "Hotel 1 description",
        price: "$100",
    }, {
        imgSrc: "https://via.placeholder.com/150",
        description: "Hotel 1 description",
        price: "$100",
    },
];

const getImages = async (hotelName: string, hotelCity: string, hotelCountry: string) => {
    // return await fetch(`/api/retrievePriceList?hotelName=${hotelName}&hotelCity=${hotelCity}&hotelCountry=${hotelCountry}`)
}

export default function Routes() {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isSearchBarVisible, setSearchBarVisible] = useState(false);
    const router = useRouter()
    const { idCity, idCountry } = router.query;

    const { isLoading, data, isError } = useQuery(['entries'], () => {
        if (!idCity || !idCountry) {
            return Promise.reject(new Error('idCity or idCountry is missing'));
        }
        const city = Array.isArray(idCity) ? idCity[0] : idCity;
        const country = Array.isArray(idCountry) ? idCountry[0] : idCountry;
        return requestPriceList(String(country), String(city));
    }, { enabled: !!(idCity && idCountry) });

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
    const onClick = () => {
        setSearchBarVisible(!isSearchBarVisible)
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }} className={styles.container}>
                <div style={{
                    zIndex: '10000',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-evenly',
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
                        <h2 style={{ color: 'rgba(104, 178, 192, 1)' }} className={`${styles.logoTitle} ${rubic.className}`}>
                            ПасПарТу
                            <br></br>
                            <span style={{ color: "rgba(119, 61, 6, 1)" }
                            }>travel</span>
                        </h2>
                    </div>
                    <Icon onClick={onClick}>
                        <ImSearch />
                    </Icon >
                </div>
                {/* <div style={{ marginTop: '10px' }}> */}

                <Swiper style={{ marginTop: '40px', }}
                    spaceBetween={0}
                    allowSlideNext={true}
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
                    modules={[Pagination, FreeMode, Scrollbar]}
                    className={styles.swiper}
                >
                    {data.mrArr && data.mrArr.length ? data.mrArr.map(offer => (
                        <SwiperSlide className={styles['swiper-slide']} key={offer.name + offer.id}>{offer.name}</SwiperSlide>
                    )) : ['lol']}
                </Swiper>
                {/* </div> */}
                <div className={isSearchBarVisible ? styles.searchBar_hidden : styles.searchBar_visible}>
                    <SearchBar font={comfortaa.className} />
                </div>
                <FilterColumn filters={filters} isFilterVisible={isFilterVisible} />
                <InfoColumn hotels={hotels} />
            </div >
        </>
    );
}