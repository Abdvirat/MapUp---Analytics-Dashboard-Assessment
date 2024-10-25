import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const GeographicDistribution = () => {
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
    const countyCount = {};

    data.forEach((vehicle) => {
      const county = vehicle["County"];
      if (county) {
        countyCount[county] = (countyCount[county] || 0) + 1;
      }
    });

    // Prepare chart data
    setChartData({
      labels: Object.keys(countyCount),
      datasets: [
        {
          label: "Number of Vehicles",
          data: Object.values(countyCount),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    });
  };

  return (
    <div id="EV Density by Location">
      <h2>Geographic Distribution of Electric Vehicles</h2>
      <h3>Mapping Electric Vehicle Concentrations Across Counties</h3>
      <p>
        This analysis visualizes the distribution of electric vehicles by county
        or city, helping to identify regions with higher adoption rates and
        potential influences on infrastructure development
      </p>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default GeographicDistribution;
