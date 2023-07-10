import { Icon } from "../Icon/Icon"
import { useCombobox } from "downshift"
import { useState } from "react"
import { GiAirplaneArrival, GiAirplaneDeparture } from 'react-icons/gi'
import { items, menuStyles, comboboxStyles } from '../shared'
import styles from "../SearchBar.module.scss";


interface DropDownComboboxProps {
    initialState: string[],
    label: string,
    onChange: React.Dispatch<React.SetStateAction<string>>
}

export const DropdownCombobox = ({ initialState, label, onChange }: DropDownComboboxProps) => {

    const [inputItems, setInputItems] = useState(initialState)

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: initialState,
        onSelectedItemChange: onChange,
        onInputValueChange: ({ inputValue }) => {
            if (inputValue) setInputItems(
                initialState?.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase()),
                ),
            )
        },
    })
    return (
        <>
            <div style={comboboxStyles} className={styles.searchItem}>
                <div className={styles.searchItemContainer}>
                    <button
                        type="button"
                        {...getToggleButtonProps()}
                        aria-label="toggle menu"
                    >
                        <Icon>
                            <GiAirplaneDeparture />
                        </Icon>
                    </button>
                    <div className={styles.searchItemContent}>
                        <label className={styles.searchItemDesc} {...getLabelProps()}>{label}</label>
                    </div>
                </div>
                <input className={styles.searchItemValue} {...getInputProps()} />
            </div >
            <ul {...getMenuProps()}
                style={menuStyles}
            // className={styles.dropDownVisible}
            >
                {isOpen &&
                    inputItems?.map((item, index) => (
                        <li
                            // className={styles.dropDownItem}
                            style={
                                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
                            }
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </li>
                    ))}
            </ul>

        </>
    )
}