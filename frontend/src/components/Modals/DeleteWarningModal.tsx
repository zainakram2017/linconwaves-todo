import Modal from "../Modals/Modal";

export type DeleteWarningModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionHandler: () => void;
};
const DeleteWarningModal = ({
  isModalOpen,
  setIsModalOpen,
  actionHandler,
  isLoading,
}: DeleteWarningModalProps) => {
  return (
    <Modal
      title="Attention"
      show={isModalOpen}
      onCloseButtonClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="px-4">
        <p className="text-sm text-gray-500">
          Are you sure you want to <span className="text-red-600">delete</span>{" "}
          this?
        </p>
      </div>
      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          No
        </button>

        {!isLoading ? (
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
            onClick={actionHandler}
          >
            Delete
          </button>
        ) : (
          <span className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-1.5 text-white text-sm">
            Processing...
          </span>
        )}
      </div>
    </Modal>
  );
};

export default DeleteWarningModal;
