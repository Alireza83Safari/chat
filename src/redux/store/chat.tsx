import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "../../types/room.type";
import { MessageType } from "../../types/message.type";

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

    leaveRoom: (state, action) => {
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

    seenMessage: (state, action) => {
      const { roomId } = action.payload;
      state.rooms[roomId]?.messages?.forEach((message: MessageType) => {
        message.isSeen = true;
      });
    },

    updateRoomUserProfile: (state, action) => {
      const { roomId, updatedUserProfile } = action.payload;
      const updatedUsers = (state.rooms[roomId]?.room?.users || []).map(
        (user) => {
          return user.id === updatedUserProfile.userID
            ? { ...updatedUserProfile }
            : user;
        }
      );

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...state.rooms[roomId],
            room: {
              ...state.rooms[roomId]?.room,
              users: updatedUsers,
            },
          },
        },
      };
    },

    updateRoomAvatar: (state, action) => {
      const { roomId, avatar } = action.payload;

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...state.rooms[roomId],
            room: {
              ...state.rooms[roomId]?.room,
              avatar: `http://localhost:3000/media/uploads/${avatar}`,
            },
          },
        },
      };
    },
  },
});

export const {
  saveRoom,
  updateRoomMessage,
  updateRoomWithDelete,
  deleteRoom,
  leaveRoom,
  updateRoomWithEdit,
  setIsSocketConnected,
  updateRoomUserProfile,
  updateRoomAvatar,
  seenMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
