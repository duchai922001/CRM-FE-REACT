import { Col, Form, Input, Modal, Row, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { TasksService } from "../../services/tasks.service";
import {
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../../features/tasks/tasks-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { CiCreditCard1 } from "react-icons/ci";
import { UserService } from "../../services/user.service";
import { localStorageUtil } from "../../helpers/localstorage.helper";
const { Option } = Select;
interface Props {
  id: number;
  columnKey: string;
  title: string;
  isModalOpen: boolean;
  handleClose: () => void;
}

interface IUser {
  id: number;
  name: string;
}

interface ITask {
  name: string;
  status: string;
  description: string;
  assigneeId: number | null;
}
const ModalTask = ({
  id,
  columnKey,
  title,
  isModalOpen,
  handleClose,
}: Props) => {
  const [task, setTask] = useState<ITask>({
    name: "",
    status: "",
    description: "",
    assigneeId: null,
  });
    const user = localStorageUtil.get("user");
  
  const [dataUser, setDataUser] = useState<IUser[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const dataUpdate = {
        ...values,
        name: task.name,
        status:
          columnKey === "progress"
            ? "in_progress"
            : columnKey === "finished"
            ? "done"
            : columnKey,
      };
      await dispatch(updateTask({ id, data: dataUpdate }));
      handleClose();
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error(error || "Lỗi hệ thống");
    }
  };
  const handleDeleteTask = () => {
    Modal.confirm({
      title: "Xác nhận xóa công việc",
      content: "Bạn có chắc chắn muốn xóa công việc này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await dispatch(deleteTask(id));
          toast.success("Xóa thành công");
          handleClose();
        } catch (error: any) {
          toast.error(error.message ?? "Lỗi hệ thống");
        }
      },
    });
  };
  const asyncDataTaskById = async () => {
    try {
      const response = await TasksService.getTaskById(id);
      setTask({
        name: response.name,
        status: response.status,
        description: response.description,
        assigneeId: response.assigneeId,
      });
      form.setFieldsValue({
        description: response.description,
        assigneeId: response.assigneeId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const asyncDataUser = async () => {
    try {
      const response = await UserService.getAll();
      const mapData = response.map((user: any) => ({
        id: user.id,
        name: user.name,
      }));
      setDataUser(mapData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    asyncDataUser();
    asyncDataTaskById();
  }, []);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CiCreditCard1 style={{ fontSize: "24px" }} />
          <input
            className="title-header-modal"
            value={task.name}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
      }
      okText="Lưu"
      cancelText="Hủy bỏ"
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={handleClose}
      width={1000}
    >
      <Row gutter={[12, 12]}>
        <Col span={18}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="Miêu tả" name="description">
              <Input.TextArea placeholder={`Miêu tả ${title}`} />
            </Form.Item>
            <Form.Item label="Assign" name="assigneeId">
              <Select placeholder="Chọn người được giao" disabled={user.role === "Staff"}>
                {dataUser.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: 12 }}>
            <h3>Thông tin</h3>
            <Row gutter={[12,12]} justify={"space-between"}>
              <Col span={12}>Trạng thái</Col>
              <Col span={12}>
                <Tag
                  style={{ fontWeight: "bold" }}
                  bordered={true}
                  color={
                    task.status === "todo"
                      ? "processing"
                      : task.status === "in_progress"
                      ? "warning"
                      : "success"
                  }
                >
                  {task.status}
                </Tag>
              </Col>
              <Col span={12}>Ngày tạo</Col>
              <Col span={12}>
                2025-04-16
              </Col>
            </Row>
          </div>
          <div>
            <h3>Hành động</h3>
            <button className="btn btn-remove" onClick={handleDeleteTask}>
              <MdDeleteForever />
              <span>Xóa công việc</span>
            </button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalTask;
