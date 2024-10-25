import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1750);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const mobile = window.innerWidth < 1750;
    setIsMobile(mobile);
    if (!mobile) {
      setIsOpen(false); // Close the drawer when resizing to desktop
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1>EV Dashboard</h1>
      </div>
      {isMobile && (
        <button className="menu-button" onClick={toggleDrawer}>
          {isOpen ? "Close" : "Menu"}
        </button>
      )}
      <nav className={`nav ${isOpen || !isMobile ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#EV Type Share">EV Type Share</a>
          </li>
          <li>
            <a href="#Top EV Manufacturers">Top EV Manufacturers</a>
          </li>
          <li>
            <a href="#CAFV Eligibility Status">CAFV Eligibility Status</a>
          </li>
          <li>
            <a href="#EV Adoption by Year">EV Adoption by Year</a>
          </li>
          <li>
            <a href="#EV Density by Location">EV Density by Location</a>
          </li>
          <li>
            <a href="#Price Trends of EVs">Price Trends of EVs</a>
          </li>
          <li>
            <a href="#Range Variability in EVs">Range Variability in EVs</a>
          </li>
          <li>
            <a href="#Summary of Insights">Summary of Insights</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
