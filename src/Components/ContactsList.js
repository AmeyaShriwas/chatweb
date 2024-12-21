import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import {Form} from 'react-bootstrap'

const ContactsList = () => {
  // Dummy data for contacts
  const contacts = [
    { name: "Ameya Shriwas", time: "12:45 PM" },
    { name: "John Doe", time: "11:30 AM" },
    { name: "Jane Smith", time: "10:15 AM" },
    { name: "Robert Brown", time: "9:20 AM" },
    { name: "Emily Davis", time: "8:00 AM" },
    { name: "Chris Wilson", time: "Yesterday" },
    { name: "Sophia Johnson", time: "2 Days Ago" },
    { name: "Michael Lee", time: "Last Week" },
    { name: "Olivia Taylor", time: "Last Month" },
    { name: "Daniel Harris", time: "1 Hour Ago" },
    { name: "Ameya Shriwas", time: "12:45 PM" },
    { name: "John Doe", time: "11:30 AM" },
    { name: "Jane Smith", time: "10:15 AM" },
    { name: "Robert Brown", time: "9:20 AM" },
    { name: "Emily Davis", time: "8:00 AM" },
    { name: "Chris Wilson", time: "Yesterday" },
    { name: "Sophia Johnson", time: "2 Days Ago" },
    { name: "Michael Lee", time: "Last Week" },
    { name: "Olivia Taylor", time: "Last Month" },
    { name: "Daniel Harris", time: "1 Hour Ago" }
  ];

  return (
    
      <ul className="list-group">
        <Form.Group className='border-rounded p-2'>
            <Form.Control type='text' placeholder='search'/>
        </Form.Group>
        <div className="overflow-auto" style={{maxHeight:'550px'}}>
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="container-fluid d-flex align-items-center">
              <FaRegUserCircle className="me-2" style={{ fontSize: '1.5rem' }} />
              <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                {contact.name}
              </span>
            </div>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              {contact.time}
            </span>
          </li>
        ))}
        </div>
      </ul>
   
  );
};

export default ContactsList;
