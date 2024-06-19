// import { CompatClient, Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// let stompClient: CompatClient | null = null;

// export const connect = (
//   token: string,
//   onMessageReceived: (message: any) => void
// ) => {
//   const socket = new SockJS("ws://localhost:8080/game");
//   stompClient = Stomp.over(socket);

//   stompClient.connect(
//     { Authorization: `Bearer ${token}` },
//     () => {
//     //   console.log("Connected");
//       stompClient?.subscribe("/topic/game", (message) => {
//         onMessageReceived(JSON.parse(message.body));
//       });
//     },
//     (error: Error) => {
//       console.log("Connection error:", error);
//     }
//   );
// };

// export const disconnect = () => {
//   if (stompClient !== null) {
//     stompClient.disconnect(() => {
//       console.log("Disconnected");
//     });
//   }
// };

// export const sendMessage = (message: any) => {
//   stompClient?.send("app/game", {}, JSON.stringify(message));
// };

//MEMO: main에서 호출될예정
import { Client } from "@stomp/stompjs";
import { getTokens } from "../../utils";
import StompJS from "@stomp/stompjs";
// export const getClient = () => {
//   return new Client({
//     brokerURL: "ws://localhost:8080/game",
//     connectHeaders: {
//       Authorization: `Bearer ${getTokens()}`,
//     },
//     debug: (str: string) => {
//       console.log(str);
//     },
//     reconnectDelay: 5000, //자동 재 연결
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });
// };
const client = new StompJS.Client({
  brokerURL: "/api/ws",
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000, //자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
client.onConnect = function (frame) {};

client.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};
//클라이언트 활성화
client.activate();
//클라이언트 비활성화
client.deactivate();

//메세지 보내기
client.publish({
  destination: "/topic/general",
  body: "Hello world",
  headers: { priority: "9" },
});
//메세지 받기
const callback = () => {};
const subscription = client.subscribe("/queue/test", callback);
export {};
