// context/user-context.tsx
"use client";

import { createContext, useContext } from "react";
import { User } from "@/types/user";

type UserContextType = {
  user: User | null;
};

const UserContext = createContext<UserContextType>({ user: null });

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
