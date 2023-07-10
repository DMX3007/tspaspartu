import React from "react";

const css = (...args) => ({ className: emoCSS(...args) });

const items = [
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Berkelium",
  "Californium",
  "Einsteinium",
  "Fermium",
  "Mendelevium",
  "Nobelium",
  "Lawrencium",
  "Rutherfordium",
  "Dubnium",
  "Seaborgium",
  "Bohrium",
  "Hassium",
  "Meitnerium",
  "Darmstadtium",
  "Roentgenium",
  "Copernicium",
  "Nihonium",
  "Flerovium",
  "Moscovium",
  "Livermorium",
  "Tennessine",
  "Oganesson",
];

const menuStyles = {
  maxHeight: 150,
  maxWidth: 300,
  overflowY: "scroll",
  backgroundColor: "#eee",
  padding: 0,
  listStyle: "none",
  position: "relative",
};

const menuMultipleStyles = {
  maxHeight: "180px",
  overflowY: "auto",
  width: "135px",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: 0,
  left: "340px",
};

const selectedItemStyles = {
  marginLeft: "5px",
  backgroundColor: "aliceblue",
  borderRadius: "10px",
};

const selectedItemIconStyles = { cursor: "pointer" };

const comboboxStyles = { display: "inline-block", marginLeft: "5px" };

const comboboxWrapperStyles = {
  display: "inline-flex",
  flexWrap: "wrap",
};

export {
  menuMultipleStyles,
  items,
  menuStyles,
  comboboxStyles,
  comboboxWrapperStyles,
  selectedItemIconStyles,
  selectedItemStyles,
};
