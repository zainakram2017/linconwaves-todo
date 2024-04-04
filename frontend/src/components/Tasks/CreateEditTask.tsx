import { Formik, Form, Field, ErrorMessage } from "formik";

import { taskValidationSchema } from "../LoginForm/validationSchema";

type CreateEditTaskProps = {
  isEditForm: boolean;
  taskData: {
    uuid: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
  };
};
const CreateEditTask = ({ isEditForm, taskData }: CreateEditTaskProps) => {
  const statusOptions = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "In Progress",
      value: "inProgress",
    },
  ];

  const priorityOptions = [
    {
      label: "High",
      value: "high",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Low",
      value: "low",
    },
  ];

  const initialValues = isEditForm
    ? taskData
    : {
        name: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "pending",
      };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskValidationSchema}
      onSubmit={(values) => {
        console.log(values, "kjhjhj");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <Field
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <Field
                id="description"
                name="description"
                type="text"
                autoComplete="current-description"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              dueDate
            </label>
            <div className="mt-2">
              <Field
                id="dueDate"
                name="dueDate"
                type="date"
                autoComplete="current-dueDate"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Priority
            </label>
            <div className="mt-2">
              <Field
                id="priority"
                name="priority"
                as="select"
                autoComplete="current-priority"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  select option
                </option>
                {priorityOptions?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="priority"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              status
            </label>
            <div className="mt-2">
              <Field
                id="status"
                name="status"
                as="select"
                autoComplete="current-status"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  select option
                </option>
                {statusOptions?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {!isEditForm ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditTask;
