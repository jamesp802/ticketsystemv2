import { useSelector } from "react-redux";


const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    const token = useSelector((state) => state.token);
    if (token.isAuth) {
      this.isAuthenticated = true;
      cb();
    }
  },
  signout(cb) {
    this.isAuthenticated = false;
    // revoke token?
    // setTimeout(cb, 100);
  },
};

export default Auth;