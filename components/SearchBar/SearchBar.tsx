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
import { getDestinationAndDepartures, ApiResponse } from "@/utils/getDestinationAndDepartures";

interface SearchBarProps {
    font: string;
}

interface SelectedItemProps {
    handleSelectedItemChange: React.Dispatch<React.SetStateAction<string>>
}

// const getDestinations = async () => {
//     const countries = await fetch('/api//countries')
//     const data = await countries.json()
//     return data;
// }
// const { data: destinations } = useQuery(['countries'], getDestinations);


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


export const SearchBar = ({ font }: SearchBarProps): JSX.Element => {
    // const [resort, setResort] = useState(resorts)
    // const [clicked, setClicked] = useState(true);
    // const [selectedCity, setSelectedCity] = useState<string>('')
    // const [sortedCountries, setSortedCountries] = useState<string[]>([])
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [selectedItem, setSelectedItem] = useState<string>('')
    const [depCities, setDepCities] = useState<string[]>(null);
    const [countries, setCountries] = useState<string[]>(null);

    // useEffect(() => {
    //     const countries = list?.flt.map((country) => country[1].n)
    //     const cities = list?.flt.map((city) => city[1].n);
    //     setDepCities(cities)
    //     setCountries(countries)
    // })
    // useEffect(() => {
    //     if (selectedItem || selectedCountry) {
    //         console.log(selectedCountry)
    //         if (selectedItem) {
    //             const selectedCity = (list?.flt2.filter((e) => {
    //                 return e[1].n === selectedItem
    //             }))
    //             console.log(selectedCity)

    //             const arrayOfArraysNums = selectedCity.map((e) => e[1].t);
    //             const y = list?.flt.map((country) => country[1].n)
    //             const map = createMap(selectedCity[0][1].t, y);
    //             console.log(map);
    //             // console.log(selectedCity[0][1].t)
    //             // console.log(y)
    //             // const arr = Object.entries(map)
    //             //     .sort(([, a], [, b]) => Object.values(b) - Object.values(a))
    //             //     .map(([k, v]) => Object.entries(v))
    //             //     .flat()
    //             //     .map(e => e[0]);
    //             // console.log(Object.keys(sortable)[Object.values(sortable).indexOf('Москва')]);
    //             // const namesAndValue = (Object.values(sortable).map(e => (e[1])));
    //             // handleSetDepCities(Object)
    //             // setCountries(arr)
    //         }
    //     }
    // }, [countries, depCities, selectedCountry, selectedItem]);

    // const { data: resorts } = useQuery(['resorts'], getResorts);

    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: () => Promise.resolve(5),
        select: (data) => data.toString(),
    })
    const { data: list, isLoading, isError } = useQuery({ queryKey: ['item'], queryFn: getDestinationAndDepartures<ApiResponse> });
    console.log(list)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }



    const handleSetDepCities = (value: string[]) => {
        setDepCities(value);
    }
    const handleSetCountries = (value: string[]) => {
        setCountries(value);
    }



    // console.log(list.flt2from);
    // console.log(list?.flt)
    // console.log(list?.flt2)
    // console.log(countryList)


    // let depCities = ['Moscow']
    // console.log(depCities)



    return (
        <form className={styles.searchBar}>
            {list ? <DropdownCombobox initialState={list.flt2} label={"Отуда"} onChange={(value) => setSelectedItem(value)} />
                : <DropdownCombobox initialState={list.flt} label={"Куда"} onChange={(value) => setSelectedCountry(value)} />
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
