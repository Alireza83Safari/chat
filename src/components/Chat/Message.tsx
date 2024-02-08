import React, { useContext, useState } from "react";
import { FaRegClone, FaReply, FaTrashAlt } from "react-icons/fa";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { MessageType } from "../../types/message.type";

interface MessageProps {
  message: MessageType;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
}

const Message: React.FC<MessageProps> = ({ message, setReplyId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="relative">
      <div
        className={`chat text-black relative ${
          userInfo?.userId === message?.userId ? "chat-start" : "chat-end"
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
        <div className="chat-header mt-2">
          username
          <time className="text-xs opacity-50 ml-2">
            {message?.createdAt?.slice(11, 16)}
          </time>
        </div>
        <div className="relative flex">
          <div
            className="chat-bubble bg-white text-black"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {message?.content}
          </div>
          <div
            className={`z-10 absolute -right-36 ${
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

              <li className="flex px-4 py-2 hover:text-[#0275FF] duration-300">
                <FaRegClone className="mr-2 mt-1" />
                Copy
              </li>
              <li className="flex px-4 py-2 hover:text-[#0275FF] duration-300">
                <FaTrashAlt className="mr-2 mt-1" />
                Delete
              </li>
            </ul>
          </div>
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default Message;
