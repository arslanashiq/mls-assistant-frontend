"use client"
import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  Button,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>Year: {payload[0].payload.year}</p>
        <p>Quarter: {payload[0].payload.quarter}</p>
        <p>Price: {payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const HomeValueChart = ({ page_data }) => {
  const postalCode = page_data?.PostalCode.substring(0, 3);
  const listPrice = page_data?.ListPrice;
  console.log(postalCode, listPrice);
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [filter, setFilter] = useState("max");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://busy-erin-chick-fez.cyclic.app/get-data?zipCode=${postalCode}&estimatedprice=${listPrice}`
        );
        const responseData = await response.json();
        const data = responseData.result;

        // Calculate the adjusted prices based on index_NSA
        const estimatedPrice = listPrice; // example value, replace with your actual estimated price
        const adjustedPrices = data.map((item) => {
          const adjustedPrice = estimatedPrice / (item.index_NSA / 100);
          return { year: item.year, quarter: item.quarter, adjustedPrice };
        });

        // Adjusted prices are currently mapped to years in the API response
        // We need to map them to years based on the current year
        const currentYear = new Date().getFullYear();
        const baseYear = adjustedPrices[0].year;
        const adjustedPricesWithCorrectYears = adjustedPrices.map((item) => {
          const yearDifference = currentYear - item.year;
          return {
            year: baseYear + yearDifference,
            quarter: item.quarter,
            adjustedPrice: item.adjustedPrice,
          };
        });

        // Reverse the order of the data array so that it starts from 1995 and ends in 2023
        setChartData(adjustedPricesWithCorrectYears.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data once it's fetched
    filterData();
  }, [chartData]);

  useEffect(() => {
    // Trigger filter for "max" when component mounts
    filterData();
  }, [filter]); // Empty dependency array means this effect runs only once when component mounts

  const filterData = () => {
    if (filter === "max") {
      setFilteredChartData(chartData);
    } else {
      const years = parseInt(filter);
      const filteredData = chartData.filter(
        (item) => item.year >= new Date().getFullYear() - years
      );
      setFilteredChartData(filteredData);
    }
  };

  return (
    <div className="col-md-12" style={{ height: "400px" }}>
      <div className="filters text-end">
        <button className="btn me-2" onClick={() => setFilter("5")}>5 Years</button>
        <button className="btn me-2" onClick={() => setFilter("10")}>10 Years</button>
        <button className="btn me-2" onClick={() => setFilter("15")}>15 Years</button>
        <button className="btn me-2" onClick={() => setFilter("max")}>Max</button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={200}
          data={filteredChartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="duotone"
            dataKey="adjustedPrice"
            stroke="#f9a347"
            fill="#fff"
            strokeWidth={3}
            dot={{ stroke: '#f9a347', fill: '#fff', strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeValueChart;
