import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "../Modal";
import { api, token } from "../../services/api";

interface CreateRoomInfo {
  name: string;
  userIds: string;
}

interface CreateRoomProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [createRoomInfo, setCreateRoomInfo] = useState<CreateRoomInfo>({
    name: "",
    userIds: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateRoomInfo((prevCreateRoomInfo) => ({
      ...prevCreateRoomInfo,
      [name]: value,
    }));
  };

  const createRoomHandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${api}chat/api/v1/room?authorization=${token}`,
      {
        method: "POST",
        body: JSON.stringify(createRoomInfo),
      }
    );

    if (response.status === 200) {
      // Handle success
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <form className="mt-7" onSubmit={createRoomHandler}>
        <div>
          <label className="block font-semibold text-[#0275FF]">
            Room Name
          </label>
          <input
            type="text"
            className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[18rem] px-2"
            value={createRoomInfo.name}
            onChange={onChangeHandler}
            name="name"
          />
        </div>

        <div className="mt-7">
          <label className="block mt-4 font-semibold text-[#0275FF]">
            User IDs
          </label>
          <input
            type="text"
            className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[18rem] px-2"
            value={createRoomInfo.userIds}
            onChange={onChangeHandler}
            name="userIds"
          />
        </div>

        <button
          type="submit"
          className="bg-[#0275FF] text-white min-w-[18rem] mt-9 py-2 rounded-md"
        >
          Create Room
        </button>
      </form>
    </Modal>
  );
};

export default CreateRoom;
