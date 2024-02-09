import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ChatContextType, ChatContext } from "../../context/ChatContext";
import CreateRoom from "./CreateRoom";
import { RoomType } from "../../types/room.type";

const RoomsList: React.FC = () => {
  const { rooms } = useContext(ChatContext) as ChatContextType;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");

  const roomsArray = Object.values(rooms);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 bottom-0 min-h-screen sm:w-[30%] w-[20%] overflow-y-auto bg-white">
        <div className="sticky top-0 md:px-4 px-2 text-black">
          <div className="flex justify-between border-b border-gray-200 pb-6 pt-3">
            <div className="flex">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-2 sm:block hidden">
                <p className="font-semi">chatapp</p>
                <p>v.101</p>
              </div>
            </div>
            <button
              className="items-center sm:flex hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2 text-xl" />
            </button>
          </div>
        </div>

        <div className="overflow-auto  text-black">
          {roomsArray?.map((item: RoomType) => (
            <Link
              to={`/room?roomId=${item.room.id}`}
              className={`py-3 flex justify-between px-2 items-center ${
                !!roomId && roomId === String(item.room.id)
                  ? `bg-indigo-100`
                  : ``
              }`}
              key={item.room.id}
            >
              <div className="flex items-center">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  className="lg:w-14 w-10 lg:h-14 h-10 rounded-full"
                />
                <div className=" ml-2 lg:text-base text-sm sm:block hidden">
                  <h2 className="font-semibold text-lg">{item.room.name}</h2>
                  <p>
                    {!!item?.messages?.length &&
                      item?.messages[item.messages.length - 1]?.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <CreateRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </nav>
    </>
  );
};

export default RoomsList;
