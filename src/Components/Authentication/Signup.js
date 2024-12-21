import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import {Form, Button} from 'react-bootstrap'
import { CiUser } from "react-icons/ci";



const Signup = (props) => {
    const {setFormSelected} = props
  return (
    <div className="w-100 p-3  " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '8px' }}>
               <Form className="d-flex flex-column align-items-center w-100">
                   <Form.Group className="mb-4 w-100 text-center">
                       <h2 className="text-dark font-weight-bold mb-3">Welcome!</h2>
                       <p className="text-muted">Signup to Register</p>
                   </Form.Group>
   
                   <Form.Group className="mb-3 w-100">
                       <Form.Label>Full Name</Form.Label>
                       <div className="input-group shadow-lg p-1  pl-3 d-flex justify-content-center align-items-center rounded">
                        
                                   <CiUser size={15} color="black"/>
   
                              
                           <Form.Control 
                               type="text" 
                               placeholder="Enter your name" 
                               style={{ border: 'none', paddingLeft: '0.6rem' }} 
                           />
                       </div>
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
                           Signup
                       </Button>
                   </Form.Group>
   
                   <Form.Group className="mb-3 w-100 d-flex justify-content-center" onClick={()=> setFormSelected('login')}>
                       <p  className="text-decoration-none text-secondary">
                           Already have an account? <span className="font-weight-bold text-dark">Login now</span>
                       </p>
                   </Form.Group>
               </Form>
           </div>
  )
}

export default Signup
