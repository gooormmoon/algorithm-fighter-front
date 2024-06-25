import axios from "axios";
import config from "../config";

const compileClient = axios.create({
  baseURL: config.COMPILE_URL,
  timeout: 5000,
});
export default compileClient;
