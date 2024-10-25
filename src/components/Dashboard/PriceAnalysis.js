import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PriceAnalysis = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Load CSV data
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        createChartData(results.data);
      },
    });
  }, []);

  const createChartData = (data) => {
    const priceCount = {};
    const binSize = 5000; // Define the size of each price bin
    const maxPrice = Math.max(
      ...data.map((vehicle) => parseFloat(vehicle["Base MSRP"]) || 0)
    );

    // Create price bins
    for (let i = 0; i <= maxPrice; i += binSize) {
      priceCount[`$${i}-${i + binSize}`] = 0; // Initialize bin
    }

    // Count vehicles in each price bin
    data.forEach((vehicle) => {
      const price = parseFloat(vehicle["Base MSRP"]);
      if (!isNaN(price)) {
        const binKey = `$${Math.floor(price / binSize) * binSize}-${
          Math.floor(price / binSize) * binSize + binSize
        }`;
        priceCount[binKey] = (priceCount[binKey] || 0) + 1;
      }
    });

    // Prepare chart data
    setChartData({
      labels: Object.keys(priceCount),
      datasets: [
        {
          label: "Number of Vehicles",
          data: Object.values(priceCount),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.1, // Smooth the line
        },
      ],
    });
  };

  return (
    <div id="Price Trends of EVs">
      <h2>Price Analysis of Electric Vehicles</h2>
      <h3>Understanding MSRP Distribution Across Vehicle Models</h3>
      <p>
        This analysis examines the distribution of Base MSRP for electric
        vehicles, revealing pricing trends and how they correlate with various
        vehicle types and models.
      </p>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default PriceAnalysis;
