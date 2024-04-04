import { User } from "./UserTypes";

export type LogInInputType = {
  email: string;
  password: string;
};

export type SignInResponseType = {
  token: string;
  user: User;
};

export type SignUpResponseType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type SignUpInputType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
