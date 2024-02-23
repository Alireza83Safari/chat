import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import RoomHeader from "./RoomHeader";
import SendMessage from "./SendMessage";
import { RoomType } from "../../types/room.type";
import { MessageType } from "../../types/message.type";
import getRoomId from "../../hooks/getRoomId";
import { useAppSelector } from "../../redux/store";
import { sendPrivateMessage } from "../../services/socket";

const ChatRoom: React.FC = () => {
  const { roomId } = getRoomId();
  const rooms = useAppSelector((state) => state.chat.rooms);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
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

  const lastUnseenMessage = messages
    ?.filter(
      (message: MessageType) =>
        message.userId !== userInfo?.id && !message.isSeen
    )
    ?.pop();

  useEffect(() => {
    if (userInfo?.id !== lastUnseenMessage?.userId) {
      sendPrivateMessage("seen-message", {
        roomId: roomId,
        id: lastUnseenMessage?.id,
      });
    }
  }, [roomId, messages]);

  return (
    <div className="bg-[#E9E9E9] fixed right-0 bottom-0 top-0 min-h-[20rem] w-full overflow-y-auto lg:pl-[320px] md:pl-[280px] pl-[75px] -z-10">
      {!!roomId && (
        <>
          <RoomHeader roomInfos={roomsArray} />
          <div
            className="container min-h-screen overflow-auto lg:px-3 px-2"
            ref={containerRef}
          >
            {messages?.map((message: MessageType, index) => (
              <React.Fragment key={index}>
                <Message
                  message={message}
                  setReplyId={setReplyId}
                  setEditMessageId={setEditMessageId}
                  roomInfo={roomsArray}
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
            isPrivate={roomsArray?.room?.isPrivate}
          />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
