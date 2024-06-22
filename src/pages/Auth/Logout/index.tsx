import React from "react";
import { useMount } from "react-use";
import { useGlobalChat, useMe, useStomp } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//stomp 연결 끊기
const Logout = () => {
  const { resetMessages } = useGlobalChat();
  const { gameClient, chatClient } = useStomp();
  const { reset } = useMe();
  const navigate = useNavigate();
  useMount(() => {
    reset();
    resetMessages();
    if (gameClient?.connected) {
      gameClient.deactivate();
    }
    if (chatClient?.connected) {
      chatClient.deactivate();
    }
    localStorage.clear();
    navigate("/login");
    toast.info("로그아웃되었습니다.");
  });
  return <div>index</div>;
};

export default Logout;
