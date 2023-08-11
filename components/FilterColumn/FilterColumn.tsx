
import { Filter } from "../Filter/Filter";
import { Data, MrArr } from "@/types/biblioGlobusApi";
import styles from './FilterColumn.module.scss'


interface IFilterColumn {
    filters: {
        title: string;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    }[];
    isFilterVisible: boolean;
    offers?: MrArr[];
}

export const FilterColumn = ({ filters, isFilterVisible, offers }: IFilterColumn) => {
    return (
        <div className={isFilterVisible ? styles.filter_column : styles['filter_column-hidden']}>
            {filters.map(filter => (
                <Filter key={filter.title} {...filter} />
            ))}
        </div>
    );
}