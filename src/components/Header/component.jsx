import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo"></div>
          </div>
          <div className="col-lg-10">
            <div className="header__nav">
              <nav className="navbar navbar-expand-lg header__menu"></nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
