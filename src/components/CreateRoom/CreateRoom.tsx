import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { MdOutlineGroup } from "react-icons/md";
import CreatePublicRoom from "./CreatePublicRoom";
import { axiosInstance } from "../../services/axios";
import { FriendsType } from "../../types/friend.type";
import toast from "react-hot-toast";

interface CreateRoomProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [showCreatePublicRoom, setShowCreatePublicRoom] = useState(false);
  const [freinds, setFriends] = useState([]);
  const getFrends = async () => {
    const response = await axiosInstance.get(`/user/api/v1/friend`);
    if (response.status === 200) {
      setFriends(response?.data?.data);
    }
  };

  const createPrivateRoom = async (userId: string) => {
    const response = await axiosInstance.post(`/chat/api/v1/room/private`, {
      userId,
    });

    if (response.status === 200) {
      setIsModalOpen(false);
      toast.success("create private room is success");
    }
  };

  useEffect(() => {
    getFrends();
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      {showCreatePublicRoom ? (
        <CreatePublicRoom setIsModalOpen={setIsModalOpen} />
      ) : (
        <div className="min-w-[20rem] min-h-[20rem] text-black">
          <h1 className="text-xl font-bold text-center py-1">New Room</h1>
          <div
            className="flex items-center justify-center py-5 hover:text-indigo-500 font-semibold duration-300"
            onClick={() => setShowCreatePublicRoom(true)}
          >
            <MdOutlineGroup className="text-xl" />
            <p>New Public Room</p>
          </div>

          <div className=" overflow-auto">
            {!!freinds?.length ? (
              freinds?.map((friend: FriendsType) => (
                <div
                  key={friend?.id}
                  className="flex items-center py-3 hover:bg-[#E0E7FF] px-4"
                  onClick={() => createPrivateRoom(friend?.id)}
                >
                  <img src={friend?.profile} className="w-10 rounded-full" />
                  <p className="ml-1 font-semibold">{friend?.username}</p>
                </div>
              ))
            ) : (
              <p className="text-center py-5">you havent any friends</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateRoom;
