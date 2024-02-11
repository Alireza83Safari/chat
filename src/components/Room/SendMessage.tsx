import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ChatContext, ChatContextType } from "../../context/chat/ChatContext";
import { useLocation } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { sendMessage, socket } from "../../services/socket";
import { CiEdit } from "react-icons/ci";

interface SendMessageProps {
  replyId: string;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessageId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessage: React.Dispatch<React.SetStateAction<string>>;
  editMessageId: string;
  editMessage: string;
}

const SendMessage: React.FC<SendMessageProps> = ({
  replyId,
  setReplyId,
  setEditMessageId,
  setEditMessage,
  editMessageId,
  editMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");

  useEffect(() => {
    if (roomId) {
      setNewMessage("");
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (!!editMessage) {
      handleEditMessage();
    } else if (!!newMessage) {
      socket.addEventListener("open", (e) => console.log(e));
      if (socket.readyState === WebSocket.OPEN) {
        sendMessage("new-message", {
          roomId: roomId,
          content: newMessage,
          ReplyTo: !!replyId?.length ? replyId : null,
        });
        setReplyId("");
        setNewMessage("");
      } else {
        console.error("WebSocket is not open");
      }
    }
  };

  const { rooms } = useContext(ChatContext) as ChatContextType;

  const roomsArray = Object.values(rooms)?.find(
    (room) => room?.room?.id === roomId
  );
  const messages = roomsArray?.messages;
  const replyMessage = messages?.find((message) => message?.id === replyId);

  const handleEditMessage = () => {
    console.log(editMessageId);
    console.log(newMessage);

    sendMessage("edit-message", {
      roomId: roomId,
      id: editMessageId,
      content: newMessage,
    });
    setEditMessageId("");
    setEditMessage("");
  };

  useEffect(() => {
    setNewMessage(editMessage);
  }, [editMessage]);
  return (
    <div
      className="px-4 pb-3 sticky bottom-0 bg-[#E9E9E9] "
      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
    >
      {replyId && (
        <div className="flex text-black-800 bg-white mb-2 rounded-md p-2 relative cursor-pointer">
          <FaReply className="text-2xl text-[#0275FF]" />
          <FaX
            className=" absolute right-3 top-3 text-[#ff0000]"
            onClick={() => setReplyId("")}
          />
          <div className="ml-4">
            <p className="mr-4 text-[#0275FF] font-semibold">
              {replyMessage?.firstName} {replyMessage?.lastName}
            </p>
            <p>{replyMessage?.content}</p>
          </div>
        </div>
      )}

      {editMessageId && (
        <div className="flex text-black-800 bg-white mb-2 rounded-md p-2 relative cursor-pointer">
          <CiEdit className="text-2xl text-orange-500" />
          <FaX
            className=" absolute right-3 top-3 text-[#ff0000]"
            onClick={() => {
              setEditMessageId("");
              setEditMessage("");
            }}
          />
          <div className="ml-4">
            <p>{editMessage}</p>
          </div>
        </div>
      )}

      <div className="flex relative">
        <input
          type="text"
          className="flex-grow px-3 py-3 rounded-md focus:outline-none bg-white pr-12 text-black"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          dir="auto"
        />
        <button
          className="focus:outline-none absolute right-2 top-1"
          onClick={handleSendMessage}
        >
          <IoMdSend className="text-4xl text-[#5670EB]" />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
