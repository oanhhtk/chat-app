import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip, Typography } from "antd";
import React, { CSSProperties, useContext, useState } from "react";
import { AppContext } from "../../../../../context/AppProvider";
import { COLLECTION } from "../../../../../firebase/collections";
import { db } from "../../../../../firebase/config";
import InviteMemberModal from "../../../../Modal/InviteMemberModal";

interface ChatHeaderProps {
  className?: string;
  style: CSSProperties;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  className = "",
  style = {},
}) => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const { selectedRoom, members, selectedRoomId } = useContext(AppContext);

  const addNewMember = async (vals: any) => {
    //update member in current room
    const curentRoomRef = db.collection(COLLECTION.ROOMS).doc(selectedRoomId);
    curentRoomRef.update({
      members: [
        ...(selectedRoom?.members || []),
        ...vals?.map((val: any) => val?.value),
      ],
    });
  };
  if (!selectedRoom) return <></>;

  return (
    <div
      className={className}
      style={{
        height: "100%",
        background: "#fff",
        zIndex: 100,
        ...style,
        flexGrow: 1,
      }}
    >
      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col">
          <Typography.Text
            strong
            style={{
              fontSize: "17px",
            }}
          >
            {selectedRoom?.name}
          </Typography.Text>
          <Typography.Text>{selectedRoom?.descriptions}</Typography.Text>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button type="text" onClick={() => setOpenInviteModal(true)}>
              <UserAddOutlined />
            </Button>
            <Avatar.Group>
              {members?.map((mem) => (
                <Tooltip title={mem.displayName} placement="top">
                  <Avatar src={mem.photoURL}>
                    {mem.photoURL ? "" : mem.displayName?.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </div>
      </div>

      <InviteMemberModal
        title="Thêm thành viên"
        open={openInviteModal}
        onCancel={() => setOpenInviteModal(false)}
        onOK={addNewMember}
        okText={"Thêm"}
        cancelText={"Đóng"}
      />
    </div>
  );
};

export default ChatHeader;
