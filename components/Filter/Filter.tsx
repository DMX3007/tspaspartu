import styles from './Filter.module.scss'

export const Filter = ({ title, options, type }) => {
    return (
        <div className={styles.filter}>
            <h3>{title}</h3>
            {options.map(option => (
                <label key={option.value}>
                    <input type={type} name={title.toLowerCase()} value={option.value} />
                    {option.label}
                </label>
            ))}
        </div>
    );
}