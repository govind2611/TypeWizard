import React from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  // destructure custom hook
  const { setTheme, theme } = useTheme();

  // func to handle theme change
  const handleChange = (selectedOption) => {
    // console.log(selectedOption);
    setTheme(selectedOption.value);
    localStorage.setItem("theme", JSON.stringify(selectedOption.value));
  };

  // refered from react-select documentation
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "200px",
      margin: "0 auto",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme.background,
      border: state.isFocused ? `2px solid ${theme.textColor}` : "none",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused
          ? `2px solid ${theme.textColor}`
          : `1px solid ${theme.textColor}`,
      },
      borderRadius: "10px",
      padding: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.background,
      borderRadius: "10px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.textColor : theme.background,
      color: state.isFocused ? theme.background : theme.textColor,
      cursor: "pointer",
      borderRadius: "10px",
      padding: "8px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.textColor,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: theme.textColor,
      "&:hover": {
        color: theme.textColor,
      },
    }),
  };

  return (
    <div className="footer">
      <div className="links">
        <a
          href="https://www.facebook.com/gkchavan2611"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Facebook />
        </a>
        <a
          href="https://twitter.com/Govindsing94865?t=1Js7ITX0f_TBNqYIKKKX8A&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Twitter />
        </a>
        <a
          href="https://instagram.com/govind_0126?igshid=ZDc4ODBmNjlmNQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Instagram />
        </a>
      </div>
      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme }}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default Footer;
