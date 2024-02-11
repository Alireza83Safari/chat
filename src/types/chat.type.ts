import { RoomType } from "./room.type";
import { MessageType } from "../types/message.type"; 


export type SaveRoomDataAction = { type: "SAVE_ROOM_DATA"; payload: RoomType };
export type UpdateRoomMessageAction = { type: "UPDATE_ROOM_MESSAGE"; payload: { roomId: string; message: MessageType } };
export type UpdateRoomMessageWithEditAction = { type: "UPDATE_ROOM_MESSAGE_WITH_EDIT"; payload: { roomId: string; updatedMessage: MessageType } };
export type UpdateRoomMessageWithDeleteAction = { type: "UPDATE_ROOM_MESSAGE_WITH_DELETE"; payload: { roomId: string; updatedMessage: MessageType } };
export type deleteRoomAction = { type: "DELETE_ROOM"; payload: { roomId: string } };
