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
