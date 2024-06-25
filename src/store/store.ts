import { create } from "zustand";
import {
  ThemeType,
  MeType,
  GameSocketType,
  StompType,
  GlobalChatType,
  Message,
  initialMe,
  RoomsType,
} from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import Logout from "../pages/Auth/Logout";

interface ResizeState {
  isResizingX: boolean;
  isResizingY: boolean;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  setIsResizingX: (isResizingX: boolean) => void;
  setIsResizingY: (isResizingY: boolean) => void;
  setInitialX: (initialX: number) => void;
  setInitialY: (initialY: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

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

export const useRooms = create(
  persist<RoomsType>(
    (set) => ({
      rooms: [],
      setRooms: (newRooms: RoomsType["rooms"]) => {
        set((state) => {
          const updateRooms = [...newRooms];
          console.log("Updating rooms:", updateRooms); // 콘솔 로그 추가
          return { rooms: updateRooms };
        });
      },
      resetRooms: () => {
        set({ rooms: [] });
      },
    }),
    {
      name: "roomsStorage",
    }
  )
);

export const useResizeStore = create<ResizeState>((set) => ({
  isResizingX: false,
  isResizingY: false,
  initialX: 0,
  initialY: 0,
  width: window.innerWidth / 3,
  height: window.innerHeight / 1.5,
  setIsResizingX: (isResizingX) => set({ isResizingX }),
  setIsResizingY: (isResizingY) => set({ isResizingY }),
  setInitialX: (initialX) => set({ initialX }),
  setInitialY: (initialY) => set({ initialY }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
}));
