import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { validateEmail } from "../utils";
import { getTokens, saveTokens } from "../../../utils";
import { login } from "../../../api/Auth";
import { useMe, useStomp, useTheme } from "../../../store/store";
import { getMe } from "../../../api/Users";
import { createGameClient } from "../../../api/Game";
import {
  createChatClient,
  // enterChatRoom,
  // sendMessage,
} from "../../../api/Chat";

const Login = () => {
  // const REST_API_KEY = "백엔드한테 달라하자1";
  // const REDIRECT_URI = "백엔드한테 달라하자2";
  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const onClickSocialLogin = () => {
  //   window.location.href = link;
  // };
  const { theme } = useTheme();
  const { me, loggedIn, setMe } = useMe();
  const { setGameClient, setChatClient } = useStomp();
  const navigate = useNavigate();

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
            const chatClient = createChatClient();
            chatClient.activate();
            chatClient.onConnect = (frame: any) => {
              console.log(frame);
              chatClient.subscribe(
                "/topic/room/4f9285dc-1d15-45d5-93b9-8c220cc4ac56",
                (message) => {
                  console.log(JSON.parse(message.body).content);
                }
              );
              // const response = enterChatRoom(
              //   chatClient,
              //   "4f9285dc-1d15-45d5-93b9-8c220cc4ac56"
              // );
              // console.log(response);
              // setChatClient(chatClient);
              // navigate("/");
            };
            chatClient.onStompError = (frame: any) => {
              console.log("Broker reported error: " + frame.headers["message"]);
              console.log("Additional details: " + frame.body);
              // navigate("/");
            };
            const room_id = "4f9285dc-1d15-45d5-93b9-8c220cc4ac56"; // 실제 채팅방 ID로 교체
            const messageContent = "hihi";
            const message = {
              chat_room_id: room_id,
              content: messageContent,
              type: "TALK",
            };

            chatClient.publish({
              destination: "/app/send-message", // 메시지 매핑 엔드포인트
              body: JSON.stringify(message),
            });
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
        ${
          // theme === "dark"
          //   ? "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "
          //   : "bg-white text-secondary"
          "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "
        }`}
    >
      {/* <div className="w-[560px] h-[500px] bg-white/30 blur-lg absolute" /> */}
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

        {/* <div className="w-[360px] h-[56px] flex justify-center">
        <button type="button" onClick={onClickSocialLogin}>
          TEST-카카오 소셜로그인
        </button>
      </div> */}
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
