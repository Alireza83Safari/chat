import React, { useEffect, useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CreateRoom from "../CreateRoom/CreateRoom";
import { RoomType } from "../../types/room.type";
import { FaSearch } from "react-icons/fa";
import getRoomId from "../../hooks/getRoomId";
import { axiosInstance } from "../../services/axios";
import ProfileModal from "../ProfileModal";
import { useAppSelector } from "../../redux/store";
import toast from "react-hot-toast";

interface searchResultType {
  id: string;
  name: string;
}

const RoomsList: React.FC = () => {
  const rooms = useAppSelector((state) => state.chat.rooms);

  const { roomId } = getRoomId();
  const roomsArray = Object.values(rooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isPending, startTransition] = useTransition();

  const findRooms = async () => {
    if (searchQuery?.length) {
      const res = await axiosInstance.get(
        `/chat/api/v1/room?searchTerm=${searchQuery}`
      );
      setSearchResult(res?.data?.data?.data);
    } else {
      setSearchResult([]);
    }
  };

  const handleRoomJoin = async (roomId: string) => {
    try {
      await axiosInstance.post(`/chat/api/v1/room/join/${roomId}`);
    } catch (error) {
      toast.error("You have already joined");
    }
  };

  useEffect(() => {
    findRooms();
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <nav className="fixed top-0 left-0 bottom-0 min-h-screen sm:w-[30%] w-[20%] overflow-y-auto bg-white">
      <div className="sticky top-0 text-black">
        <div className="flex justify-between border-b border-gray-200 pb-6 pt-3 bg-white md:px-4 px-2">
          <button className="flex items-center" onClick={() => setIsShowProfile(true)}>
            {userInfo?.profile ? (
              <img
                src={String(userInfo?.profile)}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                <p className="text-2xl text-white">
                  {userInfo?.username?.slice(0, 1)}
                </p>
              </div>
            )}

            <p className="font-semibold text-xl ml-3 sm:block hidden">
              {userInfo?.username}
            </p>
          </button>
          <button
            className="items-center sm:flex hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2 text-xl" />
          </button>
        </div>
        <div className="relative my-3 mx-4">
          <input
            type="text"
            className="bg-white py-2 pl-8 border min-w-full outline-none rounded-lg"
            value={searchQuery}
            onChange={handleChange}
          />
          <FaSearch className="text-xl absolute left-2 text-indigo-600 top-3" />
        </div>
        {isPending ? (
          <p className="mx-4">loading ....</p>
        ) : (
          searchResult?.map((room: searchResultType) => (
            <div
              key={room?.id}
              className="mx-4 py-3 font-semibold border-b hover:bg-[#DFE7FF]"
              onClick={() => handleRoomJoin(room?.id)}
            >
              <p dir="auto">{room?.name}</p>
            </div>
          ))
        )}
      </div>
      {!searchQuery?.length ? (
        <div className="overflow-auto  text-black">
          {roomsArray?.map((item: RoomType) => (
            <Link
              to={`/room?roomId=${item?.room?.id}`}
              className={`py-3 flex justify-between px-2 items-center ${
                !!roomId && roomId === String(item?.room?.id)
                  ? `bg-indigo-100`
                  : ``
              }`}
              key={item?.room?.id}
            >
              <div className="flex items-center">
                {item?.room?.avatar?.length ? (
                  <img
                    src={item?.room?.avatar}
                    className="lg:w-14 w-10 lg:h-14 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                    <p className="text-2xl text-white">
                      {item?.room?.name.slice(0, 1)}
                    </p>
                  </div>
                )}

                <div
                  className=" ml-2 lg:text-base text-sm sm:block hidden"
                  dir="auto"
                >
                  <h2 className="font-semibold text-lg" dir="auto">
                    {item?.room?.name}
                  </h2>
                  <p>
                    {!!item?.messages?.length &&
                      item?.messages[item.messages.length - 1]?.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}

      <CreateRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ProfileModal
        isShowProfile={isShowProfile}
        setIsShowProfile={setIsShowProfile}
      />
    </nav>
  );
};

export default RoomsList;
