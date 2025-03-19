import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import { RootState } from "../Redux/store";
import { setSelectedFriend } from "../Redux/Slices/ChatSlice";
import { FaRegUserCircle } from "react-icons/fa";

interface Contact {
  name: string;
  id: string;
  image: string;
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

  // ✅ Fetch Friends List
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

  // ✅ Fetch All Users
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

  // ✅ Initial API calls
  useEffect(() => {
    if (userId) {
      fetchContacts();
      fetchAllUsers();
    }
  }, [userId]);

  // ✅ Filter users based on search
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

  // ✅ Handle Add Friend with Refresh
  const handleAddFriend = async (friendId: string) => {
    try {
      await axios.post("https://api.chatwithus.ameyashriwas.com/friend/add-friend", {
        userId,
        friendId,
      });

      swal("Friend Added!", "Your friend has been added successfully.", "success");

      // Refresh contacts after adding friend
      fetchContacts();
    } catch (error) {
      console.error("Error adding friend:", error);
      swal("Failed", "Unable to add friend. Please try again.", "error");
    }
  };

  // ✅ Handle Select Friend
  const handleSelectFriend = (friend: Contact) => {
    dispatch(setSelectedFriend(friend));
    if (onContactClick) {
      onContactClick(friend);
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#fff", color: "#000", borderRadius: "8px" }}>
      
      {/* ✅ Search Input */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderColor: "#ccc", padding: "12px" }}
        />
      </Form.Group>

      {/* ✅ Search Results */}
      {filteredUsers.length > 0 && (
        <ListGroup className="mb-4">
          {filteredUsers.map((user) => (
            <ListGroup.Item
              key={user.id}
              className="d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#f9f9f9",
                color: "#000",
                transition: "0.3s",
                cursor: "pointer",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9e9e9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            >
              <div className="d-flex align-items-center">
                {user.image ? (
                  <img
                    src={`https://api.chatwithus.ameyashriwas.com${user.image}`}
                    alt={user.name}
                    style={{ 
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "12px"
                    }}
                  />
                ) : (
                  <FaRegUserCircle className="me-2" style={{ fontSize: "2rem" }} />
                )}
                <span>{user.name}</span>
              </div>
              <Button 
                size="sm" 
                variant="dark" 
                onClick={() => handleAddFriend(user.id)}
              >
                Add
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* ✅ Friends List */}
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
                  // backgroundColor: selectedFriend?.id === contact.id ? "white" : "white",
                  color: "#000",
                  fontWeight: selectedFriend?.id === contact.id ? "bold" : "normal",
                  transition: "0.3s",
                  padding: "12px",
                  borderBottom: "1px solid #ccc"
                }}
                // onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f1f1"}
                // onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedFriend?.id === contact.id ? "#e9e9e9" : "#fff"}
              >
                <div className="d-flex align-items-center">
                  {contact.image ? (
                    <img
                      src={`https://api.chatwithus.ameyashriwas.com${contact.image}`}
                      alt={contact.name}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "12px"
                      }}
                    />
                  ) : (
                    <FaRegUserCircle className="me-2" style={{ fontSize: "2rem" }} />
                  )}
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
