import React, { useState } from "react";
import styles from "./Button.module.scss";
import classNames from 'classnames';

interface ButtonProps {
    appliedStyle: 'contactUs' | '';
    innerText: string;
}

export const Button: React.FC<ButtonProps> = ({ appliedStyle, innerText }) => {
    const [clicked, setClicked] = useState(false);
    const handleClicked = () => {
        setClicked((clicked) => !clicked);
    };
    switch (appliedStyle) {
        case 'contactUs': {
            return (
                <button className={styles.contactUs} onClick={handleClicked} >
                    {innerText}
                </button>
            );
        }
        default: {
            return <button className={styles.searchingBar} onClick={handleClicked} >
                {innerText}
            </button>
        }
    }

};
