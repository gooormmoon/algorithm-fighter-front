import { Client } from "@stomp/stompjs";
import { getTokens } from "../../utils";

export const createChatClient = () => {
  return new Client({
    brokerURL: "ws://localhost:8080/chat",
    connectHeaders: {
      Authorization: `Bearer ${getTokens()}`,
    },
    // debug: function (str) {
    //   console.log(str);
    // },
    // reconnectDelay: 5000, //자동 재 연결
    // heartbeatIncoming: 4000,
    // heartbeatOutgoing: 4000,
    // onConnect:()=>{}
  });
};

// export const enterChatRoom = (client: Client, roomId: string) => {
//   return client.publish({
//     destination: `/app/enter-room/${roomId}`,
//     // body: JSON.stringify(body),
//   });
// };

// // 메시지 전송 함수
// export function sendMessage(client: Client) {
//   // const name = $('#name').val(); // 이름 입력 필드에서 가져옴
//   // const messageContent = $('#message').val(); // 메시지 내용 입력 필드에서 가져옴

//   const room_id = "4f9285dc-1d15-45d5-93b9-8c220cc4ac56"; // 실제 채팅방 ID로 교체
//   const messageContent = "hihi";
//   const message = {
//     chat_room_id: room_id,
//     content: messageContent,
//     type: "TALK",
//   };

//   client.publish({
//     destination: "/app/send-message", // 메시지 매핑 엔드포인트
//     body: JSON.stringify(message),
//   });
// }

// // 수신된 메시지를 화면에 표시하는 함수
// function showGreeting(message: string) {
//   console.log(message);
// }
