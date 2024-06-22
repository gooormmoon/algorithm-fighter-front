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
  WaitPage,
} from "../pages";

const router = (
  <Route>
    {/* <Route path="/" element={<StartPage />} /> */}
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="/setting" element={<ProfileSettingPage />} />
      <Route path="/wait/:id" element={<WaitPage />} />
      <Route path="/game/:id" element={<GamePage />} />\
    </Route>

    <Route path="/login" element={<LoginPage />} />
    <Route path="/logout" element={<LogoutPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
