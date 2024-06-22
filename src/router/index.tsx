import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";

import {
  MainPage,
  LoginPage,
  RegisterPage,
  LogoutPage,
  ProfileSettingPage,
  GamePage,
  MyReposPage,
  WaitPage,
  StartPage
} from "../pages";

const router = (
  <Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />\
      {/* <Route path="/myRepository" element={<MyReposPage />} /> */}
      <Route path="/setting" element={<ProfileSettingPage />} />
      <Route path="/wait" element={<WaitPage />} />
      <Route path="/start" element={<StartPage />} />
    </Route>

    <Route path="/login" element={<LoginPage />} />
    <Route path="/logout" element={<LogoutPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
