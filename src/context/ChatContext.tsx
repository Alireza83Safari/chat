import { createContext, useEffect, useState } from "react";
import { RoomType } from "../types/room.type";
import { MessageType } from "../types/message.type";
import { token } from "../services/api";

export type ChatContextProviderType = {
  children: React.ReactNode;
};

export type ChatContextType = {
  rooms: Record<string, RoomType>;
  messages: MessageType[];
  updateRoomMessage: any;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProviderType) => {
  const [rooms, setRooms] = useState<Record<string, RoomType>>({});
  const [messages, setMessages] = useState([]);

  const socket = new WebSocket(
    `ws://localhost:3000/chat/ws/public?authorization=${token}`
  );

  const saveRoomData = (data: RoomType) => {
    setRooms((prevrooms: any) => ({
      ...prevrooms,
      [data.room.id]: {
        room: data.room,
        messages: data.messages,
      },
    }));
  };

  function updateRoomMessage(roomId: string, message: MessageType) {
    setRooms((prevRooms: any) => ({
      ...prevRooms,
      [roomId]: {
        ...prevRooms[roomId],
        messages: [...prevRooms[roomId].messages, message],
      },
    }));
  }
  console.log(rooms);

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
      console.log(content);

      switch (res.type) {
        case "room-detail":
          saveRoomData(content.data);
          setMessages(content.data.messages);
          break;
        case "new-message":
          break;
        default:
          console.warn("Unknown message type:", res.type);
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ messages, rooms, updateRoomMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
