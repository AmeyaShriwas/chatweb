import React from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { Form, Button } from 'react-bootstrap';

interface VerifyOtpProps {
     setFormSelected: (form: string) => void
}

const VerifyOtp:React.FC<VerifyOtpProps> = ({ setFormSelected }) => {
  return (
    <div 
      className="w-100 p-3" 
      style={{ maxWidth: '300px', backgroundColor: 'white', borderRadius: '8px' }}
    >
      <Form className="d-flex flex-column align-items-center w-100">
        {/* Header Section */}
        <Form.Group className="mb-4 w-100 text-center">
          <h3 className="text-dark font-weight-bold mb-3">Verify OTP</h3>
          <p className="text-muted">Enter the OTP sent to your email</p>
        </Form.Group>

        {/* Email Input */}
        <Form.Group className="mb-3 w-100">
          <Form.Label>Email Address</Form.Label>
          <div 
            className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded"
          >
            <MdAlternateEmail size={20} className="text-secondary" />
            <Form.Control
              type="email"
              placeholder="Enter your registered email"
              style={{ border: 'none', paddingLeft: '0.6rem' }}
              aria-label="Email Address"
            />
          </div>
        </Form.Group>

        {/* OTP Input */}
        <Form.Group className="mb-3 w-100">
          <Form.Label>OTP</Form.Label>
          <div 
            className="input-group shadow-lg p-1 pl-3 d-flex justify-content-center align-items-center rounded"
          >
            <Form.Control
              type="number"
              placeholder="Enter the OTP"
              style={{ border: 'none', paddingLeft: '0.6rem' }}
              aria-label="OTP"
            />
          </div>
        </Form.Group>

        {/* Verify Button */}
        <Form.Group className="mb-4 w-100">
          <Button 
            type="submit" 
            className="w-100" 
            variant="dark" 
            onClick={() => setFormSelected('updatePassword')}
          >
            Verify OTP
          </Button>
        </Form.Group>

        {/* Sign Up Link */}
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

export default VerifyOtp;
