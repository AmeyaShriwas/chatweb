import React, { ChangeEvent, useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { Form, Button } from 'react-bootstrap';
import { verifyOTP } from '../../Redux/Slices/AuthenticationSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


interface VerifyOtpProps {
     setFormSelected: (form: string) => void
}

interface VerifyData {
  email: string,
  otp: string
}

const VerifyOtp:React.FC<VerifyOtpProps> = ({ setFormSelected }) => {
   const[data, setData] = useState({email: "", otp: ""})
   const [error, setErrors] = useState<Partial<VerifyData>>({email: "", otp: ""})
   const dispatch = useDispatch()
   const navigate = useNavigate()

const handleChange = (e: ChangeEvent<HTMLInputElement>): void=> {
    const{name, value} = e.target
    setData((prev)=> ({
       ...prev,
       [name]: value
    }))
}

const ValidateForm = (): boolean => {
   const newErrors : Partial<VerifyData> = {}
   if(!data.email){
    newErrors.email = 'Email is required'
   } 
   else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
    newErrors.email ='Email is invalid'
   }

   if(!data.otp){
    newErrors.otp = "Otp is required"
   }else if(data.otp.length === 0){
    newErrors.otp = 'Invalid otp'
   }
  
   setErrors(newErrors)
   return Object.keys(newErrors).length  === 0
}

const handleSubmit = async()=> {
   if(!ValidateForm()) return
   try{
    const result = await dispatch(verifyOTP(data) as unknown as any)
    const {status} = result.payload

     Swal.fire({
            title: status ? 'Success!' : 'Error!',
            text: status ? 'Verification successful.' : 'Verification failed.',
          });
    
          if (status) setFormSelected('signup')

   }
   catch(error){
    console.log('error')
   }
}

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
              name='email'
              onChange={handleChange}
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
              name='otp'
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        {/* Verify Button */}
        <Form.Group className="mb-4 w-100">
          <Button 
            type="submit" 
            className="w-100" 
            variant="dark" 
            onClick={handleSubmit}
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
