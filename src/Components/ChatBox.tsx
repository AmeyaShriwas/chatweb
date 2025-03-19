import React from "react";
import { Navbar, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { IoImagesOutline, IoSend } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";


interface ChatBoxProps {
  onBack?: () => void; // Back button callback
}

const ChatBox: React.FC<ChatBoxProps> = ({ onBack }) => {

  const data = useSelector((state: RootState)=> state.chat.selectedFriend)
  return (
    <div className="d-flex flex-column h-100">
     <Navbar className="container-fluid border p-3 mt-2 d-flex justify-content-between align-items-center">
  {onBack && (
    <FaArrowLeft
      className="me-3"
      size={20}
      onClick={onBack}
      style={{ cursor: "pointer" }}
    />
  )}
  <p className="m-0 text-center flex-grow-1">{data?.name || ""}</p>
  <CiSettings
    className="ms-3"
    size={20}
    onClick={onBack}
    style={{ cursor: "pointer" }}
  />
</Navbar>

      <div className="container-fluid bg-light flex-grow-1" style={{ overflowY: "auto" }}>
        {/* Chat messages */}
      </div>
      <div className="container d-flex align-items-center p-3">
        <IoImagesOutline size={30} />
        <Form.Control
          className="mx-2"
          type="text"
          placeholder="Enter your message"
        />
        <IoSend size={30} />
      </div>
    </div>
  );
};

export default ChatBox;
