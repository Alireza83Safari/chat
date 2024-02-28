import React, { useEffect, useState, useTransition } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateRoom from "../CreateRoom/CreateRoom";
import { RoomType } from "../../../types/room.type";
import getRoomId from "../../../hooks/getRoomId";
import { axiosInstance } from "../../../services/axios";
import ProfileModal from "../ProfileModal";
import { useAppSelector } from "../../../redux/store";
import { sendPublicMessage } from "../../../services/socket";

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
    sendPublicMessage("watch-room", {
      roomId: roomId,
      //  content: newMessage,
    });
    /*    try {
      await axiosInstance.post(`/chat/api/v1/room/join/${roomId}`);
    } catch (error) {
      toast.error("You have already joined");
    } */
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

  const [filterRooms, settFilterRooms] = useState([]) as any;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const handleFilterRooms = () => {
    if (q === "all") {
      settFilterRooms(roomsArray);
    }
    if (q === "public") {
      const filter = roomsArray.filter(
        (room) => room.room?.isPrivate === false
      );
      settFilterRooms(filter);
    }
    if (q === "private") {
      const filter = roomsArray.filter((room) => room.room?.isPrivate === true);
      settFilterRooms(filter);
    }
  };

  useEffect(() => {
    handleFilterRooms();
  }, [q]);

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const mapState = filterRooms?.length ? filterRooms : roomsArray;
  //className={`fixed top-0 left-[80px] bottom-0 min-h-screen lg:w-[240px] md:w-[200px] w-full overflow-y-auto bg-white ${

  return (
    <nav
      className={`fixed top-0 left-[80px] bottom-0 min-h-screen lg:w-[300px] md:w-[260px] w-full overflow-y-auto bg-white ${
        roomId ? `md:block hidden` : `block`
      }`}
    >
      <div className="sticky top-0 text-black min-w-full">
        {/* start profile */}
        <div className="flex justify-between border-b border-gray-200 pb-6 pt-3 bg-white md:px-4 px-2">
          <button
            className="flex items-center"
            onClick={() => setIsShowProfile(true)}
          >
            {userInfo?.profile ? (
              <img
                src={String(userInfo?.profile)}
                className="min-w-12 h-12 rounded-full"
              />
            ) : (
              <div className="min-w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                <p className="text-2xl text-white">
                  {userInfo?.username?.slice(0, 1)}
                </p>
              </div>
            )}

            <p className="font-semibold text-xl ml-3">{userInfo?.username}</p>
          </button>
        </div>
        {/* finish profile */}

        {/* start search room */}
        <div className="relative my-3 lg:px-4 x-1 min-w-full bg-white pb-2">
          <input
            type="text"
            className="py-2 pl-3 bg-gray-100 border lg:w-[270px] md:w-[255px] sm:w-[88vw] w-[80vw] outline-none rounded-xl z-30 text-sm"
            value={searchQuery}
            onChange={handleChange}
            placeholder="search"
          />
        </div>
        {isPending ? (
          <p className="mx-4">loading ....</p>
        ) : (
          searchResult?.map((room: searchResultType) => (
            <div
              key={room?.id}
              className="sm:mx-4 mx-1 py-3 font-semibold border-b hover:bg-[#DFE7FF]"
              onClick={() => handleRoomJoin(room?.id)}
            >
              <p dir="auto">{room?.name}</p>
            </div>
          ))
        )}
        {/* finish search room */}
      </div>

      {/* start show room list */}
      {!searchQuery?.length ? (
        <div className="overflow-auto text-black">
          {mapState?.map((item: RoomType) => (
            <Link
              to={`/room?roomId=${item?.room?.id}`}
              className={`sm:py-3 py-2 flex sm:justify-between pl-3 sm:px-2 items-center border-b ${
                !!roomId && roomId === String(item?.room?.id)
                  ? `bg-indigo-100`
                  : ``
              }`}
              key={item?.room?.id}
            >
              <div className="flex items-center">
                {item?.room?.isPrivate &&
                item?.room?.users?.find((user) => user?.id !== userInfo?.id)
                  ?.profile?.length ? (
                  <img
                    src={
                      item?.room?.users?.find(
                        (user) => user?.id !== userInfo?.id
                      )?.profile
                    }
                    className="min-w-12 h-12 rounded-full border"
                  />
                ) : <div className="min-w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                    <p className="text-2xl text-white">
                      {item?.room?.name.slice(0, 1)}
                    </p>
                  </div> ? (
                  item?.room?.avatar?.length ? (
                    <img
                      src={item?.room?.avatar || ""}
                      className="min-w-12 h-12 rounded-full"
                      alt="Room Avatar"
                    />
                  ) : (
                    <div className="min-w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                      <p className="text-2xl text-white">
                        {item?.room?.name.slice(0, 1)}
                      </p>
                    </div>
                  )
                ) : (
                  ""
                )}

                <div
                  className="ml-2 lg:text-base text-sm min-w-full"
                  dir="auto"
                >
                  <div className="flex justify-between min-w-full">
                    <h2 className="text-lg relative" dir="auto">
                      {item?.room?.isPrivate
                        ? item?.room?.users?.find(
                            (user) => user?.id !== userInfo?.id
                          )?.username
                        : item?.room?.name || "Default Name"}
                    </h2>
                    <p className="absolute right-3">
                      {!!item?.messages?.length &&
                        item?.messages[
                          item.messages.length - 1
                        ]?.createdAt?.slice(11, 16)}
                    </p>
                  </div>

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
      {/* finish show room list */}

      <CreateRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ProfileModal
        isShowProfile={isShowProfile}
        setIsShowProfile={setIsShowProfile}
      />
    </nav>
  );
};

export default RoomsList;
