import React, { useEffect, useRef } from "react";
import MessageItem from "../MessageItem";

interface MessageListProps {
  data: any[];
}

const MessageList: React.FC<MessageListProps> = ({ data = [] }) => {
  const itemsRef = useRef<any>([]);
  useEffect(() => {
    setTimeout(() => {
      itemsRef.current[data.length - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 100);
  }, [data]);

  return (
    <div>
      {data.map((item, i) => (
        <div ref={(el: any) => (itemsRef.current[i] = el)}>
          <MessageItem
            key={item?.id}
            text={item?.text}
            displayName={item?.displayName}
            createdAt={item?.createdAt?.seconds}
            photoURL={item?.photoURL}
            userId={item?.uid}
            lastEl={i === data.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageList;
