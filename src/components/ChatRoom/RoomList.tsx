import { Collapse, CollapseProps } from "antd";

interface RoomListProps {}

// works when >= 5.6.0, recommended ✅
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const RoomList: React.FC<RoomListProps> = () => {
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Collapse.Panel header="List of rooms" key="1">
        <p>{text}</p>
      </Collapse.Panel>
    </Collapse>
  );
};

export default RoomList;
