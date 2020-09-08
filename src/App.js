import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Auth from "./components/auth/helpers/isAuth";

import NavBar from "./components/navigation/navbar";
import UserDashBoard from "./components/user/userDashBoard";
import GitSignIn from "./components/auth/gitSignIn";
import UserSignUp from "./components/auth/signup";
import Login from "./components/auth/login";

import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const token = useSelector((state) => state.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token.isAuth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup">
              <UserSignUp />
            </Route>
            <Route path="/oauth">
              <GitSignIn />
            </Route>
            <PrivateRoute path="/dash" component={UserDashBoard} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
