import io from "socket.io-client";
import { BASE_URL } from "./constants";

// Singleton socket instance — persists across route changes
let socket = null;

export const getSocket = () => {
  if (!socket || socket.disconnected) {
    if (location.hostname === "localhost") {
      socket = io(BASE_URL, { withCredentials: true });
    } else {
      socket = io("/", { path: "/api/socket.io", withCredentials: true });
    }
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Keep backward-compat alias
export const createSocketConnection = getSocket;
