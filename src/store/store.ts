import { create } from "zustand";
import { ThemeType, MeType } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

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

const initialMe = {
  me: {
    id: "",
    name: "",
    nickname: "",
    profileImageUrl: "",
    description: "",
    createdDate: "",
    loginDate: "",
  },
  loggedIn: false,
};
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
