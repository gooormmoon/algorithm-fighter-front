import React, { useState, useEffect } from "react";
import ProfileIcon from "../../Common/ProfileIcon";
import { GameMessage } from "..";
import { getUser } from "../../../api/Users";

const ChatMessage = ({ message }: { message: GameMessage }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  useEffect(() => {
    getUser(message.sender_id).then((response) => {
      setUserName(response.data.nickname);
      setProfileImageUrl(response.data.profile_image_url);
    });
  }, [message.sender_id]);
  return (
    <div className={`text-primary flex justify-start gap-1 items-center`}>
      <div
        className={`w-[92px] flex justify-center items-center p-1 rounded gap-1`}
      >
        {profileImageUrl && <ProfileIcon size='small' src={profileImageUrl} />}
        <span className=''>{userName}</span>
        <span>:</span>
      </div>
      <span className=''>{message.content}</span>
    </div>
  );
};

export default ChatMessage;
