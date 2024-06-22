//MEMO: main에서 호출될예정
import * as StompJs from "@stomp/stompjs";
import { getTokens } from "../../utils";
import apiClient from "../apiClient";

export const createGameClient = () => {
  return new StompJs.Client({
    brokerURL: "ws://localhost:8080/game",
    connectHeaders: {
      Authorization: `Bearer ${getTokens()}`,
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000, //자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onStompError: (frame: any) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
      // navigate("/");
    },
    onWebSocketError: (error: Error) => {
      console.error("WebSocket Error:", error);
    },
    // onConnect:()=>{}
  });
};
//STOMP SEND
//1. 게임 세션 생성 - MAIN (방장)
//reqeust: {problem_level:int, timer_time:int, title:stirng}
//response:{host:string, players:String[], ready_player:String[], max_player :int, problem_level:int, timer_time:int, title:String, chat_room_id:String}
export const createGame = (client: StompJs.Client, body: {}) => {
  client.publish({
    destination: "/app/game/create",
    body: JSON.stringify(body),
    // headers: { priority: "9" },
  });
};

//2. 게임 참가 - MAIN
//reqeust: {host_id}
//response:{host, players, ready_player, max_player, problem_level, timer_time, title, chat_room_id}
export const joinGame = (client: StompJs.Client, body: {}) => {
  client.publish({
    destination: "/app/game/join",
    body: JSON.stringify(body),
  });
};
//3. 게임 설정 수정 - WAIT
//reqeust: {problem_level:int, timer_time:int, title:stirng}
//response: 예시없음, 성공
export const updateGame = (client: StompJs.Client, body: {}) => {
  client.publish({
    destination: "/app/game/updates",
    body: JSON.stringify(body),
  });
};
//4. 상대방 게임 준비 상태 수정 - WAIT
export const readyGame = (client: StompJs.Client) => {
  client.publish({
    destination: "/app/game/ready",
  });
};
//5. 방장- 게임 시작 요청  - WAIT
export const startGame = (client: StompJs.Client) => {
  client.publish({
    destination: "/app/game/start",
  });
};
//6. 작성한 코드 제출 - GAME - post - complete
//reqeust;{code:string, language:string}
export const submitCode = (client: StompJs.Client, body: {}) => {
  client.publish({
    destination: "/app/game/submit",
    body: JSON.stringify(body),
  });
};
//7. 게임방 목록 받기위해 아무 메세지 보내기
export const sendGetRooms = (client: StompJs.Client, body: {}) => {
  client.publish({
    destination: "/app/game/sessions",
    body: JSON.stringify(body),
  });
};

export const getFile = (path: string) => {
  return apiClient.get(`/api/file/${path}`);
};

//7. 게임 정답 코드 강제 송신
export const autoUserSubmitCode = (
  client: StompJs.Client,
  body: { code: string; language: string }
) => {
  client.publish({
    destination: "/app/game/save",
    body: JSON.stringify(body),
  });
};

// 코드채점
export const gradeCode = (body: {
  code: string;
  language: string;
  input: string;
  expected: string;
}) => {
  return apiClient.post("/api/judge-input", body);
};
