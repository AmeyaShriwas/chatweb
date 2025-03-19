import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Form, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../Redux/store";
import { setSelectedFriend } from "../Redux/Slices/ChatSlice";

interface Contact {
  name: string;
  id: string;
}

interface ContactsListProps {
  onContactClick?: (friend: Contact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ onContactClick }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state: RootState) => state.auth);
  const selectedFriend = useSelector((state: RootState) => state.chat.selectedFriend);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [allUsers, setAllUsers] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get<{ friends: Contact[] }>(
          `https://api.chatwithus.ameyashriwas.com/friend/friends/${userId}`
        );
        setContacts(data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get<Contact[]>(
          "https://api.chatwithus.ameyashriwas.com/friend/allUser"
        );
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    if (userId) {
      fetchContacts();
      fetchAllUsers();
    }
  }, [userId]);

  useEffect(() => {
    if (search.trim()) {
      setFilteredUsers(
        allUsers.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredUsers([]);
    }
  }, [search, allUsers]);

  const handleAddFriend = async (friendId: string) => {
    try {
      await axios.post("https://api.chatwithus.ameyashriwas.com/friend/add-friend", {
        userId,
        friendId,
      });
      alert("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend.");
    }
  };

  const handleSelectFriend = (friend: Contact) => {
    dispatch(setSelectedFriend(friend));
    if (onContactClick) {
      onContactClick(friend);
    }
  };

  return (
    <div className="p-3" style={{ backgroundColor: "#fff", color: "#000" }}>
      {/* Search Input */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderColor: "#000" }}
        />
      </Form.Group>

      {/* Search Results */}
      {filteredUsers.length > 0 && (
        <ListGroup className="mb-3">
          {filteredUsers.map((user) => (
            <ListGroup.Item
              key={user.id}
              className="d-flex justify-content-between align-items-center"
              style={{ 
                backgroundColor: "#fff", 
                color: "#000", 
                borderColor: "#ccc",
                transition: "0.3s"
              }}
            >
              <div className="d-flex align-items-center">
                <FaRegUserCircle className="me-2" style={{ fontSize: "1.5rem" }} />
                <span className="fw-bold">{user.name}</span>
              </div>
              <Button 
                size="sm" 
                variant="dark" 
                onClick={() => handleAddFriend(user.id)}
              >
                Add Friend
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Friends List */}
      <div className="overflow-auto" style={{ maxHeight: "500px" }}>
        {contacts.length > 0 ? (
          <ListGroup>
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                className="d-flex justify-content-between align-items-center"
                onClick={() => handleSelectFriend(contact)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  color: selectedFriend?.id === contact.id ? "#000" : "#555",
                  fontWeight: selectedFriend?.id === contact.id ? "bold" : "normal",
                  transition: "0.3s",
                  borderBottom: "1px solid #ccc"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f1f1"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                <div className="d-flex align-items-center">
                  <FaRegUserCircle className="me-2" style={{ fontSize: "1.5rem" }} />
                  <span>{contact.name}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted text-center">No friends added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
