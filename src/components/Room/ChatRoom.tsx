import React, { useContext, useEffect, useState } from "react";
import Message from "../Message/Message";
import RoomHeader from "./RoomHeader";
import SendMessage from "./SendMessage";
import { ChatContext, ChatContextType } from "../../context/chat/ChatContext";
import { RoomType } from "../../types/room.type";
import { MessageType } from "../../types/message.type";
import getRoomId from "../../hooks/getRoomId";

const ChatRoom: React.FC = () => {
  const { roomId } = getRoomId();
  const { rooms } = useContext(ChatContext) as ChatContextType;
  const [replyId, setReplyId] = useState("");
  const [editMessageId, setEditMessageId] = useState("");
  const [editMessage, setEditMessage] = useState("");

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
          <RoomHeader roomInfos={roomsArray} />
          <div
            className="container min-h-screen overflow-auto px-3 "
            ref={containerRef}
          >
            {messages?.map((message: MessageType, index) => (
              <React.Fragment key={index}>
                <Message
                  message={message}
                  setReplyId={setReplyId}
                  setEditMessageId={setEditMessageId}
                  setEditMessage={setEditMessage}
                />
              </React.Fragment>
            ))}
          </div>
          <SendMessage
            replyId={replyId}
            setReplyId={setReplyId}
            setEditMessage={setEditMessage}
            setEditMessageId={setEditMessageId}
            editMessageId={editMessageId}
            editMessage={editMessage}
          />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
