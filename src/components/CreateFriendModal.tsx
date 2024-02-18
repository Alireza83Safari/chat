import React, { useState } from "react";
import Modal from "./Modal";
import { FaUser } from "react-icons/fa";
import { axiosInstance } from "../services/axios";
import toast from "react-hot-toast";

interface CreateFriendModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFriendModal: React.FC<CreateFriendModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [friendId, setFriendId] = useState("");
  const createFriend = async () => {
    if (!!friendId?.length) {
      try {
        const response = await axiosInstance.post(
          `/user/api/v1/friend/make/${friendId}`
        );
        if (response.status === 200) {
          toast.success("create friend successfuly");
        }
      } catch (error) {
        toast.error((error as any)?.response?.data?.message);
      }
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="min-w-[20rem] text-black">
        <h1 className=" static top-0 py-2 text-center font-semibold text-lg">
          New Friend
        </h1>

        <div className="flex items-center my-8 px-4 text-indigo-600">
          <label htmlFor="r-4">
            <FaUser className="text-xl" />
          </label>
          <input
            type="text"
            placeholder="friend id"
            className=" bg-white pl-4 py-2 min-w-full outline-none"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
          />
        </div>
        <button
          className="min-w-full bg-indigo-600 py-2 text-white outline-none"
          onClick={createFriend}
        >
          Add Friend
        </button>
      </div>
    </Modal>
  );
};

export default CreateFriendModal;
