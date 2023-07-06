import Image from "next/image";
import classNames from "classnames";
import styles from "./Main.module.scss";

interface LinkedImageProps {
    className: string;
    src: string;
    alt: string;
    text: string;
}

export const LinkedImage = ({ className, src, alt, text }: LinkedImageProps): JSX.Element => {
    return (
        <div className={classNames(styles.wrapperImg, className)}>
            <Image
                className={styles.linkImg}
                src={src}
                width={45}
                height={45}
                alt={alt}
                sizes="16vw"
                style={{
                    objectFit: 'contain',
                }}
            ></Image>
            <p className={styles.linkImgText}>{text}</p>
        </div>
    );
};
