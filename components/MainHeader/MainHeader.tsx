import styles from './MainHeader.module.scss'
import classNames from 'classnames';

interface MainHeaderProps {
    font: string;
}

export const MainHeader = ({ font }: MainHeaderProps): JSX.Element => {
    return (
        <div className={styles.wrapperHeader}>
            <h2 className={classNames(font, styles.header)}>Мы всегда делаем наших клиентов счастливыми предоставляя большой выбор</h2>
            <p className={styles.paragraph}>Открой новые места, насладиcь своим следующим отпуском</p>
        </div>)
}