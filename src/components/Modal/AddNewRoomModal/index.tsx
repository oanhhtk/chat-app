import { Form, Input, Modal } from "antd";
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
        onOk={handleOnOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
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
        </Form>
      </Modal>
    </>
  );
};

export default AddNewRoomModal;
