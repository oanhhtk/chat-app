import React from "react";
import MessageItem from "../MessageItem";

interface MessageListProps {}

const MessageList: React.FC<MessageListProps> = () => {
  return (
    <div
      style={{
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      {[1, 2, 3, 4].map((item) => (
        <MessageItem
          text={item.toString()}
          displayName={item.toString()}
          createdAt={{}}
          photoURL={""}
        />
      ))}
    </div>
  );
};

export default MessageList;
