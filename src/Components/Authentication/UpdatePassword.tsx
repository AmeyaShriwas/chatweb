import React, { ChangeEvent, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

interface UpdatePasswordProps {
    setFormSelected:(form: string)=> void
}

interface UpdatePasswordData {
    email: string,
    password: string,
    confirmPassword: string
}

const UpdatePassword:React.FC<UpdatePasswordProps> = (props) => {
    const { setFormSelected } = props;
    const [data, setData] = useState<UpdatePasswordData>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<UpdatePasswordData>({  email: "",
        password: "",
        confirmPassword: "",});
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors:Partial<UpdatePasswordData> = {};
        // Email Validation
        if (!data.email) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Enter a valid email address.";
        }

        // Password Validation
        if (!data.password) {
            errors.password = "Password is required.";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        // Confirm Password Validation
        if (data.confirmPassword !== data.password) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setError(errors as UpdatePasswordData);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);

            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                alert("Password updated successfully!");
                setFormSelected("login"); // Navigate to login
            }, 2000);
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
                        Update Password
                    </h3>
                    <p className="text-muted">Enter new password</p>
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
                    <Form.Label>Enter Password</Form.Label>
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <TbLockPassword size={15} />
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
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded">
                        <TbLockPassword size={15} />
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                            isInvalid={!!error.confirmPassword}
                            style={{ border: 'none', paddingLeft: '0.6rem' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.confirmPassword}
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
                            'Update Password'
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

export default UpdatePassword;
