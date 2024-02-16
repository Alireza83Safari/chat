const publicSocket = new WebSocket(`ws://localhost:3000/chat/ws/public`);
const privateSocket = new WebSocket(`ws://localhost:3000/chat/ws/private`);

const sendPublicMessage = (type: string, content: any) => {
  let newMessageRequest = {
    type: type,
    unix: Date.now(),
    content: JSON.stringify(content),
  };
  publicSocket.send(JSON.stringify(newMessageRequest));
};

const sendPrivateMessage = (type: string, content: any) => {
  let newMessageRequest = {
    type: type,
    unix: Date.now(),
    content: JSON.stringify(content),
  };
  privateSocket.send(JSON.stringify(newMessageRequest));
};

export { publicSocket, privateSocket, sendPublicMessage, sendPrivateMessage };
