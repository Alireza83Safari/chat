import React, { useState } from "react";
import { FaEdit, FaRegClone, FaReply, FaTrashAlt } from "react-icons/fa";
import { MessageType } from "../../types/message.type";
import toast from "react-hot-toast";
import { sendMessage } from "../../services/socket";
import { CiEdit } from "react-icons/ci";
import getRoomId from "../../hooks/getRoomId";
import { useAppSelector } from "../../redux/store";

interface MessageProps {
  message: MessageType;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessageId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Message: React.FC<MessageProps> = ({
  message,
  setReplyId,
  setEditMessageId,
  setEditMessage,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const { roomId } = getRoomId();

  const handleClipbord = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("copy message");
    setIsDropdownOpen(false);
  };

  const deleteMessage = (id: string) => {
    sendMessage("delete-message", {
      roomId: roomId,
      id: id,
    });

    setIsDropdownOpen(false);
  };

  const editMessageHandler = (id: string, content: string) => {
    setEditMessage(content);
    setEditMessageId(id);
  };

  const isUser = userInfo?.id === message?.userId;

  return (
    <div className="relative">
      <div
        className={`chat text-black relative ${
          isUser ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header mt-2 text-xs flex">
          <p>
            {message?.firstName}
            {message.lastName}
          </p>
          <time className="text-xs opacity-50 ml-1">
            {message?.createdAt?.slice(11, 16)}
          </time>
        </div>

        <div className="relative flex">
          <div
            className={`chat-bubble min-w-full ${
              isDropdownOpen && " bg-lime-600 duration-300"
            } ${isUser ? "bg-indigo-500 text-white" : "bg-white text-black"}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onDoubleClick={() => setReplyId(message?.id)}
          >
            {message?.replyToContent && (
              <p
                className={` text-sm border-l-4 ${
                  isUser
                    ? ` bg-blue-400 border-blue-300`
                    : `bg-gray-100  border-blue-700`
                }`}
              >
                <span className="ml-1">{message?.replyToContent}</span>
              </p>
            )}
            <p className="" dir="auto">
              {message?.content}
            </p>
            {message?.isEdited && (
              <CiEdit className="text-xs text-orange-500" />
            )}
          </div>

          {/* messgae menu */}
          <div
            className={`z-10 absolute ${
              isUser ? "-left-[10rem]" : "-right-[10rem]"
            } ${
              isDropdownOpen ? "" : "hidden"
            } bg-gradient-to-r from-gray-100 to-stone-100 rounde-lg shadow w-40`}
          >
            <ul
              className="py-2 text-sm text-black cursor-pointer"
              aria-labelledby="dropdownMenuIconButton"
            >
              <li
                className="flex px-4 py-2 hover:text-[#0275FF] duration-300"
                onClick={() => {
                  setReplyId(message?.id);
                  setIsDropdownOpen(false);
                }}
              >
                <FaReply className="mr-2 mt-1" />
                Reply
              </li>

              <li
                className="flex px-4 py-2 hover:text-[#0275FF] duration-300"
                onClick={() => {
                  editMessageHandler(message?.id, message?.content);
                  setIsDropdownOpen(false);
                }}
              >
                <FaEdit className="mr-2 mt-1" />
                Edit
              </li>

              <li
                className="flex px-4 py-2 hover:text-[#0275FF] duration-300"
                onClick={() => handleClipbord(message.content)}
              >
                <FaRegClone className="mr-2 mt-1" />
                Copy
              </li>
              {isUser && (
                <li
                  className="flex px-4 py-2 hover:text-[#0275FF] duration-300"
                  onClick={() => deleteMessage(message.id)}
                >
                  <FaTrashAlt className="mr-2 mt-1" />
                  Delete
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default Message;
