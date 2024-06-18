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
  MyPageRead,
  GamePage,
  MyReposPage,
  MyPageUpdate,
  Wait,
} from "../pages";

const router = (
  <Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />\
      <Route path="/myRepository" element={<MyReposPage />} />
      <Route path="/mypage" element={<MyPageRead />} />
      <Route path="/mypageUpdate" element={<MyPageUpdate />} />
      <Route path="/Wait" element={<Wait />} />
    </Route>

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
