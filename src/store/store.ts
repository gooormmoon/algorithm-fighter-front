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
import { Stomp } from "@stomp/stompjs";

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
      setMessage: (newMessage: Message) => {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },
    }),
    {
      name: "globalMessageStorage", // The key used for local storage
    }
  )
);
