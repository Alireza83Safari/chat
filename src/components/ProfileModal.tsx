import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { axiosInstance } from "../services/axios";
import { useAppSelector } from "../redux/store";

const initialState = {
  firstName: "",
  id: "",
  lastName: "",
  mobile: "",
  roleId: "",
  roleName: "",
  username: "",
};

interface ProfileModalProps {
  isShowProfile: boolean;
  setIsShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isShowProfile,
  setIsShowProfile,
}) => {
  const [userInfos, setUserInfos] = useState(initialState);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [selectedImage, setSelectedImage] = useState() as any;

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    setUserInfos({ ...userInfos, [id]: value });
  };

  const handleSaveProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("fileUrl", selectedImage);

      const res = await axiosInstance.post(
        `/media/api/v1/attachment/upload/profile/${userInfo?.id}`,
        formData
      );

      if (res.status === 200) {
        toast.success("Your profile picture has been successfully uploaded!");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const saveUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/user/api/v1/profile`, userInfos);

      if (res.status === 200) {
        toast.success(
          "Your profile information has been successfully updated!"
        );
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      handleSaveProfileImage();
    }
  }, [selectedImage]);

  useEffect(() => {
    if (userInfo) {
      setUserInfos({
        firstName: userInfo.firstName || "",
        id: userInfo.id || "",
        lastName: userInfo.lastName || "",
        mobile: userInfo.mobile || "",
        roleId: userInfo.roleId || "",
        roleName: userInfo.roleName || "",
        username: userInfo.username || "",
      });
    }
  }, [userInfo]);

  return (
    <Modal isOpen={isShowProfile} onClose={() => setIsShowProfile(false)}>
      <form className="text-black sm:min-w-[24rem]">
        <div className="flex justify-center">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </label>
        </div>
        <div className="my-7">
          <label htmlFor="firstName" className="mr-3">
            firstName:
          </label>
          <input
            type="text"
            id="firstName"
            className="bg-white outline-none py-1"
            value={userInfos?.firstName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="my-7">
          <label htmlFor="lastName" className="mr-3">
            lastName:
          </label>
          <input
            type="text"
            id="lastName"
            className="bg-white outline-none py-1"
            value={userInfos?.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="my-7">
          <label htmlFor="mobile" className="mr-3">
            mobile:
          </label>
          <input
            type="text"
            id="mobile"
            className="bg-white outline-none py-1"
            value={userInfos?.mobile}
            onChange={onChangeHandler}
          />
        </div>
        <div className="my-7">
          <label htmlFor="username" className="mr-3">
            username:
          </label>
          <input
            type="text"
            id="username"
            className="bg-white outline-none py-1"
            value={userInfos?.username}
            onChange={onChangeHandler}
          />
        </div>

        <button
          className=" bg-purple text-white min-w-full py-1 rounded-lg"
          onClick={saveUserProfile}
        >
          Save Profile
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
