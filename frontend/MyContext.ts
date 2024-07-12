import React, { createContext } from "react";

interface User {
  name: string;
}

interface Trip {
  name: string;
  _id: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const MyContext = createContext<UserContextType | undefined>(undefined);

export default MyContext;
