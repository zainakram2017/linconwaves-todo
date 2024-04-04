import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["user", "admin"], "Invalid role"),
});

export const editUserValidationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["user", "admin"], "Invalid role"),
});

export const taskValidationSchema = Yup.object().shape({
  taskName: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date().required("Due date is required"),
  priorityLevel: Yup.string()
    .required("Priority is required")
    .oneOf(["high", "medium", "low"], "Invalid priority"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["not_started", "in_progress", "completed"], "Invalid status"),
});

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

export const logInvalidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
