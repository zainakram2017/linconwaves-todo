import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";

import {
  editUserValidationSchema,
  validationSchema,
} from "../LoginForm/validationSchema";
import { createUserHandler, updateUserHandler } from "../../apiCalls";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types";

type CreateEditUserProps = {
  isEditForm: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
};
const CreateUser = ({
  isEditForm,
  userData,
  setIsModalOpen,
}: CreateEditUserProps) => {
  const { fetchData } = useUser();

  const options = [
    {
      label: "User",
      value: "user",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];

  const initialValues = isEditForm
    ? userData
    : {
        name: "",
        email: "",
        role: "",
        password: "",
      };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        !isEditForm ? validationSchema : editUserValidationSchema
      }
      onSubmit={async (values) => {
        const res = isEditForm
          ? await updateUserHandler(values, userData._id)
          : await createUserHandler(values);

        if (res?._id) {
          fetchData();
          toast.success("Action successfully performed!");
          setIsModalOpen(false);
          return;
        }
        toast.error("something went wrong! try again");
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
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                disabled={isEditForm}
                autoComplete="current-email"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          {!isEditForm && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role
            </label>
            <div className="mt-2">
              <Field
                id="role"
                name="role"
                as="select"
                autoComplete="current-role"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  select option
                </option>
                {options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="role"
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

export default CreateUser;
