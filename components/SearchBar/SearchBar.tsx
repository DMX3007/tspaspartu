import { useState, useCallback } from "react";
import { GiAirplaneArrival, GiAirplaneDeparture, GiCalendar } from 'react-icons/gi'

import { Button } from "../Button/Button";
import { InputField } from "./InputField/InputField";
import { Icon } from './Icon/Icon';
import { Container } from "./Container/Container";
import styles from "./SearchBar.module.scss";
import { useQuery } from "@tanstack/react-query";

export const SearchBar = ({ countries, font }) => {
    const [clicked, setClicked] = useState(true);
    const [location, setLocation] = useState("Красноярск");
    const [destination, setDestination] = useState("Тайланд");

    const handleSetDate = (e) => {
        setDate(e.target.value);
    };

    const handleSetInput = useCallback((e) => {
        if (setDestination) {
            setDestination(e.target.value);
        }
    }, []);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleInput = (event, cb) => {
        cb(event.target.value);
    };

    const getCoutries = async () => {
        const countries = await fetch('/api//countries')
        const data = await countries.json()
        return data;
    }

    const { loading, data: country, error } = useQuery(['countries'], getCoutries);
    // console.log(data)
    // if (data) {
    //     return <div>{data.map(val => {
    //         <div>{val}</div>
    //     })}</div>
    // }

    return (
        <form className={styles.searchBar + ` ${font}`}>
            <Button innerText="поиск тура" appliedStyle="" />
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <Icon clickHandler={handleClick}>
                        <GiAirplaneDeparture />
                    </Icon>
                    <div className={styles.searchItemContent}>
                        <div className={styles.searchItemDesc}>Откуда</div>
                        <input
                            className={styles.searchItemValue}
                            font={font}
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <Icon clickHandler={handleClick}>
                        <GiAirplaneArrival />
                    </Icon>
                    <InputField
                        font={font}
                        description={"Куда"}
                        inputValue={destination}
                    // onChange={(e) => handleInput(e, setDestination)}
                    />
                </div>
                <ul
                    className={clicked ? styles.dropDown : styles.dropDownVisible}
                    onClick={handleClick}
                >
                    {country?.map((c, id) => (
                        <li
                            className={
                                clicked ? styles.dropDownItem : styles.dropDownItemVisible
                            }
                            key={id}
                        >
                            {c}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <Icon clickHandler={handleClick}>
                        <GiCalendar />
                    </Icon>
                    <Container description={"Даты"} value={"27.05 - 06.06"} />
                </div>
            </div>
        </form>
    );
};
