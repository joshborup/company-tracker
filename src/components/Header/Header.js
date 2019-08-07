import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Shared/Logo";
import { FaBars } from "react-icons/fa";
import axios from "axios";

function LoggedInLinks({ setToggle, toggle }) {
  const dispatch = useDispatch();
  function logout() {
    axios.get("/api/logout").then(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
  }
  return (
    <div
      className={
        toggle ? "main-nav-link-container show" : "main-nav-link-container hide"
      }
    >
      <NavLink
        exact
        activeStyle={{ color: "#47caff" }}
        onClick={setToggle}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeStyle={{ color: "#47caff" }}
        onClick={setToggle}
        to="/students"
      >
        Students
      </NavLink>

      <NavLink
        exact
        activeStyle={{ color: "#47caff" }}
        onClick={setToggle}
        to="/companies/view"
      >
        Companies
      </NavLink>
      <NavLink
        exact
        activeStyle={{ color: "#47caff" }}
        onClick={setToggle}
        to="/companies/add"
      >
        Add Partner
      </NavLink>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Header(props) {
  const user = useSelector(state => state.userReducer.user);
  const [toggle, setToggle] = useState(false);
  return (
    <header className="main-header">
      <div>
        <div>
          <Logo />
        </div>
        <button
          onClick={() => setToggle(!toggle)}
          className="nav-toggler-button"
        >
          <FaBars />
        </button>
        <div>
          {user ? (
            <LoggedInLinks setToggle={() => setToggle(false)} toggle={toggle} />
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
