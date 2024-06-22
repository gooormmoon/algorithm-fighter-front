import { create } from "zustand";
import {
  ThemeType,
  MeType,
  GameSocketType,
  StompType,
  GlobalChatType,
  Message,
  initialMe,
} from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import Logout from "../pages/Auth/Logout";

export const useTheme = create(
  persist<ThemeType>(
    (set) => ({
      theme: "light",
      changeTheme: () => {
        set((prevState) => {
          return {
            theme: prevState.theme === "light" ? "dark" : "light",
          };
        });
      },
    }),
    {
      name: "themeStorage",
    }
  )
);

export const useMe = create(
  persist<MeType>(
    (set) => ({
      // Initial state for `me` object
      ...initialMe,
      // Method to update the `me` state
      setMe: (newMe: MeType["me"]) => {
        set((prevState: MeType) => {
          return {
            me: { ...newMe },
            loggedIn: true,
          };
        });
      },
      reset: () => {
        set(initialMe);
      },
    }),
    {
      name: "meStorage", // Key name for local storage
    }
  )
);

export const useGameSocket = create(
  persist<GameSocketType>(
    (set) => ({
      client: null,
      setClient: (newClient: GameSocketType["client"]) => {
        set((prevState: GameSocketType) => {
          return {
            client: newClient,
          };
        });
      },
    }),
    {
      name: "gameSocketStorage",
    }
  )
);

export const useStomp = create(
  persist<StompType>(
    (set) => ({
      gameClient: null,
      chatClient: null,
      setGameClient: (newGameClient: StompType["gameClient"]) => {
        set((prevState: StompType) => {
          return {
            ...prevState,
            gameClient: newGameClient,
          };
        });
      },

      setChatClient: (newChatClient: StompType["chatClient"]) => {
        set((prevState: StompType) => {
          return {
            ...prevState,
            chatClient: newChatClient,
          };
        });
      },
    }),
    {
      name: "stompStorage",
    }
  )
);

export const useGlobalChat = create(
  persist<GlobalChatType>(
    (set) => ({
      messages: [],
      setMessages: (newMessage: Message) => {
        set((state) => {
          const updatedMessages = [...state.messages, newMessage];
          console.log("Updating messages:", updatedMessages); // 콘솔 로그 추가
          return { messages: updatedMessages };
        });
      },
      resetMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: "globalMessageStorage", // 로컬 스토리지에서 사용할 키
    }
  )
);
