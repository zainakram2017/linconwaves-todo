/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from "../types/TaskTypes";
import axios from "../axiosConfig";

export const getAllTasks = async (): Promise<Task[] | null> => {
  try {
    const res = await axios.get(`/todo`);    
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createTaskHandler = async (
  formData: any
): Promise<Task | null> => {
  try {
    const res = await axios.post(`/todo`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTaskHandler = async (
  formData: any,
  id: string
): Promise<Task | null> => {
  try {
    const res = await axios.put(`/todo/${id}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTaskHandler = async (
  id: string
): Promise<Task | null> => {
  try {
    const res = await axios.delete(`/todo/${id}`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data.message;
  }
};
