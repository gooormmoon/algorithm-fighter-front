import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import {
  LoginPage,
  RegisterPage,
  MyPageRead,
  GamePage,
  MyReposPage,
  MyPageUpdate,
} from "../pages";

const router = (
  <Route path="/" element={<Layout />}>
    <Route path="/game" element={<GamePage />} />\
    <Route path="/myRepository" element={<MyReposPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/mypage" element={<MyPageRead />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/mypageUpdate" element={<MyPageUpdate />} />
  </Route>
);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
