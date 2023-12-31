import React, { useContext, useRef } from "react";
import { AppContext } from "../../../../../context/AppProvider";
import useFirestore from "../../../../../hooks/useFirestore";
import MessageList from "../MessageList";

interface ChatContentProps {
  className?: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ className = "" }) => {
  const { selectedRoom } = useContext(AppContext);

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom?.id,
    }),
    [selectedRoom?.id]
  );

  const messages = useFirestore("messages", condition);

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
        paddingBottom: "80px",
      }}
    >
      <MessageList data={messages} />
    </div>
  );
};

export default ChatContent;
