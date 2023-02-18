import React from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return <div className="mb-4">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <NavLink className="navbar-item" activeclassname="is-active" to="/">
            Home
          </NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink className="navbar-item" activeclassname="is-active" to="/addparkinglot">
            Add Parking Lot
          </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink className="navbar-item" activeclassname="is-active" to="/addfloors">
            Add Floors to Parking Lot
          </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink className="navbar-item" activeclassname="is-active" to="/addparkingspot">
            Add Parking Spot
          </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink className="navbar-item" activeclassname="is-active" to="/bookspot">
            Book Spot for Parking
          </NavLink>
        </div>
      </nav> */}

      <div class="nav nav-tabs">
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/">
          Home
        </NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/addparkinglot">
          Add Parking Lot
        </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/addfloors">
          Add Floors to Parking Lot
        </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/addparkingspot">
          Add Parking Spot
        </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/bookspot">
          Book Spot for Parking
        </NavLink>
        <NavLink className="nav-item nav-link" activeclassname="is-active" to="/releasespot">
         Check Out/Release Spot
        </NavLink>
      </div>
    </div>
  }
}