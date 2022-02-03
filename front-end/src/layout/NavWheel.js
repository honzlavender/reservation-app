import React from "react";
import { Link } from "react-router-dom";
import "../CSS/NavWheel.css";


function NavWheel() {

    return (
      // <a className="navwheel" href="/">
        <nav className="menu">
        <ul>
          <li>
            {/* <Link to="/">Periodic Tables</Link> */}
            <a href="/">Periodic Tables</a>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/search">Search</Link>
          </li>

          <li>
          <Link to="/reservations/new">New Reservation</Link>
          </li>

          <li>
          <Link to="/tables/new">New Table</Link>
          </li>
        </ul>
      </nav>
      // </a>
    )
}

export default NavWheel;