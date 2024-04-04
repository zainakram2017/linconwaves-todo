import axios from "../axiosConfig";
import {
  SignInResponseType,
  SignUpInputType,
  SignUpResponseType,
} from "../types";

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponseType | null> => {
  try {
    const res = await axios.post(`/auth/login`, {
      email,
      password,
    });
    return {
      token: res.data.access_token,
      user: res.data.user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signUpHandler = async (
  formData: SignUpInputType
): Promise<SignUpResponseType | null> => {
  try {
    const res = await axios.post(`/auth/signup`, formData);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const deleteUserHandler = async (
  id: string
): Promise<SignUpResponseType | null> => {
  try {
    const res = await axios.delete(`/user/${id}`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data.message;
  }
};
