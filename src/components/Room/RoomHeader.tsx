import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";

interface HeaderProps {
  userName: string;
  onlineStatus: string;
  isPrivate: boolean;
}

const RoomHeader: React.FC<HeaderProps> = ({
  userName,
  onlineStatus,
  isPrivate,
}) => {
  return (
    <div className="flex justify-between items-center py-3 text-black-800 px-3 sticky top-0 z-10 bg-[#F8F9FB] shadow-xl">
      <div className="flex items-center">
        {!isPrivate ? (
          <>
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              className="w-12 h-12 rounded-full"
            />

            <div className="ml-2 lg:text-base text-sm">
              <h2 className="font-semibold text-lg">{userName}</h2>
              <p>{onlineStatus ? "Online" : "Offline"}</p>
            </div>
          </>
        ) : (
          <h2 className="text-lg font-semibold">Private Chat</h2>
        )}
      </div>
      <div className="flex text-xl gap-x-3">
        <FaRegCommentDots />
        <IoAlertCircleOutline />
      </div>
    </div>
  );
};

export default RoomHeader;
