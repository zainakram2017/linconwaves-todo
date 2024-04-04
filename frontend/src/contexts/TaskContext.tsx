import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types";
import { getAllTasks } from "../apiCalls";

type TaskContextProps = {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task) => void;
  fetchData: () => void;
};

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  selectedTask: null,
  setSelectedTask: () => {},
  fetchData: () => {},
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchData = async () => {
    const tasks = await getAllTasks();
    setTasks(tasks || []);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setTasks([]);
    };
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, selectedTask, setSelectedTask, fetchData }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
