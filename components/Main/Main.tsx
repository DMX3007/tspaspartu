import Image from "next/image";
import { LinkedImage } from "./LinkedImage";
import styles from "./Main.module.scss";
import classNames from 'classnames';

interface MainProps {
    font: string
}

export const Main = ({ font }: MainProps): JSX.Element => {
    return (
        <div className={classNames(styles.main, font)}>
            <LinkedImage
                className={styles.leftBlockUp!}
                text="париж"
                src="/eiffel_tiny.jpeg"
                alt="Париж"
            />
            <LinkedImage
                className={styles.leftBlockDown!}
                text="ницца"
                src="/turkish.jpeg"
                alt="Ницца"
            />
            <Image
                className={styles.mainLogo}
                src="/main-logo.png"
                width={400}
                height={400}
                sizes="100vw"
                alt="туристическое агентство Паспарту логотип"
                priority
                style={{
                    objectFit: 'contain',
                    width: 'auto', height: 'auto', minHeight: '200px', minWidth: '200px', maxWidth: '400px', maxHeight: '400px'
                }}
            ></Image>
            <LinkedImage
                className={styles.rightBlockUp!}
                text="мале"
                src="/mald.jpeg"
                alt="Мале"
            />
            <LinkedImage
                className={styles.rightBlockDown!}
                text="пхукет"
                src="/phuket.jpg"
                alt="Пхукет"
            />
        </div>
    );
};
