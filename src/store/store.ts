import { create } from "zustand";
import { ThemeType } from "./types";

export const useTheme = create<ThemeType>((set) => ({
  theme: "light",
  changeTheme: () => {
    set((prevState) => {
      return {
        theme: prevState.theme === "light" ? "dark" : "light",
      };
    });
  },
}));
