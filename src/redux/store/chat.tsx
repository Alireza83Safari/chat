import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "../../types/room.type";

type State = {
  rooms: Record<string, RoomType>;
  isSocketConnected: boolean;
};

const chatSlice = createSlice({
  name: "chat",
  initialState: { rooms: {}, isSocketConnected: false } as State,
  reducers: {
    updateRoomMessage: (state, action) => {
      const { roomId, message } = action.payload;
      state.rooms[roomId] = {
        ...state.rooms[roomId],
        messages: [...state.rooms[roomId]?.messages, message],
      };
    },
    saveRoom: (state, action) => {
      state.rooms = {
        ...state.rooms,
        [action.payload.room.room.id]: {
          room: action.payload.room.room,
          messages: action.payload.room.messages,
        },
      };
    },

    updateRoomWithEdit: (state, action) => {
      const updateMessage = action.payload.updatedMessage;
      const updatedMessages = state.rooms[action.payload.roomId]?.messages?.map(
        (msg) => (msg?.id === updateMessage?.id ? updateMessage : msg)
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
    },

    updateRoomWithDelete: (state, action) => {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload?.roomId]: {
            ...state.rooms[action.payload?.roomId],
            messages: state.rooms[action.payload?.roomId]?.messages.filter(
              (msg) => msg.id !== action.payload.updatedMessage?.id
            ),
          },
        },
      };
    },

    deleteRoom: (state, action) => {
      const filterRooms = { ...state.rooms };
      delete filterRooms[action.payload.roomId];

      return {
        ...state,
        rooms: filterRooms,
      };
    },

    setIsSocketConnected: (state, action) => {
      state.isSocketConnected = action.payload;
    },
  },
});

export const {
  saveRoom,
  updateRoomMessage,
  updateRoomWithDelete,
  deleteRoom,
  updateRoomWithEdit,
  setIsSocketConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
