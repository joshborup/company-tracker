import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Shared/Logo";
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
      <NavLink onClick={setToggle} to="/">
        Home
      </NavLink>
      <NavLink onClick={setToggle} to="/page1">
        Page 1
      </NavLink>
      <NavLink onClick={setToggle} to="/page2">
        Page 2
      </NavLink>
      <NavLink onClick={setToggle} to="/page3">
        Page 3
      </NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Header(props) {
  const user = useSelector(state => state.user);
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
          Toggle
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
