import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { RoomType } from "../../types/room.type";
import RoomInfoModal from "./RoomInfoModal";
import { useAppSelector } from "../../redux/store";

interface HeaderProps {
  roomInfos: RoomType | undefined;
}

const RoomHeader: React.FC<HeaderProps> = ({ roomInfos }) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const room = roomInfos?.room;

  return (
    <>
      <div className="flex justify-between items-center py-3 text-black-800 px-3 sticky top-0 z-10 bg-[#F8F9FB] shadow-xl text-black">
        <div
          className="flex items-center"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-12 h-12 rounded-full"
          />

          <div className="ml-2 lg:text-base text-sm">
            <h2 className="font-semibold text-lg">
              {!room?.isPrivate
                ? room?.name
                : room?.users?.find((user) => user.id !== userInfo?.id)
                    ?.firstName}
            </h2>
            <p>{!isSocketConnected ? "conecting..." : ""}</p>
            {/*  <p>{onlineStatus ? "Online" : "Offline"}</p> */}
          </div>
        </div>
        <div className="flex text-xl gap-x-3">
          <FaRegCommentDots />
          <IoAlertCircleOutline />
        </div>
      </div>

      <RoomInfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        room={room}
      />
    </>
  );
};

export default RoomHeader;
