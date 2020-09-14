import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { getUserData } from "./redux/actions/userActions";

import Auth from "./components/auth/helpers/isAuth";

import NavBar from "./components/navigation/navbar";
import UserDashBoard from "./components/user/userDashBoard";
import GitSignIn from "./components/auth/gitSignIn";
import UserSignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import ProjectOverview from "./components/project/projectOverview"

import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null ? (
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
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.props.login().then(() => {
      this.setState({
        isLoaded: true,
      });
    });
  }

  render() {
    //FIXME: isLoaded needed?
    if (this.state.isLoaded === false) {
      return "loading...";
    }

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
            <PrivateRoute path="/dash/project/:id" component={ProjectOverview} />
            <PrivateRoute path="/dash" component={UserDashBoard} />
          </Switch>
        </Router>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(getUserData()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
