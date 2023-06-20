import { Button, Col, Form, Input, Row } from "antd";
import React, { CSSProperties } from "react";

interface ChatBottomProps {
  className: string;
  style: CSSProperties;
}

const ChatBottom: React.FC<ChatBottomProps> = ({ className, style }) => {
  return (
    <div
      className={className}
      style={{
        background: "#fff",
        ...style,
      }}
    >
      <Row>
        <Col span={24}>
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Form.Item
              style={{
                width: "100%",
              }}
            >
              <Input autoComplete="off" placeholder="Nhập tin nhắn" />
            </Form.Item>
            <Form.Item>
              <Button>Gửi</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ChatBottom;
