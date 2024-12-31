import React from "react";
import ContactsList from "./ContactsList";
import ChatBox from "./ChatBox";

interface ChatProps {
  containerHeight: number;
  mobileWidth: boolean;
  setMobileWidth: (value: boolean) => void;
}

const Chat: React.FC<ChatProps> = (props) => {
  const { containerHeight, mobileWidth, setMobileWidth } = props;

  return (
    <div
      className="row"
      style={{
        height: `${containerHeight}px`,
        overflowX: "hidden",
      }}
    >
      {!mobileWidth && (
        <div
          className="col-3 h-100"
          style={{
            width: "100%",
          }}
        >
          <ContactsList setMobileWidth={setMobileWidth} />
        </div>
      )}
      {mobileWidth && (
        <div
          className="col h-100"
          style={{
            width: "100%",
          }}
        >
          <ChatBox setMobileWidth={setMobileWidth}/>
        </div>
      )}
    </div>
  );
};

export default Chat;
