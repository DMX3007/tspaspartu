import { useState, useCallback, useEffect } from "react";
import { GiCalendar } from 'react-icons/gi'
import * as _ from 'underscore'

import { Button } from "../Button/Button";
import { InputField } from "./InputField/InputField";
import { Icon } from './Icon/Icon';
import { Container } from "./Container/Container";
import styles from "./SearchBar.module.scss";
import { useQuery } from "@tanstack/react-query";
import { DropdownCombobox } from "./DropdownCombobox/DropdownCombobox";

interface SearchBarProps {
    font: string;
}

interface SelectedItemProps {
    handleSelectedItemChange: React.Dispatch<React.SetStateAction<string>>
}

interface SortLocationProps {
    listForSort: string[];

}
type NumberStringMap = { [x: string]: number };
interface MapFactory {
    (citiesList: number[], countryList: string[]): { [x: string]: number }[];
}

const createMap: MapFactory = (citiesList, countryList): NumberStringMap[] => {
    return countryList.map((key, index) => ({
        [key]: citiesList[index]
    }));
}

export const SearchBar = ({ font }: SearchBarProps): JSX.Element => {

    // const [selectedCity, setSelectedCity] = useState<string>('')
    const [selectedCountry, setSelectedCountry] = useState<string>('')

    const [selectedItem, setSelectedItem] = useState<string>('')

    const [depCities, setDepCities] = useState<string[]>([
        'Москва', 'Санкт-Петербург', 'Абакан', 'Архангельск', 'Астрахань', 'Барнаул', 'Владивосток', 'Владикавказ', 'Волгоград',
        'Горно-Алтайск', 'Грозный', 'Екатеринбург', 'Ижевск', 'Иркутск', 'Казань', 'Калининград', 'Кемерово', 'Киров', 'Красноярск',
        'Магадан', 'Магнитогорск', 'Махачкала', 'Минеральные Воды', 'Мурманск', 'Нижневартовск', 'Нижнекамск', 'Нижний Новгород',
        'Новокузнецк', 'Новосибирск', 'Омск', 'Оренбург', 'Пенза', 'Пермь', 'Петропавловск - Камчатский', 'Ростов-на-Дону', 'Самара',
        'Саранск', 'Саратов', 'Сочи', 'Ставрополь', 'Сургут', 'Сыктывкар', 'Тольятти', 'Томск', 'Тюмень', 'Ульяновск', 'Уфа', 'Хабаровск',
        'Ханты-Мансийск', 'Челябинск', 'Череповец', 'Южно-Сахалинск'
    ]
    );
    const [countries, setCountries] = useState<string[]>([
        'Абхазия', 'Азербайджан', 'Армения', 'Болгария', 'Вьетнам', 'Грузия', 'Египет', 'Израиль', 'Индия', 'Индонезия', 'Иран',
        'Кипр', 'Китай', 'Куба', 'Маврикий', 'Мальдивы', 'Мексика', 'Объединенные Арабские Эмираты', 'Оман', 'Россия', 'Сейшелы',
        'Таиланд', 'Танзания', 'Тунис', 'Турция', 'Франция', 'Чехия', 'Шри-Ланка'
    ]);

    const handleSetDepCities = (value) => {
        setDepCities(value);
    }

    // const getDestinations = async () => {
    //     const countries = await fetch('/api//countries')
    //     const data = await countries.json()
    //     return data;
    // }
    // const { data: destinations } = useQuery(['countries'], getDestinations);

    const getResorts = async () => {
        const data = await fetch('/api//resorts');
        const arr: Array<{}> = await data.json();
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(arr[i].title_ru);
        }
        return result;
    }
    const { data: resorts } = useQuery(['resorts'], getResorts);

    const getCitiesAndCountryes = async () => {
        const data = await fetch('/api//fromto');
        const arr = await data.json();
        return arr;
    }

    const { data: list, isLoading } = useQuery(['item'], getCitiesAndCountryes);

    // if (!isLoading) {
    //     const x = list.flt2.map((city) => city[1].n);
    //     const y = list.flt.map((country) => country[1].n)
    //     console.log(x);
    //     // setDepCities(x);
    //     // setCountries(y);
    //     console.log(y)
    // }

    // useEffect(() => {
    //     setSelectedCity(selectedCity?.selectedItem);
    //     console.log(selectedCity.selectedItem)
    // }, [selectedCity])

    if (selectedItem || selectedCountry) {
        console.log(selectedCountry)
        if (selectedItem) {
            const selectedCity = (list?.flt2.filter((e) => {
                return e[1].n === selectedItem
            }))
            console.log(selectedCity)

            const arrayOfArraysNums = selectedCity.map((e) => e[1].t);
            console.log(arrayOfArraysNums)
            const y = list.flt.map((country) => country[1].n)
            const map = createMap(selectedCity[0][1].t, y);
            console.log(selectedCity[0][1].t)
            console.log(y)
            const sortable = Object.entries(map).sort(([, a], [, b]) => {
                return Object.values(b) - Object.values(a)
            })
            // console.log(Object.keys(sortable)[Object.values(sortable).indexOf('Москва')]);
            // const namesAndValue = (Object.values(sortable).map(e => (e[1])));
            // handleSetDepCities(Object)
            console.log(_.extend(sortable))
        }


    }
    // console.log(list)


    // console.log(list.flt2from);
    console.log(list?.flt)
    console.log(list?.flt2)
    // console.log(countryList)


    // let depCities = ['Moscow']
    // console.log(depCities)


    const [resort, setResort] = useState(resorts)

    const [clicked, setClicked] = useState(true);

    return (
        <form className={styles.searchBar}>
            <DropdownCombobox initialState={depCities} label={"Отуда"} onChange={(value) => setSelectedItem(value)} />
            <DropdownCombobox initialState={countries} label={"Куда"} onChange={(value) => setSelectedCountry(value)} />
            <div className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <Icon>
                        <GiCalendar />
                    </Icon>
                    <Container description={"Даты"} value={"27.05 - 06.06"} />
                </div>
            </div>
            <Button innerText="поиск тура" appliedStyle="" />
        </form>
    )
}
