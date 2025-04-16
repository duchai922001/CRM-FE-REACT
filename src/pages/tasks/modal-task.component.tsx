import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
const { Option } = Select;
interface Props {
  title: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const users = [
  { id: 1, name: "Nguyễn Văn A" },
  { id: 2, name: "Trần Thị B" },
  { id: 3, name: "Lê Văn C" },
];
const ModalTask = ({ title, isModalOpen, handleOk, handleCancel }: Props) => {
  const [newTitle, setNewTitle] = useState(title);
  const onFinish = (values) => {};
  return (
    <Modal
      title={
        <>
          <input
            className="title-header-modal"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Row gutter={[12, 12]}>
        <Col span={18}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Miêu tả" name="description">
              <Input.TextArea placeholder={`Miêu tả ${title}`} />
            </Form.Item>
            <Form.Item label="Assign" name="assigneeId">
              <Select placeholder="Chọn người được giao">
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}>
          <h3>Hành động</h3>
          <button className="btn btn-remove">
            <MdDeleteForever />
            <span>Xóa công việc</span>
          </button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalTask;
