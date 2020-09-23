import { withRouter } from "react-router-dom";
import Auth from "./isAuth";

const AuthButton = withRouter(({ history }) =>
  Auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

export default AuthButton;
