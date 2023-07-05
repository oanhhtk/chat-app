import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface AddNewRoomModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onOK: (value: any) => Promise<any>;
  okText: string;
  cancelText: string;
}

const AddNewRoomModal: React.FC<AddNewRoomModalProps> = ({
  open,
  onCancel,
  onOK,
  okText,
  cancelText,
  title,
}) => {
  const [form] = Form.useForm();
  const handleOnOk = async () => {
    await form.validateFields();
    const formVals = form.getFieldsValue();
    onOK(formVals);
  };
  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={handleOnOk}
        >
          <Form.Item
            name="name"
            label="Tên phòng"
            rules={[{ required: true, message: "Tên phòng thì bắt buộc" }]}
          >
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item name="descriptions" label="Mô tả">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              htmlType="button"
              onClick={onCancel}
              style={{ margin: "8px" }}
            >
              {cancelText}
            </Button>
            <Button type="primary" htmlType="submit">
              {okText}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewRoomModal;
