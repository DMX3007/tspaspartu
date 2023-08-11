import { Button } from '../Button/Button';
import styles from './HotelInfo.module.scss'

export const HotelInfo = ({ imgSrc = "https://images.pexels.com/photos/542411/pexels-photo-542411.png?auto=compress&cs=tinysrgb&h=750&w=1260", description, price }) => {
    return (
        <div className={styles.hotel_info}>
            <img className={styles.hotel_img} src={imgSrc} alt={description} />
            <div className={styles.hotel_desc}>
                <p>{description}</p>
                <p className={styles.price}>{price}</p>
                <Button appliedStyle='booking' innerText='оставить заявку' />
            </div>
        </div>
    );
}