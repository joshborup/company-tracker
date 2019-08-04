import React, { useState, useEffect } from "react";
import { customeErrMessage } from "../../utils/frontUtils";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import ReactLoading from "react-loading";
import axios from "axios";

import { useDispatch } from "react-redux";

function Button({ label, action, className }) {
  return (
    <button className={className} onClick={() => action()}>
      {label}
    </button>
  );
}

function Login({ className }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function login() {
    setLoading(true);
    axios
      .post("/api/login", { username, password })
      .then(res => {
        let current = true;
        if (current) {
          setLoading(false);
          dispatch({ type: "SET_USER", payload: res.data });
        }
        return () => {
          current = false;
        };
      })
      .catch(err => {
        setLoading(false);
        customeErrMessage(setMessage, err.response.data);
      });
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={className}>
      <div>
        <input
          placeholder="Username"
          autoFocus={true}
          autoComplete="username"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <div className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
      </div>
      <Button
        action={
          username && password
            ? login
            : () => {
                customeErrMessage(
                  setMessage,
                  "type anything if you want that button to work"
                );
              }
        }
        label={
          loading ? (
            <div>
              <span>Logging In</span>{" "}
              <ReactLoading
                type={"bars"}
                width="20px"
                height="20px"
                color="#fff"
              />
            </div>
          ) : (
            <div>
              <span>Login</span>
              <FaSignInAlt />
            </div>
          )
        }
        className="auth-btn"
      />
      <span>{message}</span>
    </form>
  );
}

function Register({ className }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondTimePassword, setsecondTimePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function register() {
    let current = true;
    setLoading(true);
    axios
      .post("/api/register", { username, password, email })
      .then(res => {
        if (current) {
          setLoading(false);
          dispatch({ type: "SET_USER", payload: res.data });
        }
        return () => {
          current = false;
        };
      })
      .catch(err => {
        const { message, errmsg } = err.response.data;
        const errorMessage = message || errmsg;
        setLoading(false);
        customeErrMessage(setMessage, errorMessage);
      });
  }

  useEffect(() => {
    setPasswordMatch(false);
    if (password === secondTimePassword) {
      setPasswordMatch(true);
    }
  }, [password, secondTimePassword]);
  return (
    <form onSubmit={e => e.preventDefault()} className={className}>
      <div>
        <input
          placeholder="Username"
          autoComplete="username"
          autoFocus={true}
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div>
        <input
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={secondTimePassword}
          onChange={({ target: { value } }) => setsecondTimePassword(value)}
        />
      </div>
      <Button
        action={
          passwordMatch
            ? register
            : () => customeErrMessage(setMessage, "passwords dont match")
        }
        label={
          loading ? (
            <div>
              <span>Registering</span>{" "}
              <ReactLoading
                type={"bars"}
                width="20px"
                height="20px"
                color="#fff"
              />
            </div>
          ) : (
            <div>
              <span>Register</span>
              <FaUserPlus />
            </div>
          )
        }
        className="auth-btn"
      />
      <span>{message}</span>
    </form>
  );
}

function AuthContainer() {
  const [access, setAccess] = useState("login");

  return (
    <div className="login-register-container">
      <div className="button-tabs">
        <div>
          <button
            className={access === "login" ? "log active" : "log"}
            onClick={() => setAccess("login")}
          >
            Login
          </button>
        </div>
        <div>
          <button
            className={access === "register" ? "reg active" : "reg"}
            onClick={() => setAccess("register")}
          >
            Register
          </button>
        </div>
      </div>
      <div>
        {access === "register" ? (
          <Register className="auth-flex" />
        ) : access === "login" ? (
          <Login className="auth-flex" />
        ) : (
          <Login className="auth-flex" />
        )}
      </div>
    </div>
  );
}
function Banner({ mainMessage, subMessage }) {
  return (
    <div className="banner">
      <h1>{mainMessage}</h1>
      <h2>{subMessage}</h2>
    </div>
  );
}
function AuthPageContainer() {
  return (
    <div className="auth-container">
      <Banner mainMessage="Title" subMessage="Sub title/Call to action" />
      <div className="login">
        <div>
          <AuthContainer />
        </div>
      </div>
    </div>
  );
}

export default AuthPageContainer;
