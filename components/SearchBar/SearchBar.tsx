import { useState, useCallback, useEffect } from "react";
import { GiCalendar } from 'react-icons/gi'
import { Button } from "../Button/Button";
import { Icon } from './Icon/Icon';
import styles from "./SearchBar.module.scss";
import { useQuery } from "@tanstack/react-query";
import { DropdownCombobox } from "./DropdownCombobox/DropdownCombobox";
import { createMap } from "@/utils/createMap";
import { getDestinationAndDepartures } from '@/utils/getDestinationAndDepartures';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import classNames from "classnames";
import getData from "@/pages/api/getData";
import { NestedObject, NestedArray } from '../../utils/getDestinationAndDepartures';

interface SearchBarProps {
    font: string;
}

interface Entry {
    date: string;
    route: string;
    duration: string;
    url: string;
    id_price: string;
    minprice: string;
    minindex: string;
    imp: string;
    cur: string;
    mrId: string;
    avId: string;
    lu4: string;
}

interface MrArr {
    id: string;
    name: string;
}

interface AvArr {
    id: string;
    name: string;
}

interface Data {
    entries: Entry[];
    mrArr: MrArr[];
    avArr: AvArr[];
}

async function requestPriceList(cityFrom: NestedArray, countryTo: NestedArray): Promise<Data> {
    console.log(`/api/retrievePriceList?cityFromId=${cityFrom[0]}&countryToId=${countryTo[0]}`)
    const response = await fetch(`/api/retrievePriceList?cityFromId=${cityFrom[0]}&countryToId=${countryTo[0]}`);

    console.log(response)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Data = await response.json() as Data;
    return data;
}

export const SearchBar = ({ font }: SearchBarProps): JSX.Element => {
    registerLocale('ru', ru);
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedCity, setSelectedItem] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    let flag = false;
    const handleSelectedItemChange = (value: string) => {
        setSelectedItem(value);
    };
    const handleSelectedCountryChange = (value: string) => {
        setSelectedCountry(value)
    }

    const { data: list, isLoading, isError } = useQuery({ queryKey: ['item'], queryFn: getDestinationAndDepartures });

    let idCity: NestedArray;
    let idCountry: NestedArray;

    if (selectedCity && selectedCountry) {
        idCity = list?.flt2?.find((el) => el[1].n === selectedCity);
        console.log(idCity)
        idCountry = list?.flt?.find((el) => el[1].n === selectedCountry);
        console.log(idCountry)
        flag = true;
    } else flag = false;

    const { data: data2, isLoading: isLoading2, error: isError2 } = useQuery(['entries'], () => { requestPriceList(idCity, idCountry) }, { enabled: flag })
    console.log(data2)
    if (isLoading) {
        return <div>Is Loading...</div>
    }
    if (isError) {
        return <div>Is Error...</div>
    }

    return (
        <form className={styles.searchBar}>
            {!isLoading ? <>
                <DropdownCombobox initialState=
                    {list && list.flt2 ? list.flt2.map(e => e[1].n || '') : []}
                    options={{ label: 'Откуда', font: font }}
                    onChange={handleSelectedItemChange} selectedItem={selectedCity} />
                <DropdownCombobox initialState={list && list.flt ? list.flt.map(e => e[1].n || '') : []}
                    options={{ label: 'Куда', font: font }}
                    onChange={handleSelectedCountryChange}
                    selectedItem={selectedCountry} />
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
