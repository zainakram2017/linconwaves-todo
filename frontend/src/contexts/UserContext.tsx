import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { getAllUsers } from "../apiCalls";

type UserContextProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  fetchData: () => void;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
  fetchData: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchData = async () => {
    const users = await getAllUsers();
    setUsers(users || []);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser, fetchData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
