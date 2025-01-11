import React, { ChangeEvent, useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { Form, Button, Spinner } from 'react-bootstrap';
import { forgotPassword } from '../../Redux/Slices/AuthenticationSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


interface ForgotPasswordProps {
    setFormSelected : (form: string) => void
}

interface ForgotPasswordData {
    email: string
}

const ForgotPassword:React.FC<ForgotPasswordProps> = (props) => {
    const { setFormSelected } = props;
    const [data, setData] = useState<ForgotPasswordData>({ email: "" });
    const [error, setErrors] = useState<Partial<ForgotPasswordData>>({email: ''});
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch()

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateErrors = () => {
        const errors:Partial<ForgotPasswordData> = {};

        // Email validation
        if (data.email.length === 0) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        setErrors(errors as ForgotPasswordData);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        console.log('data', data)
        if (validateErrors()) {
          try{
console.log('data', data)
          const result = await dispatch(forgotPassword(data) as unknown as any)
          const {status} = result.payload
            Swal.fire({
                                  title: status ? 'Success!' : 'Error!',
                                  text: status ? 'successful.' : 'Not found.',
                                });
                      if(status){
                          setFormSelected('verifyOtp')
                      }


          }
          catch(error){
            console.log('error')
          }
        }
    };

    return (
        <div
            className="w-100 p-3"
            style={{ maxWidth: '300px', backgroundColor: 'white', borderRadius: '8px' }}
        >
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h3 className="text-dark font-weight-bold mb-3" style={{ overflowY: 'hidden' }}>
                        Forgot your Password
                    </h3>
                    <p className="text-muted">Verify Email</p>
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

                <Form.Group className="mb-4 w-100">
                    <Button
                        type="button"
                        className="w-100"
                        variant="dark"
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <Spinner animation="border" size="sm" role="status" />
                        ) : (
                            'Verify'
                        )}
                    </Button>
                </Form.Group>

                <Form.Group
                    className="mb-3 w-100 d-flex justify-content-center cursor-pointer" style={{cursor:'pointer'}}
                    onClick={() => setFormSelected('signup')}
                >
                    <p className="text-decoration-none text-secondary">
                        Don't have an account?{' '}
                        <span className="font-weight-bold text-dark">Sign up now</span>
                    </p>
                </Form.Group>
            </Form>
        </div>
    );
};

export default ForgotPassword;
