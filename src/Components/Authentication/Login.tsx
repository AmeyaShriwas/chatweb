import React, { useState, ChangeEvent } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Form, Button, Spinner } from 'react-bootstrap';
import { login } from '../../Redux/Slices/AuthenticationSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setFormSelected: (form: string) => void;
}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ setFormSelected }) => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one uppercase letter';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one special character';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await dispatch(login(formData) as unknown as any);
    
      console.log('result', result)
      const { status } = result.payload;

      Swal.fire({
        title: status ? 'Success!' : 'Error!',
        text: status ? 'Login successful.' : 'Login failed.',
      });

      if (status) navigate('/chat');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-100 p-3"
      style={{ maxWidth: '300px', backgroundColor: 'white', borderRadius: '8px' }}
    >
      <Form className="d-flex flex-column align-items-center w-100">
        <Form.Group className="mb-4 w-100 text-center">
          <h3 className="text-dark font-weight-bold mb-3">Welcome Back!</h3>
          <p className="text-muted">Login to continue your chat</p>
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label>Email Address</Form.Label>
          <div className="input-group shadow-lg p-1 rounded d-flex justify-content-center align-items-center">
            <MdAlternateEmail size={15} />
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              isInvalid={!!errors.email}
              style={{ border: 'none', paddingLeft: '0.6rem' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label>Password</Form.Label>
          <div className="input-group shadow-lg p-1 rounded d-flex justify-content-center align-items-center">
            <TbLockPassword size={15} color="black" />
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              isInvalid={!!errors.password}
              style={{ border: 'none', paddingLeft: '0.6rem' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-4 w-100">
          <Button
            className="w-100"
            variant="dark"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Login'
            )}
          </Button>
        </Form.Group>

        <Form.Group
          className="mb-3 w-100 d-flex justify-content-center"
          onClick={() => setFormSelected('forgotPassword')}
          style={{ cursor: 'pointer' }}
        >
          <p className="text-dark">Forgot your password?</p>
        </Form.Group>

        <Form.Group
          className="mb-3 w-100 d-flex justify-content-center"
          onClick={() => setFormSelected('signup')}
          style={{ cursor: 'pointer' }}
        >
          <p className="text-secondary">
            Don't have an account? <span className="font-weight-bold text-dark">Sign up now</span>
          </p>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
