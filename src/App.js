import "./App.css";
import VehicleTypeDistribution from "./components/Dashboard/VehicleTypeDistribution";
import MakeModelAnalysis from "./components/Dashboard/MakeModelAnalysis";
import CAFVEligibility from "./components/Dashboard/CAFVEligibility";
import ModelYearDistribution from "./components/Dashboard/ModelYearDistribution";
import GeographicDistribution from "./components/Dashboard/GeographicDistribution";
import PriceAnalysis from "./components/Dashboard/PriceAnalysis";
import ElectricRangeComparison from "./components/Dashboard/ElectricRangeComparison";
import ConsolidatedAnalysisTable from "./components/Dashboard/ConsolidatedAnalysisTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="component-card">
        <VehicleTypeDistribution />
      </div>
      <div className="component-card">
        <MakeModelAnalysis />
      </div>
      <div className="component-card">
        <CAFVEligibility />
      </div>
      <div className="component-card">
        <ModelYearDistribution />
      </div>
      <div className="component-card">
        <GeographicDistribution />
      </div>
      <div className="component-card">
        <PriceAnalysis />
      </div>
      <div className="component-card">
        <ElectricRangeComparison />
      </div>
      <div className="component-card">
        <ConsolidatedAnalysisTable />
      </div>
      <Footer />
    </div>
  );
};
export default App;
