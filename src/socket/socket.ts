// src/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: number) => {
  if (!socket) {
    socket = io("http://localhost:8080", {
      query: { userId },
      transports: ["websocket"],
    });
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};
