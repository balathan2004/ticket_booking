import React, { useContext, useState } from "react";
import { UserDataInterface } from "../interfaces";

export type UserDataType = UserDataInterface | false;

export interface UserContextType {
  userCred: UserDataType;
  setUserCred: React.Dispatch<React.SetStateAction<UserDataType>>;
}

export const UserContext = React.createContext<UserContextType>({
  userCred: false,
  setUserCred: () => {},
});

const UserCredHolder = ({ children }: { children: React.ReactNode }) => {
  const [userCred, setUserCred] = useState<UserDataType>(false);

  return (
    <UserContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserCredHolder