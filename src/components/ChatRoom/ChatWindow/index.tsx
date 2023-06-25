import { Alert, Form, message } from "antd";
import ChatBottom from "./components/ChatBottom";
import ChatContent from "./components/ChatContent";
import ChatHeader from "./components/ChatHeader";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { addDocument } from "../../../firebase/service";
import { COLLECTION } from "../../../firebase/collections";
import { AuthContext } from "../../../context/AuthProvider";

interface ChatWindowProps {}

const ChatWindow: React.FC<ChatWindowProps> = () => {
  const { selectedRoom } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [form] = Form.useForm();
  if (!selectedRoom) return <Alert message="Chọn phòng" />;

  const handleOnSubmit = async (text: string) => {
    try {
      await addDocument(COLLECTION.MESSAGES, {
        text,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoom?.id,
      });
      form.resetFields();
    } catch (error) {
      message.error("Không thể gửi được tin nhắn, Vui lòng thử lại");
    }
  };
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <ChatContent className="h-full relative" />
      <ChatBottom
        className="sticky"
        form={form}
        onSubmit={handleOnSubmit}
        style={{
          padding: "20px 0",
        }}
      />
    </div>
  );
};

export default ChatWindow;
