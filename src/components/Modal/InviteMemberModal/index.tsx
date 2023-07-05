import { Avatar, Button, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { db } from "../../../firebase/config";
import { COLLECTION } from "../../../firebase/collections";

interface InviteMemberModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onOK: (value: any) => Promise<any>;
  okText: string;
  cancelText: string;
}

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}: any) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions: any) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return setOptions([]);
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt: any) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  open,
  onCancel,
  onOK,
  okText,
  cancelText,
  title,
}) => {
  //

  const [form] = Form.useForm();
  const [value, setValue] = useState([]);

  const { selectedRoom } = useContext(AppContext);

  const handleOnOk = async () => {
    await form.validateFields();
    const formVals = form.getFieldsValue();
    await onOK(formVals?.search_user);
  };

  async function fetchUserList(search: any, curMembers: any) {
    return db
      .collection(COLLECTION.USERS)
      .where("keywords", "array-contains", search)
      .limit(20)
      .get()
      .then((snapshot) => {
        return snapshot.docs
          .map((doc) => ({
            label: doc.data()?.displayName,
            value: doc.data()?.uid,
            photoURL: doc.data()?.photoURL,
          }))
          .filter((opt) => !curMembers.includes(opt.value));
      });
  }
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
          layout="vertical"
          autoComplete="off"
          onFinish={handleOnOk}
        >
          <Form.Item
            name="search_user"
            label="Tên thành viên"
            rules={[{ required: true, message: "Tên thành viên thì bắt buộc" }]}
          >
            <DebounceSelect
              mode="multiple"
              name="search_user"
              label="Tên các thành viên"
              value={value}
              placeholder="Nhập tên thành viên"
              fetchOptions={fetchUserList}
              onChange={(newValue: any) => setValue(newValue)}
              style={{ width: "100%" }}
              curMembers={selectedRoom?.members}
            />
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

export default InviteMemberModal;
