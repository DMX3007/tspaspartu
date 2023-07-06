'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '../Button/Button';
import styles from './Navigation.module.scss';

interface NavigationProps {
    font: string;
}

export const Navigation: React.FC<NavigationProps> = ({ font }) => {

    const [open, setOpen] = useState(false);

    const handleOpened = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        if (target.classList.contains("open")) {
            target.classList.remove("open");
            setOpen(false);
        } else {
            target.classList.add("open");
            setOpen(true);
        }
    }
    return (
        <nav className={`${styles.navigation}`}>
            <div className={`${styles.navigationLogo}`}>
                <Image
                    className={styles.logo}
                    src="/paspartu-logo.png"
                    alt="logo"
                    width={95}
                    height={95}
                    priority
                />
                <h2 className={`${styles.logoTitle} ${font}`}>
                    ПасПарТу
                    <br></br>
                    <span style={{ color: "rgba(119, 61, 6, 1)" }
                    }>travel</span>
                </h2>
            </div >
            <div className={styles.burgerMenu} onClick={handleOpened}>
                <div id="burger" className={styles.burger}>
                    <div className={!open ? styles.burgerStickTop : styles.burgerStickTopRotated}></div>
                    <div className={!open ? styles.burgerStickMiddle : styles.burgerStickMiddleHidden}></div>
                    <div className={!open ? styles.burgerStickBottom : styles.burgerStickBottomRotated}></div>
                </div>
            </div>
            <div
                className={
                    open
                        ? `${styles.mobileMenu}`
                        : `${styles.mobileMenuHidden}`
                }
            >
                <div className={styles.mobileItem}>О нас</div>
                <div className={styles.mobileItem}>
                    Блоги
                    <Link href="/blog/allblog" passHref></Link>
                </div>
                <div className={styles.mobileItem}>Семейный отдых</div>
                <div className={styles.mobileItem}>Советы</div>
            </div>

            <div className={`${styles.navMenu}`}>
                <div className={styles.navMenuItem}>Куда поехать?</div>
                <Link style={{ display: "flex" }} href="/blog/allblog" passHref>
                    <div className={styles.navMenuItem}>Советы и гайды</div>
                </Link> <div className={styles.navMenuItem}>Нам доверяют</div>
                <Button appliedStyle={'contactUs'} innerText="связаться с нами" />
            </div>
        </nav>);
};
