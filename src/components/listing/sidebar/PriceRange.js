"use client";
import Select from "react-select";
import { PRICE_RANGE } from "@/utilis/constants";
import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const PriceRange = ({ filterFunctions }) => {
  const [price, setPrice] = useState({ value: { min: 0, max: 100000 } });
  const [minPriceOptions, setMinPriceOptions] = useState([]);
  const [maxPriceOptions, setMaxPriceOptions] = useState([]);
  useEffect(() => {
    if (filterFunctions.listingStatus.label === "Rent") {
      setMinPriceOptions([
        { label: "$500", value: 500 },
        { label: "$1,000", value: 1000 },
        { label: "$1,500", value: 1500 },
        { label: "$2,000", value: 2000 },
        { label: "$2,500", value: 2500 },
        { label: "$3,000", value: 3000 },
        { label: "$3,500", value: 3500 },
        { label: "$4,000", value: 4000 },
        { label: "$4,500", value: 4500 },
        { label: "$5,000", value: 5000 },
        { label: "$6,000", value: 6000 },
        { label: "$7,000", value: 7000 },
        { label: "$8,000", value: 8000 },
        { label: "$9,000", value: 9000 },
        { label: "$10,000", value: 10000 },
        { label: "$15,000", value: 15000 },
        { label: "$20,000", value: 20000 },
        { label: "$25,000", value: 25000 },
        { label: "$30,000", value: 30000 },
        { label: "$35,000", value: 35000 },
        { label: "$40,000", value: 40000 },
        { label: "$45,000", value: 45000 },
        { label: "$50,000", value: 50000 },
      ]);
      setMaxPriceOptions([
        { label: "$500", value: 500 },
        { label: "$1,000", value: 1000 },
        { label: "$1,500", value: 1500 },
        { label: "$2,000", value: 2000 },
        { label: "$2,500", value: 2500 },
        { label: "$3,000", value: 3000 },
        { label: "$3,500", value: 3500 },
        { label: "$4,000", value: 4000 },
        { label: "$4,500", value: 4500 },
        { label: "$5,000", value: 5000 },
        { label: "$6,000", value: 6000 },
        { label: "$7,000", value: 7000 },
        { label: "$8,000", value: 8000 },
        { label: "$9,000", value: 9000 },
        { label: "$10,000", value: 10000 },
        { label: "$15,000", value: 15000 },
        { label: "$20,000", value: 20000 },
        { label: "$25,000", value: 25000 },
        { label: "$30,000", value: 30000 },
        { label: "$35,000", value: 35000 },
        { label: "$40,000", value: 40000 },
        { label: "$45,000", value: 45000 },
        { label: "$50,000", value: 50000 },
      ]);
    } else {
      // Buy or All
      setMinPriceOptions([
        { label: "$10,000", value: 10000 },
        { label: "$20,000", value: 20000 },
        { label: "$30,000", value: 30000 },
        { label: "$40,000", value: 40000 },
        { label: "$50,000", value: 50000 },
        { label: "$60,000", value: 60000 },
        { label: "$70,000", value: 70000 },
        { label: "$80,000", value: 80000 },
        { label: "$90,000", value: 90000 },
        { label: "$100k", value: 100000 },
        { label: "$200k", value: 200000 },
        { label: "$300k", value: 300000 },
        { label: "$400k", value: 400000 },
        { label: "$500k", value: 500000 },
        { label: "$600k", value: 600000 },
        { label: "$700k", value: 700000 },
        { label: "$800k", value: 800000 },
        { label: "$900k", value: 900000 },
        { label: "$1M", value: 1000000 },
        { label: "$2M", value: 2000000 },
        { label: "$3M", value: 3000000 },
        { label: "$4M", value: 4000000 },
        { label: "$5M", value: 5000000 },
        { label: "$6M", value: 6000000 },
        { label: "$7M", value: 7000000 },
        { label: "$8M", value: 8000000 },
        { label: "$9M", value: 9000000 },
        { label: "$10M", value: 10000000 },
      ]);
      setMaxPriceOptions([
        { label: "$10,000", value: 10000 },
        { label: "$20,000", value: 20000 },
        { label: "$30,000", value: 30000 },
        { label: "$40,000", value: 40000 },
        { label: "$50,000", value: 50000 },
        { label: "$60,000", value: 60000 },
        { label: "$70,000", value: 70000 },
        { label: "$80,000", value: 80000 },
        { label: "$90,000", value: 90000 },
        { label: "$100k", value: 100000 },
        { label: "$200k", value: 200000 },
        { label: "$300k", value: 300000 },
        { label: "$400k", value: 400000 },
        { label: "$500k", value: 500000 },
        { label: "$600k", value: 600000 },
        { label: "$700k", value: 700000 },
        { label: "$800k", value: 800000 },
        { label: "$900k", value: 900000 },
        { label: "$1M", value: 1000000 },
        { label: "$2M", value: 2000000 },
        { label: "$3M", value: 3000000 },
        { label: "$4M", value: 4000000 },
        { label: "$5M", value: 5000000 },
        { label: "$6M", value: 6000000 },
        { label: "$7M", value: 7000000 },
        { label: "$8M", value: 8000000 },
        { label: "$9M", value: 9000000 },
        { label: "$10M", value: 10000000 },
      ]);
    }
  }, [filterFunctions.listingStatus.value]);

  // price range handler
  const handleOnChange = (value) => {
    setPrice({ value });
    filterFunctions?.handlepriceRange([value.min || 0, value.max]);
  };
  console.log(price);
  return (
    <>
      <div className="range-wrapper row">
        <div className="col-6 col-md-6">
          <label htmlFor="" className="text-start p0">Minimum</label>
          <Select
            options={minPriceOptions}
            onChange={(selectedOption) => handleOnChange({ ...price.value, min: selectedOption.value })}
            className="select-custom"
            classNamePrefix="select"
            isSearchable={false}
            required
          />
        </div>
        <div className="col-6 col-md-6">
          <label htmlFor="" className="text-start p0">Maximum</label>
          <Select
            options={maxPriceOptions}
            onChange={(selectedOption) => handleOnChange({ ...price.value, max: selectedOption.value })}
            className="select-custom"
            classNamePrefix="select"
            isSearchable={false}
            required
          />
        </div>
      </div>
    </>
  );
};

export default PriceRange;
