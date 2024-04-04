import { useTask } from "../../contexts/TaskContext";
import PageHeader from "../PageHeader/PageHeader";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import TaskForm from "./TaskForm";
import DeleteWarningModal from "../Modals/DeleteWarningModal";
import { useState } from "react";
import { Task } from "../../types/TaskTypes";
import { deleteTaskHandler } from "../../apiCalls";

const Tasks = () => {
  const { tasks, fetchData } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Task>({} as Task);
  const header = [
    { label: "Name", className: "" },
    { label: "Description", className: "hidden  sm:block" },
    { label: "Due Date", className: "" },
    { label: "Priority", className: "" },
    { label: "Status", className: "" },
  ];

  const deleteTask = async () => {
    setIsLoading(true);

    try {
      await deleteTaskHandler(selectedRecord._id);
      fetchData();
      toast.success("task deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <TaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsEditForm={setIsEditForm}
        isEditForm={isEditForm}
        selectedRecord={selectedRecord}
      />
      <DeleteWarningModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        actionHandler={() => deleteTask()}
        isLoading={isLoading}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Task"
          description="List of all Task"
          actionHandler={() => {
            setIsModalOpen(true);
          }}
          buttonText="Add Task"
        />
        <div className="-mx-4 mt-8 sm:-mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {header.map((header, index) => (
                  <th
                    key={index + 1}
                    scope="col"
                    className={`${header.className} py-3.5 text-start text-sm font-semibold text-gray-900 pl-3`}
                  >
                    {header.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-end text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tasks?.map((item) => (
                <tr key={item?._id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p className="pl-2 sm:pl-0">{item.taskName}</p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden">Description</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {item.description}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {item.description}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {item.dueDate.slice(0, 10)}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {item.priorityLevel}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {item.status}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className="flex items-center justify-end space-x-3 mr-2">
                      <FaRegEdit
                        className="text-indigo-600 hover:text-indigo-900"
                        size={18}
                        onClick={() => {
                          setIsEditForm(true);
                          setIsModalOpen(true);
                          setSelectedRecord(item);
                        }}
                      />
                      <RiDeleteBinLine
                        className="text-red-600 hover:text-red-500"
                        size={18}
                        onClick={() => {
                          setIsDeleteModalOpen(true)
                          setSelectedRecord(item);
                        }}
                        
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
