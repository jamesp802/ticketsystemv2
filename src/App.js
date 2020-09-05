import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import NavBar from "./components/navigation/navbar";
import UserDashBoard from "./components/user/userDashBoard";
import GitSignIn from "./components/auth/gitSignIn"

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Router>
          <Switch>
          <Route path="/user/signin">
              <GitSignIn />
            </Route>
            <Route path="/">
              <UserDashBoard />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
