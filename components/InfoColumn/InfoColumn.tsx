import { useId } from "react";
import { HotelInfo } from "../HotelInfo/HotelInfo";
import styles from './InfoColumn.module.scss'

export const InfoColumn = ({ hotels }) => {
    const id = useId();
    return (
        <div className={styles.info_column}>
            {hotels.map((hotel, ind) => (
                <HotelInfo key={`${ind}-${id}`} {...hotel} />
            ))}
        </div>
    );
}