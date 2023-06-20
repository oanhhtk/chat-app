import ChatBottom from "./components/ChatBottom";
import ChatContent from "./components/ChatContent";
import ChatHeader from "./components/ChatHeader";

interface ChatWindowProps {}

const ChatWindow: React.FC<ChatWindowProps> = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <ChatHeader
        className="fixed"
        style={{
          padding: "8px 16px",
          zIndex: 1,
          top: 0,
          right: 0,
          left: "216px", // width: sidebar + 16px padding chat-content
        }}
      />
      <ChatContent className="h-full" />
      <ChatBottom
        className="fixed"
        style={{
          padding: "16px",
          zIndex: 1,
          right: 0,
          bottom: 0,
          left: "216px", // width: sidebar + 16px padding chat-content
        }}
      />
    </div>
  );
};

export default ChatWindow;
