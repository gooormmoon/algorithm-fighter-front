//MEMO: main에서 호출될예정
import { Client } from "@stomp/stompjs";
import { getTokens } from "../../utils";
export const createGameClient = () => {
  return new Client({
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
    // onConnect:()=>{}
  });
};
// client.onConnect = function (frame) {};

// client.onStompError = function (frame) {
//   console.log("Broker reported error: " + frame.headers["message"]);
//   console.log("Additional details: " + frame.body);
// };
//클라이언트 활성화
// client.activate();
//클라이언트 비활성화
// client.deactivate();

//메세지 보내기
// client.publish({
//   destination: "/topic/general",
//   body: "Hello world",
//   headers: { priority: "9" },
// });

//메세지 받기
// const callback = () => {};
// const subscription = client.subscribe("/queue/test", callback);

//STOMP SEND
//1. 게임 세션 생성 - MAIN (방장)
//reqeust: {problem_level:int, timer_time:int, title:stirng}
//response:{host:string, players:String[], ready_player:String[], max_player :int, problem_level:int, timer_time:int, title:String, chat_room_id:String}
export const createGame = (client: Client, body: {}) => {
  return client.publish({
    destination: "/app/game/create",
    body: JSON.stringify(body),
    // headers: { priority: "9" },
  });
};

//2. 게임 참가 - MAIN
//reqeust: {host_id}
//response:{host, players, ready_player, max_player, problem_level, timer_time, title, chat_room_id}
export const joinGame = (client: Client, body: {}) => {
  client.publish({
    destination: "/app/game/join",
    body: JSON.stringify(body),
  });
};
//3. 게임 설정 수정 - WAIT
//reqeust: {problem_level:int, timer_time:int, title:stirng}
//response: 예시없음, 성공
export const updateGame = (client: Client, body: {}) => {
  client.publish({
    destination: "/app/game/updates",
    body: JSON.stringify(body),
  });
};
//4. 상대방 게임 준비 상태 수정 - WAIT
export const readyGame = (client: Client) => {
  client.publish({
    destination: "/app/game/ready",
  });
};
//5. 방장- 게임 시작 요청  - WAIT
export const startGame = (client: Client) => {
  return client.publish({
    destination: "/app/game/start",
  });
};
//6. 작성한 코드 제출 - GAME
//reqeust;{code:string, language:string}
export const submitCode = (client: Client, body: {}) => {
  client.publish({
    destination: "/app/game/submit",
    body: JSON.stringify(body),
  });
};
//7. 게임방 목록 받기위해 아무 메세지 보내기
export const sendGetRooms = (client: Client, body: {}) => {
  client.publish({
    destination: "/app/game/sessions",
    body: JSON.stringify(body),
  });
};

//STOMP RECEIVE 게임 구독 (받을 메세지)
//1. 현재 개설된 게임 세션 목록 불러오기
//response: rooms:Ojbect[] : {host:String, title,String,max_player, problem_level,timer_time}

//2. 게임 세션 업데이트됨
//response:{host:string, players:String[], ready_player:String[], max_player :int, problem_level:int, timer_time:int, title:String, chat_room_id:String}

//3. 게임 시작 신호 수신
//response:timer_time:String, AlgorithmProblem :{title:String, content, level, code_templates:Object},

//4. 게임 종료 결과를 수신
//response:running_time:String, game_over_type:String(win,lose,time_over)
// const gamesubs = client.subscribe("/user/queue/game/session", callback);

export {};
