import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";

const MakeModelAnalysis = () => {
  const [chartData, setChartData] = useState(null); // Start with null

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
    const makeCount = {};

    // Count the number of vehicles for each make
    data.forEach((vehicle) => {
      const make = vehicle.Make;
      if (make) {
        makeCount[make] = (makeCount[make] || 0) + 1;
      }
    });

    // Prepare chart data
    const labels = Object.keys(makeCount);
    const dataValues = Object.values(makeCount);

    // Ensure we only set chartData if there's data to display
    if (labels.length > 0 && dataValues.length > 0) {
      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Vehicles",
            data: dataValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } else {
      // Handle case where no valid data is found
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  };

  return (
    <div id="Top EV Manufacturers">
      <h2>Make and Model Distribution Analysis</h2>
      <h3>Evaluating the Dominance of Electric Vehicle Manufacturers</h3>
      <p>
        This analysis provides a comprehensive overview of the number of
        vehicles by each manufacturer, highlighting which brands are leading the
        electric vehicle market in our dataset
      </p>
      {chartData && chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default MakeModelAnalysis;
