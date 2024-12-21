import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import {Form, Button} from 'react-bootstrap'
import { TbLockPassword } from "react-icons/tb";



const Login = (props) => {
    const {setFormSelected}=  props
  return (
    <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Welcome Back!</h2>
                    <p className="text-muted">Login to continue your chat</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                                <MdAlternateEmail size={15} />
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ border: 'none', paddingLeft: '0.6rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                                <TbLockPassword  size={15} color="black"/>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password" 
                            style={{ border: 'none', paddingLeft: '0.6rem' }} 
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <Button type="submit" className="w-100" variant="dark" >
                        Login
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('forgotPassword')}>
                    <p className="text-decoration-none text-dark">Forgot your password?</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-dark">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
  )
}

export default Login
