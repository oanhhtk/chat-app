import {
  AntDesignOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip, Typography } from "antd";
import React, { CSSProperties } from "react";

interface ChatHeaderProps {
  className: string;
  style: CSSProperties;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ className, style }) => {
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
          <Typography.Title level={5}>Room 1</Typography.Title>
          <p>day la room 1</p>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button>
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
    </div>
  );
};

export default ChatHeader;
