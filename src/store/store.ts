import { create } from "zustand";
import { ThemeType } from "./types";
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
