import { Form, Input, Modal } from "antd";
import React from "react";

interface InviteMemberModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onOK: (value: any) => Promise<any>;
  okText: string;
  cancelText: string;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
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
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="name"
            label="Tên thành viên"
            rules={[{ required: true, message: "Tên thành viên thì bắt buộc" }]}
          >
            <Input placeholder="Nhập tên thành viên" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InviteMemberModal;
