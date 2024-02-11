import React from "react";
import Modal from "../Modal";
import { FaTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { axiosInstance } from "../../services/axios";
import getRoomId from "../../hooks/getRoomId";
import { UserType } from "../../types/user.type";
import { useNavigate } from "react-router-dom";
interface RoomInfoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  room: any;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  room,
}) => {
  const { roomId } = getRoomId();
  const navigate = useNavigate();

  const deleteChatHandler = async () => {
    const res = await axiosInstance.post(`/chat/api/v1/room/delete/${roomId}`);
    if (res.status === 200) {
      navigate("/room");
      setIsModalOpen(false);
    }
  };
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="w-[20rem] text-black">
        <h1 className="text-2xl font-semibold text-center mb-8">
          {room?.name}
        </h1>

        <div className="border-t">
          {room?.users?.map((user: UserType) => (
            <div className="border-b pb-3" key={user?.id}>
              <p className="my-3">
                <span className="text-sm">firstName:</span>
                <span className="font-semibold">{user.firstName}</span>
              </p>
              <p className="my-3">
                <span className="text-sm">lastName:</span>
                <span className="font-semibold">{user.lastName}</span>
              </p>
              <p className="my-3">
                <span className="text-sm">username:</span>
                <span className="font-semibold">{user.username}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center text-red-600 mt-4 cursor-pointer">
          <MdBlock />
          <p className="ml-1">block</p>
        </div>
        <div
          className="flex items-center text-red-600 mt-4 cursor-pointer"
          onClick={deleteChatHandler}
        >
          <FaTrashAlt />
          <p className="ml-1">Delete</p>
        </div>
      </div>
    </Modal>
  );
};

export default RoomInfoModal;
