// chatReducer.ts
import { RoomType } from "../../types/room.type";
import {
  SaveRoomDataAction,
  UpdateRoomMessageAction,
  UpdateRoomMessageWithEditAction,
  UpdateRoomMessageWithDeleteAction,
  deleteRoomAction,
} from "../../types/chat.type";
import {
  saveRoomData,
  updateRoomData,
  updateRoomDataWithEdit,
  updateRoomDataWithDelete,
  deleteRoom,
} from "./ChatAction";

type Action =
  | SaveRoomDataAction
  | UpdateRoomMessageAction
  | UpdateRoomMessageWithEditAction
  | UpdateRoomMessageWithDeleteAction
  | deleteRoomAction;

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
      const updateMessage = action.payload.updatedMessage;

      const updatedMessages = state.rooms[action.payload.roomId]?.messages?.map(
        (msg) => {
          if (msg.id === updateMessage.id) {
            return updateMessage;
          }
          return msg;
        }
      );

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.roomId]: {
            ...state.rooms[action.payload.roomId],
            messages: updatedMessages,
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

    case deleteRoom:
      const filterRooms = { ...state.rooms };
      delete filterRooms[action.payload.roomId];

      return {
        ...state,
        rooms: filterRooms,
      };

    default:
      return state;
  }
};
