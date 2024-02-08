import ChatRoom from "../components/Chat/ChatRoom";
import RoomsList from "../components/Chat/RoomsList";
import { ChatContextProvider } from "../context/ChatContext";

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
