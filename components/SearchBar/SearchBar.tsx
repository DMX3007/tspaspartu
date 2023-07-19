import { useState, useCallback, useEffect } from "react";
import { GiCalendar } from 'react-icons/gi'
import { Button } from "../Button/Button";
import { InputField } from "./InputField/InputField";
import { Icon } from './Icon/Icon';
import { Container } from "./Container/Container";
import styles from "./SearchBar.module.scss";
import { useQuery } from "@tanstack/react-query";
import { DropdownCombobox } from "./DropdownCombobox/DropdownCombobox";
import { createMap } from "@/utils/createMap";
import { getDestinationAndDepartures, ApiResponseStructure } from '@/utils/getDestinationAndDepartures';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import classNames from "classnames";

interface SearchBarProps {
    font: string;
}

export const SearchBar = ({ font }: SearchBarProps): JSX.Element => {
    registerLocale('ru', ru);
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedCity, setSelectedItem] = useState('');
    const [startDate, setStartDate] = useState(new Date());


    const handleSelectedItemChange = (value: string) => {
        setSelectedItem(value);
    };
    const handleSelectedCountryChange = (value: string) => {
        setSelectedCountry(value)
    }

    const { data: list, isLoading, isError } = useQuery({ queryKey: ['item'], queryFn: getDestinationAndDepartures });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }
    return (
        <form className={styles.searchBar}>
            {list ? <>
                <DropdownCombobox initialState={list.flt2!.map(e => e[1].n!)} options={{ label: 'Откуда', font: font }} onChange={handleSelectedItemChange} selectedItem={selectedCity} />
                <DropdownCombobox initialState={list.flt!.map(e => e[1].n!)} options={{ label: 'Куда', font: font }} onChange={handleSelectedCountryChange} selectedItem={selectedCountry} />
            </> : "Loading"
            }
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <label className={styles.searchItemDesc} htmlFor="datePicker">Дата</label>
                    <div className={styles.searchItemContent} style={{ "display": "flex" }}>
                        <DatePicker id="datePicker" className={classNames(styles.searchItemCalendarInput, font)} locale={ru} selected={startDate} dateFormat={"dd/MM/yyyy"} onChange={(date) => setStartDate(date!)} />
                        <button className={styles.searchItemValue}>
                            <Icon clickHandler={() => { }}>
                                <GiCalendar />
                            </Icon>
                        </button>
                    </div>
                </div>
            </div>
            <Button innerText="поиск тура" appliedStyle="" />
        </form>
    )
}
