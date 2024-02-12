import React, { ChangeEvent, FormEvent, useState } from "react";
import { axiosInstance } from "../../services/axios";
import toast from "react-hot-toast";

interface CreateRoomInfo {
  name: string;
  userIds: string[];
}
interface CreatePublicRoomProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePublicRoom: React.FC<CreatePublicRoomProps> = ({
  setIsModalOpen,
}) => {
  const [createRoomInfo, setCreateRoomInfo] = useState<CreateRoomInfo>({
    name: "",
    userIds: [""],
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

    const response = await axiosInstance.post(
      `/chat/api/v1/room/public`,
      createRoomInfo
    );

    if (response.status === 200) {
      setCreateRoomInfo({
        name: "",
        userIds: [""],
      });
      setIsModalOpen(false);
      toast.success("create public room is success");
    }
  };
  return (
    <form className="text-black" onSubmit={createRoomHandler}>
      <h1 className="text-center text-xl mb-8 font-semibold">
        Create Public Room
      </h1>
      <div>
        <label className="block font-semibold text-[#0275FF]"></label>
        <input
          type="text"
          className="bg-white border border-[#0275FF] outline-none py-2 rounded-md min-w-[18rem] px-2 text-black"
          value={createRoomInfo.name}
          onChange={onChangeHandler}
          name="name"
          placeholder="room name"
        />
      </div>

      <button
        type="submit"
        className="bg-[#0275FF] text-white min-w-[18rem] mt-9 py-2 rounded-md"
      >
        Create Room
      </button>
    </form>
  );
};

export default CreatePublicRoom;
