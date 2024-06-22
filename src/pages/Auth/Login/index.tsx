import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { getTokens, saveTokens, clearTokens } from "../../../utils";
import { login } from "../../../api/Auth";
import { useGlobalChat, useMe, useStomp } from "../../../store/store";
import { getMe } from "../../../api/Users";
import { createGameClient } from "../../../api/Game";
import { createChatClient } from "../../../api/Chat";
import * as StompJs from "@stomp/stompjs";
import { toast } from "react-toastify";

const Login = () => {
  const { loggedIn, setMe } = useMe();
  const { setGameClient, setChatClient } = useStomp();
  const navigate = useNavigate();
  const { setMessages, resetMessages } = useGlobalChat();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            const gameClient: StompJs.Client = createGameClient();
            const chatClient: StompJs.Client = createChatClient();
            chatClient.activate();
            chatClient.onConnect = (frame: any) => {
              chatClient.subscribe("/topic/room/global", (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages({
                  ...receivedMessage,
                  nickname: myInfo.nickname, // nickname 추가
                });
              });
            };

            setChatClient(chatClient);
            resetMessages(); // 메시지 리셋
            gameClient.activate();
            gameClient.onConnect = (frame: any) => {
              console.log("connected");
              setGameClient(gameClient);
            };

            navigate("/");
            toast.success("로그인 성공!");
          }
        }
      }

      // else if(response.status ===)
      //로그인 실패시 toast 알람을 추가할지 아니면 그냥 에러메세지만 태그로 넣어줄지 고민해봐야할듯!
    } catch (err) {
      console.error(err);
      toast.error("로그인 실패!");
      // alert("로그인 실패");
      //임시로 alert로 해놓음
    }
  };

  // 로그아웃
  // const onLogout = () => {
  //   clearTokens(); // 토큰 삭제
  //   reset(); // 사용자 상태 리셋
  //   resetMessages(); // 메시지 리셋
  //   navigate("/login");
  // };

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
      {/* <Button onClick={onLogout} size="large_radius" color="secondary" textColor="primary_font" name="로그아웃" /> */}
    </main>
  );
};

export default Login;
