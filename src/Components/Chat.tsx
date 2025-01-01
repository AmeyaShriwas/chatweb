import React, { useState, useEffect } from "react";
import ContactsList from "./ContactsList";
import ChatBox from "./ChatBox";

interface ChatProps {
  containerHeight: number;
}

const Chat: React.FC<ChatProps> = ({ containerHeight }) => {
  const [mobileScreen, setMobileScreen] = useState<boolean>(window.innerWidth < 700);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileScreen(window.innerWidth < 700);
      if (window.innerWidth >= 700) {
        setShowChatBox(false); // Reset to default for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContactClick = () => {
    if (mobileScreen) {
      setShowChatBox(true); // Show chat box on mobile
    }
  };

  const handleBackToContacts = () => {
    setShowChatBox(false); // Go back to contacts on mobile
  };

  return (
    <div className="row" style={{ height: `${containerHeight}px`, overflowX: "hidden" }}>
      {!mobileScreen || !showChatBox ? (
        <div className="col-4 h-100" style={{ width: mobileScreen ? "100%" : "400px" }}>
          <ContactsList onContactClick={handleContactClick} />
        </div>
      ) : null}
      {(mobileScreen && showChatBox) || !mobileScreen ? (
        <div className="col h-100" style={{ width: mobileScreen ? "100%" : "auto" }}>
          <ChatBox onBack={mobileScreen ? handleBackToContacts : undefined} />
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
