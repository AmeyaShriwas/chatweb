import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import {Form , Button } from 'react-bootstrap'

const VerifyOtp = (props) => {
    const {setFormSelected} = props
  return (
    <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
            <Form className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 w-100 text-center">
                    <h2 className="text-dark font-weight-bold mb-3">Verify Otp</h2>
                    <p className="text-muted">Enter otp</p>
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

                <Form.Group className="mb-3 w-100 ">
                    <Form.Label>Otp</Form.Label>
                    <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                       
                        <Form.Control 
                            type="number" 
                            placeholder="Enter otp" 
                            style={{ border: 'none', paddingLeft: '0.6rem' }} 
                        />
                    </div>
                </Form.Group>


        
                <Form.Group className="mb-4 w-100" onClick={()=> setFormSelected('updatePassword')}>
                    <Button type="submit" className="w-100" variant="dark" >
                        Verify otp
                    </Button>
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

export default VerifyOtp
