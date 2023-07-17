import { Icon } from "../Icon/Icon"
import { useCombobox } from "downshift"
import { useState, useId } from "react"
import { GiAirplaneArrival, GiAirplaneDeparture } from 'react-icons/gi'
import { items, menuStyles, comboboxStyles } from '../shared'
import styles from "../SearchBar.module.scss";
import { NestedArray, NestedObject } from "@/utils/getDestinationAndDepartures"
import { UseComboboxState } from "downshift"
import classNames from "classnames"

interface DropDownComboboxProps {
    initialState: string[],
    options: Options,
    onChange: (value: string) => void;
}

interface Options {
    label: string;
    font: string;
}

export function DropdownCombobox({ initialState, options, onChange }: DropDownComboboxProps) {

    function getBooksFilter(inputValue: string) {
        const lowerCasedInputValue = inputValue.toLowerCase()

        return function booksFilter(book: string) {
            return (
                !inputValue ||
                book.toLowerCase().includes(lowerCasedInputValue) ||
                book.toLowerCase().includes(lowerCasedInputValue)
            )
        }
    }

    function ComboBox() {
        const [items, setItems] = useState(initialState)
        const [selectedItem, setSelectedItem] = useState("")
        const {
            isOpen,
            getToggleButtonProps,
            getLabelProps,
            getMenuProps,
            getInputProps,
            highlightedIndex,
            getItemProps,
        } = useCombobox({
            onInputValueChange({ inputValue }) {
                if (typeof inputValue === "string")
                    setItems(initialState.filter(getBooksFilter(inputValue)))
            },
            items,
            selectedItem,
            onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
                if (typeof newSelectedItem === 'string') {
                    setSelectedItem(newSelectedItem)
                }
            }
        })
        return (
            <div className={classNames(styles.searchItem, options.font)}>
                <div className={styles.searchItemContainer}>
                    <label className={styles.searchItemDesc} {...getLabelProps()}>
                        {options.label}
                    </label>
                    <div className={styles.searchItemContent}>
                        <input
                            placeholder="Best book ever"
                            className={styles.searchItemValue}
                            {...getInputProps()}
                        />
                        <button
                            aria-label="toggle menu"
                            className={styles.searchItemValue}
                            type="button"
                            {...getToggleButtonProps()}
                        >
                            {isOpen ? <Icon clickHandler={() => { }}>
                                <GiAirplaneDeparture />
                            </Icon>
                                : <Icon clickHandler={() => { }}>
                                    <GiAirplaneDeparture />
                                </Icon>}
                        </button>
                    </div>
                </div>
                <ul
                    className={isOpen ? styles.dropDownVisible : styles.dropDownHidden}
                    {...getMenuProps()}
                >
                    {isOpen &&
                        items.map((item, index) => (
                            <li
                                style={
                                    highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
                                }
                                className={styles.dropDownItem}
                                key={`${item}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
    return <ComboBox />
}