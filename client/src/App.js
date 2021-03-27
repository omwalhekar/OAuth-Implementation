import React, { useEffect } from "react";
import Login from "./components/Login";
import Landing from "./components/Landing";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./actions/auth";
import "./App.css";

function App(props) {
  useEffect(() => {
    props.fetch_user();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route eaxct path="/landing" component={Landing} />
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetch_user: () => {
      dispatch(auth());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
