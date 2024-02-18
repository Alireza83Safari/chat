import { useState } from "react";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import CreateRoom from "./CreateRoom/CreateRoom";
import CreateFriendModal from "./CreateFriendModal";

const Sidebar = () => {
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [showCreateFriends, setShowCreateFriends] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 md:w-[80px] bg-warmGray-50 text-black md:block hidden z-20">
        <ul className="menu bg-warmGray-50 text-indigo-600 rounded-box mx-0 px-0">
          <li className="flex justify-center py-4">
            <Link
              to="/room?q=all"
              className={`tooltip tooltip-right flex justify-center ${
                q == "all" && `bg-[#DFE7FF]`
              }`}
              data-tip="All Chats"
            >
              <BsChatLeftText className="text-3xl" />
            </Link>
          </li>

          <li className="flex justify-center py-4">
            <Link
              to="/room?q=public"
              className={`tooltip tooltip-right flex justify-center ${
                q == "public" && `bg-[#DFE7FF]`
              }`}
              data-tip="Public Chats"
            >
              <LuMessagesSquare className="text-3xl" />
            </Link>
          </li>

          <li className="flex justify-center py-4">
            <Link
              to="/room?q=private"
              className={`tooltip tooltip-right flex justify-center ${
                q == "private" && `bg-[#DFE7FF]`
              }`}
              data-tip="Private Chats"
            >
              <RiGitRepositoryPrivateFill className="text-3xl" />
            </Link>
          </li>

          <li
            className="flex justify-center py-4"
            onClick={() => setShowCreateChat(true)}
          >
            <div
              className={`tooltip tooltip-right flex justify-center ${
                showCreateChat == true && `bg-[#DFE7FF]`
              }`}
              data-tip="Create Chats"
            >
              <BiSolidMessageRoundedAdd className="text-3xl" />
            </div>
          </li>

          <li
            className="flex justify-center py-4"
            onClick={() => setShowCreateFriends(true)}
          >
            <div
              className={`tooltip tooltip-right flex justify-center ${
                showCreateFriends == true && `bg-[#DFE7FF]`
              }`}
              data-tip="Create Friends"
            >
              <IoPersonAdd className="text-3xl" />
            </div>
          </li>
        </ul>
      </div>

      {showCreateChat && (
        <CreateRoom
          isModalOpen={showCreateChat}
          setIsModalOpen={setShowCreateChat}
        />
      )}
      {showCreateFriends && (
        <CreateFriendModal
          isModalOpen={showCreateFriends}
          setIsModalOpen={setShowCreateFriends}
        />
      )}
    </>
  );
};

export default Sidebar;
