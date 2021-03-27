import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import googleSVG from "../img/google.svg";

const Login = ({ user }) => {
  return user ? (
    <Redirect to="/landing" />
  ) : (
    <div className="container">
      <div className="login">
        <div className="login-credentials">
          <center>
            <h2 className="login-title">Log in to your account</h2>
          </center>

          <label htmlFor="email">Email</label>
          <input className="input" type="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="email" name="email" />

          <div className="OR">
            <span className="OR-text">OR</span>
          </div>
          <a className="btn sign-in-btn" href="/auth/google">
            <img src={googleSVG} alt="" srcset="" />
            <span>Sign In with Google</span>
          </a>
          <center className="sign-up-opt">
            Don't have an account?{" "}
            <a className="sign-up-link" href="/auth/google">
              Sign Up
            </a>
          </center>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
