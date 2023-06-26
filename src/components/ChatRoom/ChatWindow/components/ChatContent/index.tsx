import React, { useContext, useRef } from "react";
import { AppContext } from "../../../../../context/AppProvider";
import useFirestore from "../../../../../hooks/useFirestore";
import MessageList from "../MessageList";

interface ChatContentProps {
  className?: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ className = "" }) => {
  const { selectedRoom } = useContext(AppContext);
  const messageListRef = useRef<any>(null);

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom?.id,
    }),
    [selectedRoom?.id]
  );

  const messages = useFirestore("messages", condition);

  // console.log("data :>> ", messages);

  // useEffect(() => {
  //   // scroll to bottom after message changed
  //   if (messageListRef?.current) {
  //     setTimeout(() => {
  //       console.log("1000");
  //       messageListRef.current.scrollTop =
  //         messageListRef.current.scrollHeight + 50;
  //     });
  //   }
  // }, [messages]);
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflowY: "scroll",
        overflowX: "hidden",
        zIndex: 10,
      }}
      ref={messageListRef}
    >
      <MessageList data={messages} />
    </div>
  );
};

export default ChatContent;
