import { useState, useMemo } from "react";
import { GiCalendar } from 'react-icons/gi'
import { Button } from "../Button/Button";
import { Icon } from './Icon/Icon';
import { useQuery } from "@tanstack/react-query";
import { DropdownCombobox } from "./DropdownCombobox/DropdownCombobox";
import { getDestinationAndDepartures } from "@/utils/getDestinationAndDepartures";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import classNames from "classnames";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    font: string;
    className?: string;
}

export const SearchBar = ({ font, className }: SearchBarProps): JSX.Element => {
    registerLocale('ru', ru);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const handleSelectedCityChange = (value: string) => setSelectedCity(value);
    const handleSelectedCountryChange = (value: string) => setSelectedCountry(value);

    const { data: list, isLoading, isError } = useQuery(['item'], getDestinationAndDepartures, { staleTime: 30000 });

    let idCity: string = ''
    let idCountry: string = ''

    if (selectedCity && selectedCountry && list) {
        idCity = String(list.flt2?.find((el) => el[1].n === selectedCity)?.[0]);
        idCountry = String(list.flt?.find((el) => el[1].n === selectedCountry)?.[0]);
    }

    const options = useMemo(() => {
        const cities = list?.flt2?.map((e) => e[1].n || '') || [];
        const countries = list?.flt?.map((e) => e[1].n || '') || [];
        return { cities, countries };
    }, [list]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <form className={classNames(styles.searchBar, className)}>
            <DropdownCombobox
                initialState={options.cities}
                options={{ label: 'Откуда', font }}
                onChange={handleSelectedCityChange}
                selectedItem={selectedCity}
            />
            <DropdownCombobox
                initialState={options.countries}
                options={{ label: 'Куда', font }}
                onChange={handleSelectedCountryChange}
                selectedItem={selectedCountry}
            />
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <label className={styles.searchItemDesc} htmlFor="datePicker">
                        Дата
                    </label>
                    <div className={styles.searchItemContent} style={{ display: 'flex' }}>
                        <DatePicker
                            id="datePicker"
                            className={classNames(styles.searchItemCalendarInput, font)}
                            locale={ru}
                            selected={startDate}
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => setStartDate(date!)}
                        />
                        <button className={styles.searchItemValue}>
                            <Icon onClick={() => { }}>
                                <GiCalendar />
                            </Icon>
                        </button>
                    </div>
                </div>
            </div>
            <Button
                innerText="поиск тура"
                appliedStyle="searchingBar"
                idCity={idCity}
                idCountry={idCountry}
                path="/routes"
            />
        </form>
    );
};