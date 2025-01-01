import React, { useState, ChangeEvent } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import {Form, Button, Spinner} from 'react-bootstrap'
import { TbLockPassword } from "react-icons/tb";
import { login } from '../../Redux/Slices/AuthenticationSlice';
import { useDispatch } from 'react-redux';

interface LoginProps {
    setFormSelected: (form: string) => void
}

interface LoginData {
    email: string,
    password: string
}

const Login:React.FC<LoginProps> = (props) => {
    const {setFormSelected}=  props
    const [data, setData] = useState<LoginData>({email: "", password: ""})
    const [error, setErrors] = useState<LoginData>({email: '', password: ''})
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const dispatch = useDispatch()


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
      const {name, value} = e.target
      setData((prev)=> ({
         ...prev,
         [name]: value
      }))
    }

    const validErros = () => {
        const error:Partial<LoginData> = {}; // Initialize the error object
    
        // Email validation
        if (data.email.length === 0) {
            error.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            error.email = 'Please enter a valid email address';
        }
    
        // Password validation
        if (data.password.length === 0) {
            error.password = 'Password is required';
        } else if (data.password.length < 8) {
            error.password = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(data.password)) {
            error.password = 'Password must contain at least one uppercase letter';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            error.password = 'Password must contain at least one special character';
        }
            setErrors(error as LoginData);
        return Object.keys(error).length === 0;
    };
    
    
    const handleSubmit = () => {
        if (validErros()) {
            setLoading(true)
            setTimeout(()=> {
                setLoading(false)
            }, 2000)
            console.log('Login data:', data); // Proceed if no errors
            dispatch(login(data) as any)
        }
    };

  return (
    <div className="w-100 p-3  " style={{ maxWidth: '300px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h3 className="text-dark font-weight-bold mb-3" style={{overflowY:'hidden'}}>Welcome Back!</h3>
                    <p className="text-muted">Login to continue your chat</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                                <MdAlternateEmail size={15} />
                        <Form.Control 
                            type="email" 
                            name='email'
                            onChange={handleInputChange}
                            placeholder="Enter email" 
                            isInvalid={!!error.email}
                            style={{ border: 'none', paddingLeft: '0.6rem' }} 
                        />
                           <Form.Control.Feedback type="invalid">
                            {error.email}
                        </Form.Control.Feedback>
                    </div>
                   
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                                <TbLockPassword  size={15} color="black"/>
                        <Form.Control 
                            type="password" 
                            name='password'
                            onChange={handleInputChange}
                            placeholder="Enter password" 
                            isInvalid={!!error.password}
                            style={{ border: 'none', paddingLeft: '0.6rem' }} 
                        />
                           <Form.Control.Feedback type="invalid">
                            {error.password}
                        </Form.Control.Feedback>
                      
                    </div>
                   
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <Button className="w-100" variant="dark" onClick={handleSubmit} >
                        {loading ? 
                       <span className="spinner-border text-light bg-dark" role="status">
                     </span>: 'Login'}
                       
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center cursor-pointer" style={{cursor:'pointer'}} onClick={()=> setFormSelected('forgotPassword')}>
                    <p className="text-decoration-none text-dark cursor-pointer ">Forgot your password?</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center cursor-pointer" style={{cursor:'pointer'}} onClick={()=> setFormSelected('signup')}>
                    <p className="text-decoration-none text-secondary">
                        Don't have an account? <span className="font-weight-bold text-dark">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
  )
}

export default Login
