import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ChatContext, ChatContextType } from "../../context/ChatContext";
import { useLocation } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { socket } from "../../services/socket";

interface SendMessageProps {
  replyId: string;
  setReplyId: React.Dispatch<React.SetStateAction<string>>;
}

const SendMessage: React.FC<SendMessageProps> = ({ replyId, setReplyId }) => {
  const { updateRoomMessage } = useContext(ChatContext) as ChatContextType;
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");

  useEffect(() => {
    if (roomId) {
      setNewMessage("");
    }
  }, [roomId]);

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    socket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
    });

    socket.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      const content = JSON.parse(res.content);
      switch (res.type) {
        case "new-message":
          updateRoomMessage(content?.roomId, content?.data);
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage !== "") {
      socket.addEventListener("open", (e) => console.log(e));
      if (socket.readyState === WebSocket.OPEN) {
        let newMessageRequest = {
          type: "new-message",
          unix: Date.now(),
          content: JSON.stringify({
            roomId: roomId,
            content: newMessage,
            ReplyTo: !!replyId?.length ? replyId : null,
          }),
        };

        socket.send(JSON.stringify(newMessageRequest));
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

      <div className="flex relative">
        <input
          type="text"
          className="flex-grow px-3 py-3 rounded-md focus:outline-none bg-white"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
