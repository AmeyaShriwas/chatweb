import React, { ChangeEvent, useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Form, Button, Spinner } from 'react-bootstrap';
import { CiUser } from "react-icons/ci";
import { signup } from '../../Redux/Slices/AuthenticationSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


interface SignupProps {
    setFormSelected: (form: string) => void
}

interface SignupData {
    name: string,
    email: string,
    password: string,
    number: string
}


const Signup: React.FC<SignupProps> = (props) => {
    const { setFormSelected } = props;
    const [data, setData] = useState<SignupData>({ name: "", email: "", password: "", number: "" });
    const [error, setErrors] = useState<SignupData>({name: '', email: '', password: '', number: ''});
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch()
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateErrors = () => {
        const errors:Partial<SignupData> = {};

        // Name validation
        if (data.name.trim().length === 0) {
            errors.name = "Full Name is required";
        }

        // Email validation
        if (data.email.trim().length === 0) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        // Password validation
        if (data.password.trim().length === 0) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = "Password must contain at least one uppercase letter";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            errors.password = "Password must contain at least one special character";
        }

         // Email validation
         if (data.number.trim().length === 0) {
            errors.number = "Number is required";
        } else if (data.number.length <10) {
            errors.number = "Invalid number";
        }

        setErrors(errors as SignupData);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async() => {
        if (!validateErrors() )return 
        try{
            const result  = await dispatch(signup(data) as unknown as any)
            console.log('result', result)
            const {status} = result.payload
        
                 Swal.fire({
                        title: status ? 'Success!' : 'Error!',
                        text: status ? 'Signup successful.' : 'Signup failed.',
                      });
            if(status){
                setFormSelected('verifyOtp')
            }
        }
        catch(error){
            console.log('error')
        }
       
    };

    return (
        <div className="w-100 p-3" style={{ maxWidth: '300px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h3 className="text-dark font-weight-bold mb-3" style={{ overflowY: 'hidden' }}>Welcome!</h3>
                    <p className="text-muted">Signup to Register</p>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Full Name</Form.Label>
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <CiUser size={15} color="black" />
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            isInvalid={!!error.name}
                            style={{ border: 'none', paddingLeft: '0.6rem' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.name}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 w-100">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <MdAlternateEmail size={15} />
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleInputChange}
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
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <TbLockPassword size={15} color="black" />
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleInputChange}
                            isInvalid={!!error.password}
                            style={{ border: 'none', paddingLeft: '0.6rem' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.password}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 w-100">
                    <Form.Label>Number</Form.Label>
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <TbLockPassword size={15} color="black" />
                        <Form.Control
                            type="number"
                            name="number"
                            placeholder="Enter number"
                            onChange={handleInputChange}
                            isInvalid={!!error.number}
                            style={{ border: 'none', paddingLeft: '0.6rem' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.number}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <Button className="w-100" variant="dark" onClick={handleSubmit} disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Signup'}
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3 w-100 d-flex justify-content-center cursor-pointer" style={{cursor:'pointer'}} onClick={() => setFormSelected('login')}>
                    <p className="text-decoration-none text-secondary">
                        Already have an account? <span className="font-weight-bold text-dark">Login now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Signup;
