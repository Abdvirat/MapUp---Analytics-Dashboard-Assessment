import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./TableStyles.css"; // Import the CSS file

const ConsolidatedAnalysisTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        createTableData(results.data);
      },
    });
  }, []);

  const createTableData = (data) => {
    const analysis = [];

    // Vehicle Type Distribution
    const typeCount = { BEV: 0, PHEV: 0 };
    data.forEach((vehicle) => {
      const type = vehicle["Electric Vehicle Type"];
      if (type && type.includes("Battery Electric Vehicle")) {
        typeCount.BEV += 1;
      } else if (type && type.includes("Plug-in Hybrid Electric Vehicle")) {
        typeCount.PHEV += 1;
      }
    });
    analysis.push({
      analysisType: "Vehicle Type Distribution",
      BEV: typeCount.BEV,
      PHEV: typeCount.PHEV,
    });

    // Make and Model Analysis
    const makesCount = {};
    data.forEach((vehicle) => {
      const make = vehicle["Make"];
      makesCount[make] = (makesCount[make] || 0) + 1;
    });
    analysis.push({
      analysisType: "Make and Model Analysis",
      counts: makesCount,
    });

    // CAFV Eligibility
    const cafvCounts = { Eligible: 0, NotEligible: 0, Unknown: 0 };
    data.forEach((vehicle) => {
      const eligibility =
        vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
      if (eligibility === "Clean Alternative Fuel Vehicle Eligible")
        cafvCounts.Eligible++;
      else if (eligibility === "Not eligible due to low battery range")
        cafvCounts.NotEligible++;
      else cafvCounts.Unknown++;
    });
    analysis.push({ analysisType: "CAFV Eligibility", ...cafvCounts });

    // Model Year Distribution
    const yearCounts = {};
    data.forEach((vehicle) => {
      const year = vehicle["Model Year"];
      if (year) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    });
    analysis.push({
      analysisType: "Model Year Distribution",
      counts: yearCounts,
    });

    // Price Analysis
    const priceCounts = {};
    data.forEach((vehicle) => {
      const price = parseFloat(vehicle["Base MSRP"]);
      if (!isNaN(price)) {
        const bucket = Math.floor(price / 5000) * 5000; // Grouping into price ranges of $5000
        priceCounts[bucket] = (priceCounts[bucket] || 0) + 1;
      }
    });
    analysis.push({ analysisType: "Price Analysis", counts: priceCounts });

    // Populate table data
    setTableData(analysis);
  };

  return (
    <div id="Summary of Insights" className="table-container">
      <h2>Consolidated Analysis of Electric Vehicle Data</h2>
      <h3>Comprehensive Overview of Key Metrics and Insights</h3>
      <p>
        This table consolidates various analyses, providing a clear and concise
        overview of electric vehicle trends, market distribution, and
        eligibility criteria, helping users to easily understand the data.
      </p>
      {tableData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Analysis Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.analysisType}</td>
                <td>
                  {item.BEV !== undefined
                    ? `BEV: ${item.BEV}, PHEV: ${item.PHEV}`
                    : item.counts
                    ? Object.entries(item.counts).map(([key, count]) => (
                        <div key={key}>
                          {key}: {count}
                        </div>
                      ))
                    : item.Eligible !== undefined
                    ? `Eligible: ${item.Eligible}, Not Eligible: ${item.NotEligible}, Unknown: ${item.Unknown}`
                    : item.Year
                    ? JSON.stringify(item)
                    : JSON.stringify(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for the selected analysis.</p>
      )}
    </div>
  );
};

export default ConsolidatedAnalysisTable;
