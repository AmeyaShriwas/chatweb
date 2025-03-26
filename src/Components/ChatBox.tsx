import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Navbar, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { IoImagesOutline, IoSend } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

// ✅ Define Message interface
interface Message {
  senderId: string | null | undefined;
  receiverId: string | null | undefined;
  message: string;
  timestamp: string;
}

// ✅ Props interface
interface ChatBoxProps {
  onBack?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onBack }) => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  
  // ✅ Redux state for sender and receiver IDs
  const senderId = useSelector((state: RootState) => state.auth.id);
  const receiverId = useSelector((state: RootState) => state.chat.selectedFriend?._id);
  const data = useSelector((state: RootState) => state.chat.selectedFriend);

  const [socket, setSocket] = useState<any>(null);

  // ✅ Connect socket only when a receiver is selected
  useEffect(() => {
    if (receiverId && senderId) {
      console.log("🚀 Connecting socket...");
      const newSocket = io("https://api.chatwithus.ameyashriwas.com", {
        transports: ["websocket", "polling"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);

        // ✅ Join the room only when user is selected
        console.log(`🔗 Joining room with sender: ${senderId}, receiver: ${receiverId}`);
        newSocket.emit("joinRoom", { senderId, receiverId });

        newSocket.on("loadMessages", (messages: Message[]) => {
          console.log("📥 Loaded messages:", messages);
          setChatHistory(messages);
        });

        newSocket.on("newMessage", (msg: Message) => {
          console.log("📩 New message received:", msg);
          setChatHistory((prev) => [...prev, msg]);
        });
      });

      newSocket.on("connect_error", (error: Error) => {
        console.error("❌ Socket connection error:", error);
      });

      newSocket.on("disconnect", (reason: string) => {
        console.warn("⚠️ Socket disconnected:", reason);
      });

      // ✅ Cleanup on unmount or user change
      return () => {
        console.log("🛑 Disconnecting socket...");
        newSocket.off("loadMessages");
        newSocket.off("newMessage");
        newSocket.disconnect();
      };
    }
  }, [receiverId, senderId]);  // Only run when receiver or sender changes

  // ✅ Send message function
  const sendMessage = async () => {
    console.log("📤 Attempting to send message:", message);

    if (message.trim() && socket) {
      const newMessage: Message = {
        senderId,
        receiverId,
        message,
        timestamp: new Date().toISOString(),
      };

      console.log("📤 Emitting message:", newMessage);

      // Emit message to socket
      socket.emit("sendMessage", newMessage);

      // Optimistically update chat history
      setChatHistory((prev) => [...prev, newMessage]);

      // Clear input field
      setMessage("");

      // Save message to backend
      try {
        console.log("💾 Saving message to backend...");
        await axios.post(
          "https://api.chatwithus.ameyashriwas.com/messages/send",
          newMessage
        );
        console.log("✅ Message saved successfully.");
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    } else {
      console.warn("⚠️ Empty message or no socket connection. Not sending.");
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* ✅ Navbar */}
      <Navbar className="container-fluid border p-3 mt-2 d-flex justify-content-between align-items-center">
        {onBack && (
          <FaArrowLeft
            className="me-3"
            size={20}
            onClick={onBack}
            style={{ cursor: "pointer" }}
          />
        )}
        <p className="m-0 text-center flex-grow-1">
          {data?.name || "Chat"}
        </p>
        <CiSettings
          className="ms-3"
          size={20}
          onClick={onBack}
          style={{ cursor: "pointer" }}
        />
      </Navbar>

      {/* ✅ Chat Messages */}
      <div
        className="container-fluid bg-light flex-grow-1"
        style={{ overflowY: "auto", padding: "15px" }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`d-flex ${
              msg.senderId === senderId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            style={{ marginBottom: "10px" }}
          >
            <div
              style={{
                backgroundColor: msg.senderId === senderId ? "#007bff" : "#f1f1f1",
                color: msg.senderId === senderId ? "#fff" : "#000",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ margin: 0 }}>{msg.message}</p>
              <div
                style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}
              >
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Message Input */}
      <div className="container d-flex align-items-center p-3">
        <IoImagesOutline size={30} />
        <Form.Control
          className="mx-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <IoSend
          size={30}
          onClick={sendMessage}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
