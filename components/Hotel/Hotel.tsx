
import Image from "next/image";
import styles from "./Hotel.module.scss"

interface HotelProps {
    hotel: {
        id: string;
        name: string;
        description: string;
        images: string[];
        accommodations: string[];
        reviews: { user: string; review: string; }[]
    }
}

export const Hotel = ({ hotel }: HotelProps) => {
    const descriptionStyle = {
        fontSize: '16px',
        color: '#333',
        marginBottom: '10px',
    };

    const amenitiesStyle = {
        fontSize: '14px',
        color: '#777',
    };

    const { id, name, description, images, accommodations, reviews } = hotel;

    return (
        <div className={styles.hotel}>
            <h2 className={styles.hotel_name}>{name}</h2>
            <div className={styles.hotel_description}>{description}</div>
            <div className={styles.hotel_images}>
                {images.map((image, i) => (
                    <div key={i} className={styles.hotel_image}>
                        <Image src={image} alt={name} layout="fill" objectFit="cover" />
                    </div>
                ))}
            </div>

            <div className={styles.hotel_accommodations}>
                <h3>Variants of Accommodations</h3>
                <ul>
                    {accommodations.map((accommodation, i) => (
                        <li key={i}>{accommodation}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.hotel_reviews}>
                <h3>Reviews</h3>
                {reviews.map((review, i) => (
                    <div key={i} className={styles.review}>
                        <h4>{review.user}</h4>
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
    // return (
    //     <div>
    //         <p style={descriptionStyle}>Welcome to our beautiful hotel! We offer luxurious accommodations with stunning views and top-notch amenities.</p>
    //         <p style={amenitiesStyle}>Amenities: Free Wi-Fi, Air Conditioning, Swimming Pool, Gym, Restaurant</p>

    //     </div>
    // )
}