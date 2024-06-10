import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import MyPage from "../pages/mypage";
const router = (
  <Route path="/" element={<Layout />}>
    <Route path="/mypage" element={<MyPage />} />
  </Route>
);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
