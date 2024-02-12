import React, { useState } from "react";
import Modal from "../Modal";
import { MdOutlineGroup } from "react-icons/md";
import CreatePublicRoom from "./CreatePublicRoom";

interface CreateRoomProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [showCreatePublicRoom, setShowCreatePublicRoom] = useState(false);
  const users = [
    {
      username: "test1",
      image:
        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      username: "test2",
      image:
        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      username: "test3",
      image:
        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
  ];

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      {showCreatePublicRoom ? (
        <CreatePublicRoom setIsModalOpen={setIsModalOpen} />
      ) : (
        <div className="min-w-[20rem] text-black">
          <h1 className="text-xl font-bold text-center">New Room</h1>
          <div
            className="flex items-center py-5 hover:text-indigo-500 font-semibold duration-300"
            onClick={() => setShowCreatePublicRoom(true)}
          >
            <MdOutlineGroup />
            <p>New Public Room</p>
          </div>

          <div className="">
            {users?.map((user) => (
              <div key={user.username} className="flex py-2 border-b hover:bg-[#E0E7FF]">
                <img src={user.image} className="w-10 rounded-full" />
                <p className="ml-1">{user.username}</p>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateRoom;
