import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClone, FaReply, FaTrashAlt } from "react-icons/fa";

interface MessageProps {
  text: string;
  sender: string;
  timestamp: string;
  id: string;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
}

const Message: React.FC<MessageProps> = ({
  text,
  sender,
  timestamp,
  id,
  setReplyId,
}) => {
  const isUser = sender === "user";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-start gap-2.5 my-5" key={id}>
      <img
        className="w-8 h-8 rounded-full"
        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        alt="Jese image"
      />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-e-xl text-white rounded-es-xl ${
          isUser ? `bg-[#A2CDFF]` : `bg-[#0275FF]`
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">
            Bonnie Green
          </span>
          <span className="text-sm font-normal">{timestamp}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">{text}</p>
        <span className="text-sm font-normal">Delivered</span>
      </div>

      <button
        className="self-center items-center p-2 text-sm"
        type="button"
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical className="text-2xl text-black-800" />
      </button>

      <div
        className={`z-10 ${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li
            className="flex px-4 py-2 hover:text-[#0275FF] duration-300"
            onClick={() => {
              setReplyId(id);
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
  );
};

export default Message;
