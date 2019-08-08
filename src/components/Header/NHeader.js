import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Shared/Logo";
import { FaBars } from "react-icons/fa";
import Layout from "../Layout/Layout";
import axios from "axios";
export default function Nheader() {
  const user = useSelector(state => state.userReducer.user);
  const [toggle, setToggle] = useState(false);
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
        justifyContent="flex-end"
        flexDirection="row"
      >
        <ul>
          <NavLink exact activeClassName="active" onClick={setToggle} to="/">
            <li>Home</li>
          </NavLink>

          <NavLink activeClassName="active" onClick={setToggle} to="/students">
            <li>Students</li>
          </NavLink>
          <NavLink
            activeClassName="active"
            onClick={setToggle}
            to="/companies/view"
          >
            <li>
              Companies <i class="fas fa-angle-down" />
              <ul>
                <NavLink
                  exact
                  activeClassName="active"
                  onClick={setToggle}
                  to="/companies/view"
                >
                  <li>Companies</li>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="active"
                  onClick={setToggle}
                  to="/companies/add"
                >
                  <li>Add Partner</li>
                </NavLink>
              </ul>
            </li>
          </NavLink>
          <NavLink
            className="logout"
            exact
            onClick={setToggle}
            to="/"
            onClick={logout}
          >
            <li>Logout</li>
          </NavLink>
        </ul>
      </Layout>
    </nav>
  );
}
