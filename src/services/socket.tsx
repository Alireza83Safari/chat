import { ReadCookie } from "../hooks/ReactCookie";

const token = ReadCookie("Authorization");
export const socket = new WebSocket(
  `ws://localhost:3000/chat/ws/public?authorization=${token}`
);
