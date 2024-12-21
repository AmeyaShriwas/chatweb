import React, { useEffect, useState } from 'react'

import Login from './../Components/Authentication/Login'
import Signup from './../Components/Authentication/Signup'
import ForgotPassword from './../Components/Authentication/ForgotPassword'
import VerifyOtp from '../Components/Authentication/VerifyOtp'
import UpdatePassword from '../Components/Authentication/UpdatePassword'



const Authentication = () => {
    const [formSelected, setFormSelected] = useState('login')
 
    const UiToRender = ()=> {
      if(formSelected === 'login'){
        return LoginForm()
      }
      if(formSelected === 'signup'){
        return SignUpForm()
      }
      if(formSelected === 'forgotPassword'){
        return ForgotPasswordForm()
      }
      if(formSelected === 'verifyOtp'){
        return VerifyOtpForm()
      }
      if(formSelected === 'updatePassword'){
        return UpdatePasswordForm()
      }
    }

    const LoginForm = ()=> {
        return (
           <Login setFormSelected={setFormSelected}/>
        )
    }

    const SignUpForm = ()=> {
        return (
           <Signup setFormSelected={setFormSelected}/>
        )
    }

    const ForgotPasswordForm = ()=> {
        return (
           <ForgotPassword setFormSelected={setFormSelected}/>
        )
    }

    const VerifyOtpForm = ()=> {
        return (
           <VerifyOtp setFormSelected={setFormSelected}/>
        )
    }

    const UpdatePasswordForm = ()=> {
        return (
           <UpdatePassword setFormSelected={setFormSelected}/>
        )
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center w-60" style={{backgroundColor:'#F5F5F5', height:`100vh`}} >
         <div class='w-80 p-4'>
          {UiToRender()}
          </div>
        </div>
    )
}

export default Authentication
