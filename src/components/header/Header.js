import React from "react";
import "./Header.scss";
import coin from "../../coin.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="button menu" onClick={props.toggleMenu}>
        menu
      </div>
      <div className="header-right-container">
        <div className="coin-header-container">
          <p className="cookie-num">{props.cookieNum || 0}</p>
          <img src={coin} className="coin" alt="coin" />
        </div>
        <h1>TriviDuh</h1>
      </div>
    </div>
  );
};

export default Header;
