import React, { useState } from "react";
import Router from "next/router";
import Link from 'next/link'
import styles from "./Button.module.scss";
interface ButtonProps {
    appliedStyle: 'contactUs' | 'booking' | 'searchingBar';
    innerText: string;
    path?: string;
    idCity?: string,
    idCountry?: string
}

interface Resorts {
    tour_date: string;
    aircompany: string;
    id_price: string;
    town: string;
    id_hotel: string;
    id_ns: string;
    room: string;
    href1: string;
    dt: string;
    sr: string;
    duration: string;
    o_duration: string;
    b_duration: string;
    b_id_ns: string;
    b_id_h: string;
    quota: string;
    prices: {
        amount: string;
        href2: string;
        ag: string;
    }[];
}

interface Routes {
    href0: string;
    cur: string;
    prx: string;
    entries: Resorts[];
    next_page: string;
}

export const Button = ({ appliedStyle, innerText, path, idCity, idCountry }: ButtonProps) => {

    return (
        <button className={styles[appliedStyle]}>
            <Link
                href={idCity && idCountry ? {
                    pathname: path,
                    query: `idCity=${idCity}&idCountry=${idCountry!}`
                } : {
                    pathname: path,
                }}
            >
                {innerText}
            </Link>
        </button>
    );
};


