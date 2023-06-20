import React from "react";
import MessageList from "../MessageList";

interface ChatContentProps {
  className?: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{
        padding: "88px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <MessageList />
    </div>
  );
};

export default ChatContent;
