import { User } from "../../types";
import Modal from "../Modals/Modal";
import CreateEditUser from "./CreateEditUser";

type UserFormProps = {
  isModalOpen: boolean;
  isEditForm: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord: User
};
const UserForm = ({
  isModalOpen,
  isEditForm,
  setIsModalOpen,
  setIsEditForm,
  selectedRecord
}: UserFormProps) => {
  return (
    <Modal
      title={!isEditForm ? "Add User" : "Edit User"}
      show={isModalOpen}
      onCloseButtonClick={() => {
        setIsModalOpen(false);
        setIsEditForm(false);
      }}
    >
      <CreateEditUser
        isEditForm={isEditForm}
        userData={selectedRecord}
        setIsModalOpen={setIsModalOpen}
      />
    </Modal>
  );
};

export default UserForm;
