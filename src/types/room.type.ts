import { MessageType } from "./message.type";

export type UserType = {
  firstName: string;
  id: string;
  lastName: string;
  username: string;
};

export type RoomType = {
  messages: MessageType[];
  room: {
    id: string;
    isPrivate: boolean;
    name: string;
    users: UserType[];
  };
};
