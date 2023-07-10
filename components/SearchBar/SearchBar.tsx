import { useState, useCallback } from "react";
import { GiCalendar } from 'react-icons/gi'

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

    const [selectedCity, setSelectedCity] = useState<string>('')
    const [selectedCountry, setSelectedCountry] = useState<string>('')

    if (selectedCity) {
        const arrCountry = createMap(depCities, countryList)
    }

    const getDestinations = async () => {
        const countryes = await fetch('/api//countries')
        const data = await countryes.json()
        return data;
    }
    const { data: destinations } = useQuery(['countries'], getDestinations);


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
    // console.log(cities)

    const getCitiesAndCountryes = async () => {
        const data = await fetch('/api//fromto');
        const arr = await data.json();
        // console.log(arr)
        return arr;
    }

    const { data: list } = useQuery(['item'], getCitiesAndCountryes);


    // console.log(list)


    // console.log(list.flt2from);
    console.log(list?.flt)
    // console.log(list.flt2)
    const countryList = list?.flt.map((e) => e[1].n);
    console.log(countryList)


    const depCities = list?.flt2.map((e) => e[1].n);
    // let depCities = ['Moscow']
    // console.log(depCities)



    const [resort, setResort] = useState(resorts)

    const [clicked, setClicked] = useState(true);


    return (
        <form className={styles.searchBar}>
            {(selectedCity || selectedCountry) && <>
                <DropdownCombobox initialState={depCities} label={"Откуда"} onChange={(value: string) => setSelectedItem(value)} />
                <DropdownCombobox initialState={destinations} label={"Куда"} onChange={(value: string) => setSelectedItem(value)} />
            </>}

            {(depCities && destinations) && <>
                <DropdownCombobox initialState={depCities} label={"Откуда"} onChange={(value: string) => setSelectedItem(value)} />
                <DropdownCombobox initialState={destinations} label={"Куда"} onChange={(value: string) => setSelectedItem(value)} />
            </>
            }
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
