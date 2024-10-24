import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ModelYearDistribution = () => {
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
    const yearCount = {};

    data.forEach((vehicle) => {
      const year = vehicle["Model Year"];
      if (year) {
        yearCount[year] = (yearCount[year] || 0) + 1;
      }
    });

    // Prepare chart data
    setChartData({
      labels: Object.keys(yearCount),
      datasets: [
        {
          label: "Number of Vehicles",
          data: Object.values(yearCount),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  return (
    <div id="EV Adoption by Year">
      <h2>Model Year Distribution of Electric Vehicles</h2>
      <h3>Tracking the Growth of Electric Vehicles by Model Year</h3>
      <p>
        This analysis provides insights into the number of electric vehicles
        released each model year, highlighting trends and shifts in electric
        vehicle adoption over time.
      </p>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default ModelYearDistribution;
