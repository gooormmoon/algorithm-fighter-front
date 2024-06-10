
import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Layout from "../components/Layout";

const router = (
    <Route path="/" element={<Layout/>}>
        <Route/>
    </Route>
)
const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;