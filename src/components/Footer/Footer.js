import React from "react";
import "./Footer.css"; // Optional CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Mapup. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
