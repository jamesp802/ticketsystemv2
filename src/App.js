import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import NavBar from "./components/navigation/navbar";
import UserDashBoard from "./components/user/userDashBoard";
import GitSignIn from "./components/auth/gitSignIn";
import UserSignUp from "./components/auth/signup";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Router>
          <Switch>
            <Route path="/login">
              <GitSignIn />
            </Route>
            <Route path="/signup">
              <UserSignUp />
            </Route>
            <Route path="/oauth">
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
