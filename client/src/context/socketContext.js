import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const socket = io("http://localhost:3001");

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
