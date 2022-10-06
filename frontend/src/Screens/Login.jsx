import React from 'react'
import '../Styles/Login.css'
import Loginimage from '../Assets/login.svg'
import {FcGoogle} from "react-icons/fc" 
function Login() {
    return (
        <div className='login-container'>
            <div className='img-container'>
                <img src={Loginimage} />
            </div>
            <div className='content-container'>
                <div>
                    <div className='top-container'>
                        <div>Welcome back</div>
                        <div>Let the journey begin again</div>
                    </div>
                    <div>
                        <div className='input-container'>
                            <div>Email</div>
                            <div className='ipt'>
                                <input placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='input-container'>
                            <div>Password</div>
                            <div className='ipt'>
                                <input type="password" placeholder='Enter your password' />
                            </div>
                        </div>
                        <div className='forgot-pass'>Forgot password?</div>
                        <div className='btn-login'>
                                Login
                        </div>
                        <div className='btn-google'>
                            <FcGoogle  size={20}/>
                            <div>Continue with google</div>
                        </div>
                        <div className='signup-text'>Don't have an account?<span>Sign up</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
