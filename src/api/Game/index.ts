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
export {};
