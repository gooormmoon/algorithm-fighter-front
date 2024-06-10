import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import {LoginPage,RegisterPage} from "../pages";

const router = (
  // <Route>
  //   <Route path="/" element={<Layout />}>
  //     <Route />
  //   </Route>
  //   <Route path="/register" element={<Register/>}/>
  // </Route>

      <Route path="/" element={<Layout />}>
      <Route />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Route>

);
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
