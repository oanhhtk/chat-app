import {
  AntDesignOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip, Typography } from "antd";
import React, { CSSProperties, useContext, useState } from "react";
import { AppContext } from "../../../../../context/AppProvider";
import InviteMemberModal from "../../../../Modal/InviteMemberModal";

interface ChatHeaderProps {
  className: string;
  style: CSSProperties;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ className, style }) => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const { selectedRoom } = useContext(AppContext);

  const addNewMember = async (vals: any) => {
    console.log("vals :>> ", vals);
  };
  return (
    <div
      className={className}
      style={{
        background: "#fff",
        ...style,
      }}
    >
      <Row justify="space-between" align={"middle"}>
        <Col>
          <Typography.Title level={5}>{selectedRoom?.name}</Typography.Title>
          <p>{selectedRoom?.descriptions}</p>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button onClick={() => setOpenInviteModal(true)}>
              <UserAddOutlined /> Mời
            </Button>
            <Avatar.Group>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </div>
        </Col>
      </Row>

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
