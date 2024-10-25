import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";

Chart.register(...registerables);

const ElectricRangeComparison = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        createChartData(results.data);
      },
    });
  }, []);

  const createChartData = (data) => {
    const rangeCounts = {};

    data.forEach((vehicle) => {
      const range = parseFloat(vehicle["Electric Range"]);
      if (!isNaN(range)) {
        const bucket = Math.floor(range / 10) * 10; // Grouping into ranges of 10
        rangeCounts[bucket] = (rangeCounts[bucket] || 0) + 1;
      }
    });

    const labels = Object.keys(rangeCounts).map(
      (range) => `${range} - ${parseInt(range) + 10}`
    );
    const counts = Object.values(rangeCounts);

    setChartData({
      labels,
      datasets: [
        {
          label: "Number of Vehicles",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  return (
    <div id="Range Variability in EVs">
      <h2>Electric Range Comparison Among Vehicle Models</h2>
      <h3>Visualizing Range Variability and Outliers in Electric Vehicles</h3>
      <p>
        This analysis provides insights into the electric range of various
        vehicle models, highlighting the variability in performance and
        identifying any significant outliers
      </p>
      {chartData.labels ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default ElectricRangeComparison;
