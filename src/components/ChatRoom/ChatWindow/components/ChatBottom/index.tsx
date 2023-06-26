import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { CSSProperties, forwardRef, useRef } from "react";

interface ChatBottomProps {
  className: string;
  style: CSSProperties;
  form: FormInstance;
  onSubmit: (value: string) => Promise<any>;
}

const ChatBottom = ({ className, style, onSubmit, form }: ChatBottomProps) => {
  const inputRef = useRef<any>();

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
                ref={inputRef}
                name="message"
                autoComplete="off"
                placeholder="Nhập tin nhắn..."
                onPressEnter={async () => {
                  await onSubmit(form.getFieldValue("message"));
                  inputRef.current?.focus();
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={async () => {
                  await onSubmit(form.getFieldValue("message"));
                  inputRef.current?.focus();
                }}
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default forwardRef(ChatBottom);
