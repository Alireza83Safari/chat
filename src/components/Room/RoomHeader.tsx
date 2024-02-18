import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaBellSlash,
  FaRegCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { MdReportGmailerrorred } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosInstance } from "../../services/axios";
import getRoomId from "../../hooks/getRoomId";
import RoomInfoModal from "./RoomInfoModal";
import { RoomType } from "../../types/room.type";
import { useAppSelector } from "../../redux/store";

interface HeaderProps {
  roomInfos: RoomType | undefined;
}

const RoomHeader: React.FC<HeaderProps> = ({ roomInfos }) => {
  const { roomId } = getRoomId();
  const [showMenu, setShowMenu] = useState(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const room = roomInfos?.room;
  const [sound, setSound] = useState(localStorage.getItem("sound") || "on");

  useEffect(() => {
    if (!sound) {
      localStorage.setItem("sound", "on");
    }
  }, []);

  const toggleMuteStateAndLocalStorage = () => {
    const newSound = sound === "on" ? "off" : "on";
    setSound(newSound);
    localStorage.setItem("sound", newSound);
    toast.success(`Sound set to ${newSound}`);
  };

  const leaveRoom = async (id: string | null) => {
    try {
      await axiosInstance.post(`/chat/api/v1/room/left/${id}`);
      toast.success("You have left the room successfully!");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-3 text-black-800 px-3 sticky top-0 z-10 bg-[#F8F9FB] shadow-xl text-black">
        <div
          className="flex items-center"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {room?.isPrivate &&
          room?.users?.find((user) => user?.id !== userInfo?.id)?.profile
            ?.length ? (
            <img
              src={room?.users?.find((user) => user?.id !== userInfo?.id)?.profile}
              className="w-12 h-12 rounded-full"
              alt="Room Avatar"
            />
          ) : room?.avatar?.length ? (
            <img
              src={room?.avatar}
              className="w-12 h-12 rounded-full"
              alt="Room Avatar"
            />
          ) : (
            <div className="w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
              <p className="text-2xl text-white">{room?.name.slice(0, 1)}</p>
            </div>
          )}
          <div className="ml-2 lg:text-base text-sm">
            <h2 className="font-semibold text-lg">
              {!room?.isPrivate
                ? room?.name
                : room?.users?.find((user) => user.id !== userInfo?.id)
                    ?.firstName}
            </h2>
            <p>{!isSocketConnected ? "Connecting..." : ""}</p>
          </div>
        </div>
        <div className="flex text-xl gap-x-3 relative">
          <FaRegCommentDots />
          <IoAlertCircleOutline />
          <HiDotsVertical onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="absolute top-7 right-1 shadow-2xl bg-white rounded-md text-base w-28">
              <div
                className="flex items-center text-blue-600 hover:bg-[#DFE7FF] px-3 py-2"
                onClick={() => toggleMuteStateAndLocalStorage()}
              >
                {sound === "off" ? (
                  <>
                    <FaBellSlash className="mr-2 text-lg" />
                    <p>Muted</p>
                  </>
                ) : (
                  <>
                    <FaBell className="mr-2 text-lg" />
                    <p>On</p>
                  </>
                )}
              </div>
              <div className="flex items-center text-red-600 hover:bg-[#DFE7FF] px-3 py-2">
                <MdReportGmailerrorred className="mr-2 text-lg" />
                <p>Report</p>
              </div>
              <div
                className="flex items-center text-red-600 hover:bg-[#DFE7FF] px-3 py-2"
                onClick={() => leaveRoom(roomId)}
              >
                <FaSignOutAlt className="mr-2 text-lg" />
                <p>Leave</p>
              </div>
            </div>
          )}
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
