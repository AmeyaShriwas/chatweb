import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Form } from "react-bootstrap";

interface ContactsListProps {
  onContactClick?: () => void; // Callback for contact clicks
}

const ContactsList: React.FC<ContactsListProps> = ({ onContactClick }) => {
  const contacts = [
    { name: "Ameya Shriwas", time: "12:45 PM" },
    { name: "John Doe", time: "11:30 AM" },
    { name: "Jane Smith", time: "10:15 AM" },
    { name: "Ameya Shriwas", time: "12:45 PM" },
    { name: "John Doe", time: "11:30 AM" },
    { name: "Jane Smith", time: "10:15 AM" },
    { name: "Ameya Shriwas", time: "12:45 PM" },
    { name: "John Doe", time: "11:30 AM" },
    { name: "Jane Smith", time: "10:15 AM" },
    // Add more contacts as needed...
  ];

  return (
    <ul className="list-group">
      <Form.Group className="border-rounded p-2">
        <Form.Control type="text" placeholder="Search" />
      </Form.Group>
      <div className="overflow-auto" style={{ maxHeight: "550px" }}>
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={onContactClick} // Trigger callback
            style={{ cursor: "pointer" }}
          >
            <div className="container-fluid d-flex align-items-center">
              <FaRegUserCircle className="me-2" style={{ fontSize: "1.5rem" }} />
              <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {contact.name}
              </span>
            </div>
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              {contact.time}
            </span>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default ContactsList;
