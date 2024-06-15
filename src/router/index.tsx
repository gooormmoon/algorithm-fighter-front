import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import {
  LoginPage,
  RegisterPage,
  MyPage,
  GamePage,
  MyReposPage,
} from "../pages";

const router = (
  <Route>
    <Route path="/" element={<Layout />}>
      <Route path="/game" element={<GamePage />} />\
      <Route path="/myRepository" element={<MyReposPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
