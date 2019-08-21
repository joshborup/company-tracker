import React, { useState } from "react";
import logo from "../Shared/Logo.png";

function AuthContainer() {
  const [access, setAccess] = useState("login");

  return (
    <div className="login-register-container">
      <div className="button-tabs">
        <div>
          <button
            className={access === "login" ? "log active" : "log"}
            onClick={e => {
              e.preventDefault();
              window.location.href = `http://192.168.0.37:8080?redirect=http://192.168.0.37:8001/api/auth/callback`;
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
function Banner({ subMessage }) {
  return (
    <div className="banner">
      <img src={logo} alt="logo" />
      <h2>{subMessage}</h2>
    </div>
  );
}
function AuthPageContainer() {
  return (
    <div className="auth-container">
      <Banner subMessage="Company Search" />
      <div className="login">
        <div>
          <AuthContainer />
        </div>
      </div>
    </div>
  );
}

export default AuthPageContainer;
