import React, { useState } from "react";
import MyContext from "./MyContext";

interface User {
  name: string;
  token: string;
}

interface Trip {
  name: string;
  _id: string;
}

interface UserContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip>>;
}

interface ProviderProps {
  children: React.ReactNode;
}

const MyProvider: React.FC<ProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "",
    token: "",
  });
  const [ trip, setTrip ] = useState({
    name: "",
    _id: "",
  });

  const state: UserContext = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    trip,
    setTrip,
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
