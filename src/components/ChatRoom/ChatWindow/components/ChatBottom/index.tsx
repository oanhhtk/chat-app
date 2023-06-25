import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import React, { CSSProperties } from "react";

interface ChatBottomProps {
  className: string;
  style: CSSProperties;
  form: FormInstance;
  onSubmit: (value: string) => Promise<any>;
}

const ChatBottom: React.FC<ChatBottomProps> = ({
  className,
  style,
  onSubmit,
  form,
}) => {
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
            form={form}
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
              name="message"
            >
              <Input
                name="message"
                autoComplete="off"
                placeholder="Nhập tin nhắn..."
                onPressEnter={() => onSubmit(form.getFieldValue("message"))}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={() => onSubmit(form.getFieldValue("message"))}>
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ChatBottom;
