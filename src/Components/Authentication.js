import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import AuthImg from './../assets/authImg.png'
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";


const Authentication = () => {
    const [img, setImg] = useState(true)
    const [formSelected, setFormSelected] = useState('login')
    const [error, setError] = useState({})
 
    const UiToRender = ()=> {
      if(formSelected === 'login'){
        return LoginForm()
      }
      if(formSelected === 'signup'){
        return SignUpForm()
      }
      if(formSelected === 'forgotPassword'){
        return ForgotPassword()
      }
      if(formSelected === 'verifyOtp'){
        return VerifyOtp()
      }
      if(formSelected === 'updatePassword'){
        return UpdatePassword()
      }
    }

    useEffect(()=> {
      console.log('window', window)
      const fetchWidht = ()=> {
        if(window.innerWidth <700){
            console.log('width', window.innerWidth )
            setImg(false)
          }
          else{
            setImg(true)
          }
      }
      fetchWidht()
      window.addEventListener('resize', fetchWidht)
    }, [])


    const LoginForm = ()=> {
        return (
            <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Welcome Back!</h2>
                    <p className="text-muted">Login to continue your chat</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <MdAlternateEmail size={20} />

                            </span>
                        </div>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                <TbLockPassword  size={20} color="black"/>

                            </span>
                        </div>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <Button type="submit" className="w-100" variant="dark" style={{backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '10px'}}>
                        Login
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('forgotPassword')}>
                    <p className="text-decoration-none text-primary">Forgot your password?</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-primary">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
        )
    }

    const SignUpForm = ()=> {
        return (
            <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Welcome!</h2>
                    <p className="text-muted">Signup to Register</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Full Name</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text p-3    justify-content-center aligh-items-center border" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <CiUser size={20} color="black"/>

                            </span>
                        </div>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter your name" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <MdAlternateEmail size={20} />

                            </span>
                        </div>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                <TbLockPassword  size={20} color="black"/>

                            </span>
                        </div>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <Button type="submit" className="w-100" variant="dark" style={{backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '10px'}}>
                        Signup
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('login')}>
                    <p  className="text-decoration-none text-secondary">
                        Already have an account? <span className="font-weight-bold text-primary">Login now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
        )
    }

    const ForgotPassword = ()=> {
        return (
            <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Forgot your Password</h2>
                    <p className="text-muted">Verify Email</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <MdAlternateEmail size={20} />

                            </span>
                        </div>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

        
                <Form.Group className="mb-4 w-100" onClick={()=> setFormSelected('verifyOtp')}>
                    <Button type="submit" className="w-100" variant="dark" style={{backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '10px'}}>
                        Verify
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-primary">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
        )
    }

    const VerifyOtp = ()=> {
        return (
            <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Verify Otp</h2>
                    <p className="text-muted">Enter otp</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <MdAlternateEmail size={20} />

                            </span>
                        </div>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100 ">
                    <Form.Label>Otp</Form.Label>
                    <div className="input-group border">
                       
                        <Form.Control 
                            type="number" 
                            placeholder="Enter otp" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>


        
                <Form.Group className="mb-4 w-100" onClick={()=> setFormSelected('updatePassword')}>
                    <Button type="submit" className="w-100" variant="dark" style={{backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '10px'}}>
                        Verify otp
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-primary">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
        )
    }

    const UpdatePassword = ()=> {
        return (
            <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Update Password</h2>
                    <p className="text-muted">Enter new password</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text border p-3" style={{backgroundColor: 'white', border:'none'}}>
                                {/* <FaUserAlt size={30} color="black" /> */}
                                <MdAlternateEmail size={20} />

                            </span>
                        </div>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100 ">
                    <Form.Label>Enter Password</Form.Label>
                    <div className="input-group border">
                       
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100 ">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group border">
                       
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password" 
                            style={{ borderLeft: 'none', paddingLeft: '2.5rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 w-100" onClick={()=> setFormSelected('login')}>
                    <Button type="submit" className="w-100" variant="dark" style={{backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '10px'}}>
                        Update Password
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-primary">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
        )
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center " style={{backgroundColor:'#F5F5F5', height:'100vh'}} >
            <div class=" d-flex border rounded border-light shadow p-4 mt-4" >
           {/* {img && <div >
                <img  src={AuthImg}/>
            </div>} */}
          {UiToRender(  )}
            </div>
        </div>
    )
}

export default Authentication
