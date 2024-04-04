/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../axiosConfig";
import { User } from "../types";
export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const res = await axios.get(`/user`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUserHandler = async (
  formData: any
): Promise<User | null> => {
  try {
    const res = await axios.post(`/user`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserHandler = async (
  formData: any,
  id: string
): Promise<User | null> => {
  try {
    const res = await axios.put(`/user/${id}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
