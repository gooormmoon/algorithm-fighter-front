import { Client } from "@stomp/stompjs";

export interface ThemeType {
  theme: string;
  changeTheme: () => void;
}

export const initialMe = {
  me: {
    id: "",
    name: "",
    nickname: "",
    profile_image_url: "",
    description: "",
    createdDate: "",
    loginDate: "",
  },
  loggedIn: false,
};
export type MeType = {
  me: {
    id: string;
    name: string;
    nickname: string;
    profile_image_url: string;
    description: string;
    createdDate: string;
    loginDate: string;
  };
  loggedIn: boolean;
  setMe: (newMe: MeType["me"]) => void;
  reset: () => void;
};
export type GameSocketType = {
  client: Client | null;
  setClient: (newClient: GameSocketType["client"]) => void;
};
export type StompType = {
  gameClient: Client | null;
  setGameClient: (newClient: StompType["gameClient"]) => void;
  chatClient: Client | null;
  setChatClient: (newClient: StompType["chatClient"]) => void;
  // allChatClient: Client | null;
  // setAllChatClient: (newClient: StompType["allChatClient"]) => void;
  // gameChatClient: Client | null;
  // setGameChatClient: (newClient: StompType["gameChatClient"]) => void;
};

//"type":"TALK","chatroom_id":"global","content":"hihi","sender_id":"sjj@naver.com","created_date":"2024-06-21T05:28:43.524011295"}
export type Message = {
  nickname: string;
  type: string;
  chatroom_id: string;
  content: string;
  sender_id: string;
  created_date: string;
};
export type GlobalChatType = {
  messages: Message[];
  setMessages: (newMessage: Message) => void;
  resetMessages: () => void; // 추가
};

export type GameChatType = {
  messages: Message[];
  setMessages: (newMessage: Message) => void;
  resetMessages: () => void; // 추가
};

export type Room = {
  host_id: string;
  host: string;
  title: string;
  max_player: number;
  problem_level: string;
  timer_time: number;
  started: boolean;
  players: [];
};
export type RoomsType = {
  rooms: Room[];
  setRooms: (newRooms: Room[]) => void;
  resetRooms: () => void;
};
