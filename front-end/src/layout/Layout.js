import React from "react";
import Routes from "./Routes";

import "./Layout.css";
import NavWheel from "./NavWheel";
import Footer from "../MiscComponents/Footer";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" id="layout">
          <NavWheel />
          <Routes />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;