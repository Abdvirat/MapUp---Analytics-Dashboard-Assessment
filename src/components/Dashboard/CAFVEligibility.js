import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const CAFVEligibility = () => {
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
    const eligibilityCount = { Eligible: 0, NotEligible: 0, Unknown: 0 };

    data.forEach((vehicle) => {
      const eligibility =
        vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
      if (eligibility === "Clean Alternative Fuel Vehicle Eligible") {
        eligibilityCount.Eligible += 1;
      } else if (eligibility === "Not eligible due to low battery range") {
        eligibilityCount.NotEligible += 1;
      } else {
        eligibilityCount.Unknown += 1;
      }
    });

    // Prepare chart data
    setChartData({
      labels: ["Eligible", "Not Eligible", "Unknown"],
      datasets: [
        {
          label: "Number of Vehicles",
          data: [
            eligibilityCount.Eligible,
            eligibilityCount.NotEligible,
            eligibilityCount.Unknown,
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
        },
      ],
    });
  };

  return (
    <div id="CAFV Eligibility Status">
      <h2>CAFV Eligibility Status Overview</h2>
      <h3>Analyzing the Qualification of Vehicles for Clean Fuel Incentives</h3>
      <p>
        This analysis counts vehicles based on their CAFV eligibility status,
        helping to understand the proportion of vehicles that qualify for clean
        fuel incentives, are not eligible, or have an unknown status
      </p>
      {chartData.labels ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default CAFVEligibility;
