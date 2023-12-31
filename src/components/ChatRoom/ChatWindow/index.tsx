import { Alert, Form, message } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { COLLECTION } from "../../../firebase/collections";
import { addDocument } from "../../../firebase/service";
import ChatBottom from "./components/ChatBottom";
import ChatContent from "./components/ChatContent";

interface ChatWindowProps {}

const ChatWindow: React.FC<ChatWindowProps> = () => {
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const { selectedRoom } = useContext(AppContext);

  const [form] = Form.useForm();
  if (!selectedRoom) return <Alert message="Bạn chưa chọn phòng 🫢" />;

  const handleOnSubmit = async (text: string) => {
    if (!text) return;
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
        className="fixed"
        form={form}
        onSubmit={handleOnSubmit}
        style={{
          padding: "20px",
          bottom: 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
        }}
      />
    </div>
  );
};

export default ChatWindow;
