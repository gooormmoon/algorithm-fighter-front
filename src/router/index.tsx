import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
<<<<<<< feat/gameUI-GRTEAM-130
import {
  LoginPage,
  RegisterPage,
  MyPage,
  GamePage,
  MyReposPage,
} from "../pages";
=======
import { LoginPage, RegisterPage, MyPage } from "../pages";
import CodeEditor from "../game/components/CodeEditor";
>>>>>>> develop

const router = (
  <Route path="/" element={<Layout />}>
    <Route path="/game" element={<GamePage />} />\
    <Route path="/myRepository" element={<MyReposPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/codeeditor" element={<CodeEditor />} />
  </Route>
);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
