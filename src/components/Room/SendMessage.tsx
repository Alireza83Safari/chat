import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaReply } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { sendPrivateMessage, sendPublicMessage } from "../../services/socket";
import { CiEdit } from "react-icons/ci";
import getRoomId from "../../hooks/getRoomId";
import { useAppSelector } from "../../redux/store";

interface SendMessageProps {
  replyId: string;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessageId: React.Dispatch<React.SetStateAction<string>>;
  setEditMessage: React.Dispatch<React.SetStateAction<string>>;
  editMessageId: string;
  editMessage: string;
  isPrivate: boolean | undefined;
}

const SendMessage: React.FC<SendMessageProps> = ({
  replyId,
  setReplyId,
  setEditMessageId,
  setEditMessage,
  editMessageId,
  editMessage,
  isPrivate,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const { roomId } = getRoomId();

  useEffect(() => {
    if (roomId) {
      setNewMessage("");
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (!!editMessage) {
      handleEditMessage();
    } else if (!!newMessage) {
      isPrivate
        ? sendPrivateMessage
        : sendPublicMessage("new-message", {
            roomId: roomId,
            content: newMessage,
            ReplyTo: !!replyId?.length ? replyId : null,
          });

      setReplyId("");
      setNewMessage("");
    }
  };

  const rooms = useAppSelector((state) => state.chat.rooms);

  const roomsArray = Object.values(rooms)?.find(
    (room) => room?.room?.id === roomId
  );
  const messages = roomsArray?.messages;
  const replyMessage = messages?.find((message) => message?.id === replyId);

  const handleEditMessage = () => {
    sendPublicMessage("edit-message", {
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
      className="sm:px-4 px-1 pb-3 sticky bottom-0 bg-[#E9E9E9] "
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
          className="flex-grow min-w-full px-3 py-3 rounded-md focus:outline-none bg-white pr-12 text-black"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          dir="auto"
        />
        <button
          className="focus:outline-none absolute sm:right-2 right-0 top-1"
          onClick={handleSendMessage}
        >
          <IoMdSend className="text-4xl text-[#5670EB]" />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
