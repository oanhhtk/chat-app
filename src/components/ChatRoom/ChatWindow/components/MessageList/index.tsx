import React from "react";
import MessageItem from "../MessageItem";

interface MessageListProps {
  data: any[];
}

const MessageList: React.FC<MessageListProps> = ({ data = [] }) => {
  console.log("data :>> ", data);
  return (
    <div style={{}}>
      {data.map((item) => (
        <MessageItem
          key={item?.id}
          text={item?.text}
          displayName={item?.displayName}
          createdAt={item?.createdAt?.seconds}
          photoURL={item?.photoURL}
          userId={item?.uid}
        />
      ))}
    </div>
  );
};

export default MessageList;
