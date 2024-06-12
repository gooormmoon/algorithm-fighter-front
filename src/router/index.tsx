import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import { LoginPage, RegisterPage, MyPage } from "../pages";
import CodeEditor from "../game/components/CodeEditor";

const router = (
  <Route path="/" element={<Layout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/codeeditor" element={<CodeEditor />} />
  </Route>
);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
