import { RoomsList, ChatRoom } from "../components";
import { ChatContextProvider } from "../context/chat/ChatContext";

const Chat = () => {
  return (
    <>
      <ChatContextProvider>
        <RoomsList />
        <ChatRoom />
      </ChatContextProvider>
    </>
  );
};

export default Chat;
