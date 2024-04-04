import { Task } from "../types/TaskType";
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
