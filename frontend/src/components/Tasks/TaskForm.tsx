import Modal from "../Modals/Modal";
import CreateEditTask from "./CreateEditTask";

type TaskFormProps = {
  isModalOpen: boolean;
  isEditForm: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const TaskForm = ({
  isModalOpen,
  isEditForm,
  setIsModalOpen,
  setIsEditForm,
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
        taskData={{
          uuid: 567890,
          name: "Task1",
          description: "this task is very important",
          dueDate: "2022-10-10",
          priority: "high",
          status: "pending",
        }}
      />
    </Modal>
    </div>

  );
};

export default TaskForm;
