// chatReducer.ts
import { RoomType } from "../../types/room.type";
import {
  SaveRoomDataAction,
  UpdateRoomMessageAction,
  UpdateRoomMessageWithEditAction,
  UpdateRoomMessageWithDeleteAction,
} from "../../types/chat.type";
import {
  saveRoomData,
  updateRoomData,
  updateRoomDataWithEdit,
  updateRoomDataWithDelete,
} from "./ChatAction";

type Action =
  | SaveRoomDataAction
  | UpdateRoomMessageAction
  | UpdateRoomMessageWithEditAction
  | UpdateRoomMessageWithDeleteAction;

type State = {
  rooms: Record<string, RoomType>;
};

export const chatReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case saveRoomData:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.room.id]: {
            room: action.payload.room,
            messages: action.payload.messages,
          },
        },
      };

    case updateRoomData:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.roomId]: {
            ...state.rooms[action.payload.roomId],
            messages: [
              ...state.rooms[action.payload.roomId]?.messages,
              action.payload.message,
            ],
          },
        },
      };

    case updateRoomDataWithEdit:
      const filterMessages = state.rooms[
        action.payload.roomId
      ]?.messages?.filter((msg) => msg.id !== action.payload.updatedMessage.id);

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.roomId]: {
            ...state.rooms[action.payload.roomId],
            messages: [...filterMessages, action.payload.updatedMessage],
          },
        },
      };

    case updateRoomDataWithDelete:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.roomId]: {
            ...state.rooms[action.payload.roomId],
            messages: state.rooms[action.payload.roomId]?.messages.filter(
              (msg) => msg.id !== action.payload.updatedMessage.id
            ),
          },
        },
      };

    default:
      return state;
  }
};
