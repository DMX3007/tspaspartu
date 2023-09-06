import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { ReactNode } from 'react'

type SwipeWrapper = {
    children: ReactNode;
}

export const SwipeWrapper = ({ children }: SwipeWrapper) => {
    return (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            style={{ width: '240px', height: '350px' }}
        >
            {children}
        </Swiper>)
}