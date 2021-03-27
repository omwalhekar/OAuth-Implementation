import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = ({ user }) => {
  return user ? (
    <div className="landing-container">
      <div className="user-info">
        <h1 className="user-name">Hello, {user.firstName}</h1>

        <div className="user-details">
          <p className="">Below mentioned are your details:</p>
          <br />
          <h3 className="">Name: {user.firstName + " " + user.lastName}</h3>
          <h3 className="">Email: {user.email}</h3>
        </div>

        <a className="btn sign-out-btn" href="/api/logout">
          Logout
        </a>
      </div>
    </div>
  ) : (
    // history.push("/")
    <Redirect to="/" />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Landing);
