import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import Logo from "../Shared/Logo";
import Layout from "../Layout/Layout";
import axios from "axios";

export default function Nheader() {
  const [background, setBackground] = useState(window.location.pathname);
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  function logout() {
    axios.get("/api/logout").then(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
  }

  return (
    <nav id="navbar">
      <Layout
        minHeight={"0"}
        padding={"0"}
        justifyContent="space-between"
        flexDirection="row"
      >
        <Logo className="logo" />
        <ul className={toggle ? "hide" : "show"}>
          <NavLink
            exact
            activeClassName="active"
            onClick={() => {
              setBackground("");
              setToggle(!toggle);
            }}
            to="/"
          >
            <li>Home</li>
          </NavLink>

          <NavLink
            activeClassName="active"
            onClick={() => {
              setBackground("");
              setToggle(!toggle);
            }}
            to="/students"
          >
            <li>Students</li>
          </NavLink>
          <div
            style={{
              display: "inline-block",
              background:
                window.location.pathname === "/companies/view" ||
                window.location.pathname === "/companies/add"
                  ? "rgb(0, 140, 255)"
                  : background
            }}
            className="links-container"
            to="/companies/view"
          >
            <li>
              Companies
              <ul>
                <NavLink
                  exact
                  activeClassName="active"
                  onClick={() => {
                    setBackground("rgb(0, 140, 255)");
                    setToggle(!toggle);
                  }}
                  to="/companies/view"
                >
                  <li>Companies</li>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="active"
                  onClick={() => {
                    setBackground("rgb(0, 140, 255)");
                    setToggle(!toggle);
                  }}
                  to="/companies/add"
                >
                  <li>Add Company</li>
                </NavLink>
              </ul>
            </li>
          </div>
          <NavLink
            className="logout"
            exact
            onClick={() => {
              setBackground("");
              logout();
              setToggle(!toggle);
            }}
            to="/"
          >
            <li>Logout</li>
          </NavLink>
        </ul>
        <button className="mobile-toggle" onClick={() => setToggle(!toggle)}>
          <FaBars color="white" />
        </button>
      </Layout>
    </nav>
  );
}
