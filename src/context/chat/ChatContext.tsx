// ChatContextProvider.tsx
import React, { createContext, useEffect, useReducer } from "react";
import { chatReducer } from "./ChatReducer";
import { RoomType } from "../../types/room.type";
import {
  saveRoomData,
  updateRoomData,
  updateRoomDataWithEdit,
  updateRoomDataWithDelete,
} from "./ChatAction";
import {
  SaveRoomDataAction,
  UpdateRoomMessageAction,
  UpdateRoomMessageWithEditAction,
  UpdateRoomMessageWithDeleteAction,
} from "../../types/chat.type";
import { socket } from "../../services/socket";
import toast from "react-hot-toast";

type ChatContextProviderType = {
  children: React.ReactNode;
};

export type ChatContextType = {
  rooms: Record<string, RoomType>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProviderType) => {
  const [state, dispatch] = useReducer(chatReducer, { rooms: {} });

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    socket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
    });

    socket.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      const content = JSON.parse(res.content);

      switch (res.type) {
        case "room-detail":
          dispatch({
            type: saveRoomData,
            payload: content.data,
          } as SaveRoomDataAction);
          break;

        case "new-message":
          dispatch({
            type: updateRoomData,
            payload: { roomId: content?.roomId, message: content?.data },
          } as UpdateRoomMessageAction);
          toast.success("New message received!");
          break;

        case "edit-message":
          dispatch({
            type: updateRoomDataWithEdit,
            payload: { roomId: content?.roomId, updatedMessage: content?.data },
          } as UpdateRoomMessageWithEditAction);
          toast.success("Message edited successfully!");
          break;

        case "delete-message":
          dispatch({
            type: updateRoomDataWithDelete,
            payload: { roomId: content?.roomId, updatedMessage: content?.data },
          } as UpdateRoomMessageWithDeleteAction);
          toast.success("Message deleted successfully!");
          break;

        default:
          console.warn("Unknown message type:", res.type);
      }
    });
  }, []);

  return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
};
