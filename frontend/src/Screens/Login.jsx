import React, { useContext } from "react";
import "../Styles/Login.css";
import Loginimage from "../Assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { gapiStarter, responseGoogle } from "../Functions/googleLogin";
import { toastGenerator } from "../Functions/toast";
import UserContext from "../Context/UserContext";

import { GoogleLogin } from "react-google-login";
function Login() {
  const { userData, updateUserData } = useContext(UserContext);

  const handleLogin = () => {
    toastGenerator("info", "Logging you in, please wait!");
    //todo: handle email login and signup
    console.log("logging in");
    updateUserData({ userName: "hello", email: "test" });
    console.log(userData);
  };

  useEffect(() => {
    gapiStarter();
  });

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={Loginimage} />
      </div>
      <div className="content-container">
        <div>
          <div className="top-container">
            <div>Welcome back</div>
            <div>Let the journey begin again</div>
          </div>
          <div>
            <div className="input-container">
              <div>Email</div>
              <div className="ipt">
                <input placeholder="Enter your email" />
              </div>
            </div>
            <div className="input-container">
              <div>Password</div>
              <div className="ipt">
                <input type="password" placeholder="Enter your password" />
              </div>
            </div>
            <div className="forgot-pass">Forgot password?</div>
            <div className="btn-login" onClick={handleLogin}>
              Login
            </div>
            <GoogleLogin
              buttonText="Continue with google"
              className="btn-google"
              clientId={process.env.REACT_APP_CLIENT_ID}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              //todo: implement handle succes and error for g-login
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            <div className="signup-text">
              Don't have an account?<span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
