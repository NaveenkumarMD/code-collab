import React, { useContext, useState } from "react";
import "../Styles/Login.css";
import Loginimage from "../Assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { gapiStarter, responseGoogle } from "../Functions/googleLogin";
import { toast, ToastContainer } from "react-toastify"
import UserContext from "../Context/UserContext";

import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { db } from '../App'
function Signup() {
    const navigate = useNavigate()
    const { userData, updateUserData } = useContext(UserContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleSignup = () => {
        if (data.email == "" || data.name == "" || data.password == "") {
            return toast.warning("Enter all the fields")
        }
        const docRef = doc(db, "users", data.email);
        getDoc(docRef).then(docSnap=>{
            if(docSnap.exists()){
                return toast.error("Mail ID already registered")
            }
            setDoc(doc(db,"users",data.email),data).then(()=>{
                toast.success("Successfully signed up")
                setTimeout(()=>{
                    navigate("/login")
                },[2000])
            })
        })



    }
    const handleinput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        gapiStarter();
    });

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="content-container">
                <div>
                    <div className="top-container">
                        <div>Hello folk</div>
                        <div>Let the journey begin</div>
                    </div>
                    <div>
                        <div className="input-container">
                            <div>Email</div>
                            <div className="ipt">
                                <input name="email" onChange={handleinput} placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="input-container">
                            <div>Name</div>
                            <div className="ipt">
                                <input name="name" onChange={handleinput} placeholder="Enter your name" />
                            </div>
                        </div>
                        <div className="input-container">
                            <div>Password</div>
                            <div className="ipt">
                                <input name="password" onChange={handleinput} type="password" placeholder="Enter your password" />
                            </div>
                        </div>

                        <div className="forgot-pass">Forgot password?</div>
                        <div className="btn-login" onClick={handleSignup}>
                            Signup
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
                            Already a member?<span onClick={() => {
                                navigate("/login")
                            }}>Login</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="img-container">
                <img src={Loginimage} />
            </div>
        </div>
    );
}

export default Signup;
