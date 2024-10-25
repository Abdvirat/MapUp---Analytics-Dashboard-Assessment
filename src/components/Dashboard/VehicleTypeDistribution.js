import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";

Chart.register(...registerables);

const VehicleTypeDistribution = () => {
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
    const typeCount = { BEV: 0, PHEV: 0 };

    // Count the types of vehicles
    data.forEach((vehicle) => {
      const type = vehicle["Electric Vehicle Type"];
      if (type) {
        if (type.includes("Battery Electric Vehicle")) {
          typeCount.BEV += 1;
        } else if (type.includes("Plug-in Hybrid Electric Vehicle")) {
          typeCount.PHEV += 1;
        }
      } else {
        console.warn("Vehicle type is undefined for:", vehicle);
      }
    });

    // Set chart data
    setChartData({
      labels: [
        "Battery Electric Vehicle (BEV)",
        "Plug-in Hybrid Electric Vehicle (PHEV)",
      ],
      datasets: [
        {
          data: [typeCount.BEV, typeCount.PHEV],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          hoverBackgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
        },
      ],
    });
  };

  return (
    <div id="EV Type Share">
      <h2>Vehicle Type Distribution Analysis</h2>
      <h3>Understanding the Market Share of Electric Vehicles</h3>
      <p>
        This analysis provides insights into the distribution of electric
        vehicles, comparing Battery Electric Vehicles (BEV) to Plug-in Hybrid
        Electric Vehicles (PHEV). The chart below illustrates the proportions of
        each type, helping to understand market trends.
      </p>
      {chartData.labels ? <Pie data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default VehicleTypeDistribution;
