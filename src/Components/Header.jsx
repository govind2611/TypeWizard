import React from "react";
import AccountCircle from "./AccountCircle";
import logo from "./logo.png";

const Header = () => {
  const handleLogoClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo-img" />
        <span>TypeWizard</span>
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  );
};

export default Header;
