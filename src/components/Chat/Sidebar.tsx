import { useState } from "react";
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
      <div className="fixed left-0 top-0 bottom-0 w-[80px] z-20 bg-slate-100">
        <ul className="text-indigo-60 text-w rounded-box mx-0 px-0">
{/*           <li className="flex justify-center border-b py-4">
            <img src="/svg/burger.svg" />
          </li> */}
          <li
            className={`flex justify-center border-b py-4 group relative ${
              q == "all" && "bg-[#DFE7FF]"
            }`}
          >
            <Link to="/room?q=all" className="flex justify-center">
              <img src="/svg/message.svg" />
              <p className="group-hover:flex hidden absolute -right-14 rounded-lg bg-slate-600 text-white text-sm px-2 py-1">
                All Chats
              </p>
            </Link>
          </li>

          <li
            className={`flex justify-center border-b py-4 group relative ${
              q == "public" && "bg-[#DFE7FF]"
            }`}
          >
            <Link to="/room?q=public" className="flex justify-center">
              <img src="/svg/messages.svg" />
              <p className="group-hover:flex hidden absolute -right-20 rounded-lg bg-slate-600 text-white text-sm px-2 py-1">
                Public Chats
              </p>
            </Link>
          </li>

          <li
            className={`flex justify-center border-b py-4 group relative ${
              q == "private" && "bg-[#DFE7FF]"
            }`}
          >
            <Link to="/room?q=private" className="flex justify-center">
              <img src="/svg/private.svg" />
              <p className="group-hover:flex hidden absolute -right-20 rounded-lg bg-slate-600 text-white text-sm px-2 py-1">
                Private Chats
              </p>
            </Link>
          </li>

          <li
            className="flex justify-center border-b py-4 group relative"
            onClick={() => setShowCreateChat(true)}
          >
            <div className="flex justify-center">
              <img src="/svg/add.svg" />
              <p className="group-hover:flex hidden absolute -right-20 rounded-lg bg-slate-600 text-white text-sm px-2 py-1">
                Create Chats
              </p>
            </div>
          </li>

          <li
            className="flex justify-center border-b py-4 group relative"
            onClick={() => setShowCreateFriends(true)}
          >
            <div className="flex justify-center">
              <img src="/svg/add-user.svg" />
              <p className="group-hover:flex hidden absolute -right-20 rounded-lg bg-slate-600 text-white text-sm px-2 py-1">
                Create Friends
              </p>
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
