import React from "react";

//image
import Transfer from "../assets/Transfer.svg";

export const filterData = [
  {
    value: "price_low_to_high",
    label: (
      <div className="flex-center">
        <img src={Transfer} alt="sort_icon" className="sort-icon" /> Price: Low
        - High
      </div>
    ),
  },
  {
    value: "price_high_to_low",
    label: (
      <div className="flex-center">
        <img src={Transfer} alt="sort_icon" className="sort-icon" /> Price: High
        - Low
      </div>
    ),
  },
  {
    value: "title_a_to_z",
    label: (
      <div className="flex-center">
        <img src={Transfer} alt="sort_icon" className="sort-icon" /> Title: A -
        Z
      </div>
    ),
  },
  {
    value: "title_z_to_a",
    label: (
      <div className="flex-center">
        <img src={Transfer} alt="sort_icon" className="sort-icon" /> Title: Z -
        A
      </div>
    ),
  },
];
