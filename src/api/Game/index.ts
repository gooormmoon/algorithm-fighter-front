//MEMO: main에서 호출될예정
import { Client } from "@stomp/stompjs";
import { getTokens } from "../../utils";
import apiClient from "../apiClient";
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
//STOMP SEND
//1. 게임 세션 생성 - MAIN (방장)
//reqeust: {problem_level:int, timer_time:int, title:stirng}
//response:{host:string, players:String[], ready_player:String[], max_player :int, problem_level:int, timer_time:int, title:String, chat_room_id:String}
export const createGame = (client: Client, body: {}) => {
  client.publish({
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
  client.publish({
    destination: "/app/game/start",
  });
};
//6. 작성한 코드 제출 - GAME - post
//reqeust;{code:string, language:string}
// export const submitCode = (client: Client, body: {}) => {
//   client.publish({
//     destination: "/app/game/submit",
//     body: JSON.stringify(body),
//   });
// };
export const getFile = (path: string) => {
  return apiClient.get(`/api/file/${path}`);
};
export const submitCode = (body: {
  code: string;
  language: string;
  arguments: string;
  expect: string;
}) => {
  return apiClient.post("/api/execute");
};
//7. 게임 종료 후 코드 송신
export const forceSubmitCode = (
  client: Client,
  body: { code: string; language: string }
) => {
  client.publish({
    destination: "/app/game/save",
    body: JSON.stringify(body),
  });
};

// 8.사용자 테스트 케이스 채점
// code	String	O	사용자가 작성한 코드
// language	String	O	작성한 코드의 언어
// input	String	X	사용자가 작성한 테스트 케이스 입력
// expected	String	O	기대하는 출력
export const submitTestCase = (body: {
  code: string;
  language: string;
  input: string;
  expected: string;
}) => {
  return apiClient.post("/api/judge-input");
};

//STOMP RECEIVE 게임 구독 (받을 메세지)
//1. 현재 개설된 게임 세션 목록 불러오기
//response: rooms:Ojbect[] : {host:String, title,String,max_player, problem_level,timer_time}

//2. 게임 세션 업데이트됨
//response:{host:string, players:String[], ready_player:String[], max_player :int, problem_level:int, timer_time:int, title:String, chat_room_id:String}

//3. 게임 시작 신호 수신
//response:timer_time:String, AlgorithmProblem :{title:String, content, level, code_templates:Object},

// const gameStartRecieved = (client: Client) => {
//   client.subscribe("/user/queue/game/session", (message: string) => {
//     const data = JSON.parse(message);
//     //제목 바꾸기
//     // setTitle(message.title);
//     // 문제 내용 바꾸기
//     // setcontent(message.content)
//     // 레벨 바꾸기
//     // setLevel(message.level)
//     //
//     // setCodeTemplage(message.code_templates)
//   });
// };
//4. 게임 종료 결과를 수신
//response:running_time:String, game_over_type:String(win,lose,time_over)

// export const gameStartRecieved = (client: Client) => {
//   client.subscribe("/user/queue/game/session", (message) => {
//     const message = JSON.parse(message.body);

//     //  게임 시간 stop
//     message.running_time;

//     // 게임 모달에  game_over_type 전달
//     if (message.game_over_type === "win") {
//       //게임 승리 모달
//     }
//     if (message.game_over_type === "lose") {
//       //게임 승리 모달
//     }
//     if (message.game_over_type === "time_over") {
//       //게임 승리 모달
//     }
//   });
// };

export {};
