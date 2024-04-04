import { Task } from "../../types/TaskTypes";
import Modal from "../Modals/Modal";
import CreateEditTask from "./CreateEditTask";

type TaskFormProps = {
  isModalOpen: boolean;
  isEditForm: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord: Task;
};
const TaskForm = ({
  isModalOpen,
  isEditForm,
  setIsModalOpen,
  setIsEditForm,
  selectedRecord
}: TaskFormProps) => {
  return (
    <div >

    <Modal
      title={!isEditForm ? "Add Task" : "Edit Task"}
      show={isModalOpen}
      onCloseButtonClick={() => {
        setIsModalOpen(false);
        setIsEditForm(false);
      }}
    >
      <CreateEditTask
        isEditForm={isEditForm}
        taskData={selectedRecord}
        setIsModalOpen={setIsModalOpen}
      />
    </Modal>
    </div>

  );
};

export default TaskForm;
