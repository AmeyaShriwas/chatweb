import React, { useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { Form, Button, Spinner } from 'react-bootstrap';

const ForgotPassword = (props) => {
    const { setFormSelected } = props;
    const [data, setData] = useState({ email: "" });
    const [error, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateErrors = () => {
        const errors = {};

        // Email validation
        if (data.email.length === 0) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateErrors()) {
            setLoading(true);

            // Simulate an async operation
            setTimeout(() => {
                setLoading(false);
                setFormSelected('verifyOtp'); // Navigate to verify OTP
            }, 2000);

            console.log("Submitted Email:", data.email);
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
                    className="mb-3 w-100 d-flex justify-content-center"
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
