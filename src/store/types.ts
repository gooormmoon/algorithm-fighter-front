import { Client } from "@stomp/stompjs";

export interface ThemeType {
  theme: string;
  changeTheme: () => void;
}
export type MeType = {
  me: {
    id: string;
    name: string;
    nickname: string;
    profileImageUrl: string;
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
