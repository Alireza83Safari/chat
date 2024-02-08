import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import SendMessage from "./SendMessage";
import { useLocation } from "react-router-dom";
import { ChatContext, ChatContextType } from "../../context/ChatContext";
import { RoomType } from "../../types/room.type";
import { MessageType } from "../../types/message.type";

const ChatRoom: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");
  const { rooms } = useContext(ChatContext) as ChatContextType;
  const [replyId, setReplyId] = useState("");

  const roomsArray = Object.values(rooms)?.find(
    (room: RoomType) => room?.room?.id === roomId
  );

  const messages = roomsArray?.messages;
  const containerRef = React.useRef<HTMLDivElement>() as any;

  const scrollToBottom = () => {
    const lastMessage = containerRef.current?.lastChild as HTMLElement;

    if (lastMessage) {
      lastMessage.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-[#E9E9E9] fixed right-0 bottom-0 top-0 min-h-[20rem] sm:w-[70%] w-[80%] overflow-y-auto ">
      {!!roomId && (
        <>
          <ChatHeader
            userName="alireza"
            onlineStatus="online"
            isPrivate={Boolean(roomsArray?.room.isPrivate)}
          />
          <div
            className="container min-h-screen overflow-auto px-3 "
            ref={containerRef}
          >
            {messages?.map((message: MessageType, index) => (
              <React.Fragment key={index}>
                <Message
                  text={message.content}
                  sender={message.firstName}
                  timestamp={message.createdAt.slice(11, 16)}
                  id={message.id}
                  setReplyId={setReplyId}
                />
              </React.Fragment>
            ))}
          </div>
          <SendMessage replyId={replyId} setReplyId={setReplyId} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
