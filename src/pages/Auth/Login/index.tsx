import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { getTokens, saveTokens } from "../../../utils";
import { login } from "../../../api/Auth";
import { useGlobalChat, useMe, useStomp } from "../../../store/store";
import { getMe } from "../../../api/Users";
import { createGameClient } from "../../../api/Game";
import { createChatClient } from "../../../api/Chat";
import * as StompJs from "@stomp/stompjs";
const Login = () => {
  const { loggedIn, setMe } = useMe();
  const { setGameClient, setChatClient } = useStomp();
  const navigate = useNavigate();
  const { setMessage } = useGlobalChat();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);
  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const loginData = {
      id: form.email,
      password: form.password,
    };

    try {
      const response = await login(loginData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
        if (getTokens()) {
          const myInfoResponse = await getMe();
          if (myInfoResponse.status === 200) {
            const myInfo = myInfoResponse.data;
            setMe(myInfo);
            // navigate("/");
            // const gameClient = createGameClient();
            // gameClient.activate();
            // gameClient.onConnect = (frame: any) => {
            //   console.log(gameClient);
            //   setGameClient(gameClient);
            //   // navigate("/");
            // };
            // gameClient.onStompError = (frame: any) => {
            //   console.log("Broker reported error: " + frame.headers["message"]);
            //   console.log("Additional details: " + frame.body);
            //   // navigate("/");
            // };
            const gameClient: StompJs.Client = createGameClient();
            const chatClient: StompJs.Client = createChatClient();
            chatClient.activate();
            chatClient.onConnect = (frame: any) => {
              chatClient.subscribe("/topic/room/global", (message) => {
                setMessage(JSON.parse(message.body));
              });
            };
            gameClient.onConnect = (frame: any) => {
              gameClient.subscribe("/game", (message) => {
                setMessage(JSON.parse(message.body));
              });
            };

            setChatClient(chatClient);
            navigate("/");
          }
        }
      }
      // else if(response.status ===)
      //로그인 실패시 toast 알람을 추가할지 아니면 그냥 에러메세지만 태그로 넣어줄지 고민해봐야할듯!
    } catch (err) {
      console.error(err);
      // alert("로그인 실패");
      //임시로 alert로 해놓음
    }
  };
  return (
    <main
      className={`w-full h-[100vh] flex flex-col justify-center items-center 
        ${"bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "}`}
    >
      <form
        className="w-[540px] h-[480px] gap-4 p-8 flex flex-col justify-center items-center  rounded-md  bg-transparent "
        onSubmit={onSubmit}
      >
        <h1 className=" text-[68px] font-semibold">Login</h1>

        <Input
          type="email"
          placeholder="Email"
          value={form?.email}
          onChange={onChange}
          name="email"
          size="large"
          border={false}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form?.password}
          onChange={onChange}
          name="password"
          size="large"
          border={false}
        />
        <Button
          type="submit"
          size="large_radius"
          color="secondary"
          textColor="primary_font"
          name="로그인"
        />
        <ul className="mt-4 flex gap-2 text-sm">
          <li className="cursor-pointer">아이디 찾기</li>
          <li>|</li>
          <li className="cursor-pointer">비밀번호 찾기</li>
          <li>|</li>
          <li
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            회원가입
          </li>
        </ul>
      </form>
    </main>
  );
};

export default Login;
