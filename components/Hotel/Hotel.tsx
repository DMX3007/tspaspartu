export const Hotel = () => {
    const descriptionStyle = {
        fontSize: '16px',
        color: '#333',
        marginBottom: '10px',
    };

    const amenitiesStyle = {
        fontSize: '14px',
        color: '#777',
    };

    return (
        <div>
            <p style={descriptionStyle}>Welcome to our beautiful hotel! We offer luxurious accommodations with stunning views and top-notch amenities.</p>
            <p style={amenitiesStyle}>Amenities: Free Wi-Fi, Air Conditioning, Swimming Pool, Gym, Restaurant</p>
        </div>
    )
}