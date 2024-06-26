import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { getTokens, saveTokens, clearTokens } from "../../../utils";
import { login } from "../../../api/Auth";
import { useGlobalChat, useMe, useRooms, useStomp } from "../../../store/store";
import { getMe } from "../../../api/Users";
import { createGameClient } from "../../../api/Game";
import { createChatClient } from "../../../api/Chat";
import * as StompJs from "@stomp/stompjs";
import { toast } from "react-toastify";
import { AnyCnameRecord } from "dns";
import Darkmode_logo from "../../../Darkmode_logo.png";
import Lightmode_logo from "../../../Lightmode_logo.png";
import styles from "./login.module.scss";

const Login = () => {
  const { setRooms } = useRooms();
  const { loggedIn, setMe, me } = useMe();
  const { setGameClient, setChatClient, chatClient } = useStomp();
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
            toast.info(`환영해요, ${myInfo.nickname} 님!`);
            const gameClient: StompJs.Client = createGameClient();
            const newChatClient: StompJs.Client = createChatClient();
            chatClient?.deactivate();
            chatClient?.unsubscribe("globalChat");
            newChatClient.activate();
            newChatClient.onConnect = (frame: any) => {
              newChatClient.unsubscribe("globalChat");
              newChatClient.subscribe(
                "/topic/room/global",
                (message) => {
                  const receivedMessage = JSON.parse(message.body);
                  setMessages({
                    ...receivedMessage,
                    nickname: myInfo.nickname, // nickname 추가
                  });
                },
                {
                  id: "globalChat",
                }
              );
            };

            setChatClient(newChatClient);
            resetMessages(); // 메시지 리셋
            gameClient.activate();
            gameClient.onConnect = (frame: any) => {
              console.log("Game Client connected");
              gameClient.unsubscribe("rooms");
              gameClient.subscribe(
                "/user/queue/game/sessions",
                (message) => {
                  const data = JSON.parse(message.body);
                  // console.log(data);
                  if (data.rooms) {
                    setRooms(data.rooms);
                    // gameClient.unsubscribe("/user/queue/game/sessions");
                  }
                },
                {
                  id: "rooms",
                }
              );
              const message = JSON.stringify({
                message: "give me room list",
              });
              gameClient.publish({
                destination: "/app/game/sessions",
                body: message,
              });

              gameClient.unsubscribe("joinGame");
              gameClient.subscribe(
                "/user/queue/game/join",
                (message) => {
                  const data = JSON.parse(message.body);

                  if (data.host_id) {
                    //생성하고 콜백함수
                    navigate(`/wait/${data.host_id}`, {
                      state: {
                        host: `${data.host}`,
                        host_id: `${data.host_id}`,
                        players: data.players,
                        ready_players: data.ready_players,
                        max_player: data.max_player,
                        problem_level: data.problem_level,
                        timer_time: data.timer_time,
                        title: data.title,
                        chatroom_id: data.chatroom_id,
                      },
                    });
                  } else {
                    alert(data.msg);
                  }
                },
                { id: "joinGame" }
              );
            };
            setGameClient(gameClient);

            navigate("/");
          }
        }
      }

      // else if(response.status ===)
      //로그인 실패시 toast 알람을 추가할지 아니면 그냥 에러메세지만 태그로 넣어줄지 고민해봐야할듯!
    } catch (err) {
      console.error(err);
      // toast.error("로그인 실패!");

      // alert("로그인 실패");
      //임시로 alert로 해놓음
    }
  };

  return (
    <div className={styles.container}>
      <main
        className={`w-full h-[100vh] flex flex-col justify-start items-center gap-[6vh]
        ${"bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "}`}
      >
        <div className="flex justify-start w-full px-4">
          <img
            src={Lightmode_logo}
            alt="Lightmode_logo"
            className="w-[12vh] h-[12vh] object-contain"
          />
        </div>
        <form
          className="w-[52vh] h-[60vh] gap-4 flex flex-col justify-center items-center  rounded-md  bg-transparent "
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
    </div>
  );
};

export default Login;
