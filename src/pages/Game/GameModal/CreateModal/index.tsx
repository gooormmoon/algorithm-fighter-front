import React, { useState } from "react";
import useInputChange from "../../../../hooks/useInputChange";
import {
  RadioButton,
  Dropdown,
  Modal,
  Button,
  Input,
} from "../../../../components/Common/";
import { useStomp } from "../../../../store/store";
import { useMount } from "react-use";
import { createGame } from "../../../../api/Game";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const numberOptions = [10, 20, 30, 40, 50, 60];
const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  // onSubmit,
}) => {
  const { gameClient } = useStomp();
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<number>(
    numberOptions[0]
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("1");
  const [title, setTitle] = useState("");

  useMount(() => {
    if (gameClient?.connected) {
      gameClient.unsubscribe("createModal");
      gameClient.subscribe(
        "/user/queue/game/join",
        (message) => {
          const data = JSON.parse(message.body);
          if (data.host_id) {
            //생성하고 콜백함수
            onClose();
            console.log("modal close");
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
          }
          if (data.msg) {
            toast.info(data.msg);
          }
        },
        { id: "createModal" }
      );
    }
  });
  const handleSubmit = () => {
    const message = {
      title: title || "알고리즘 대결할래?",
      level: selectedDifficulty,
      timer_time: selectedNumber * 60,
    };
    if (gameClient?.connected) {
      createGame(gameClient, message);
    } else {
      toast.error("게임 클라이언트와 연결되지 않았습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-6 flex flex-col item-center">
        <span className="text-lg text-[#213363] font-semibold">방 제목</span>
        <Input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="입력하세요"
          size="small"
          disabled={false}
          border={true}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <span className="text-lg text-[#213363] font-semibold mt-6 flex item-center">
          난이도 설정
        </span>
        <RadioButton
          selectedValue={selectedDifficulty}
          onChange={(value) => setSelectedDifficulty(value)}
        />
      </div>
      <div className="mt-6 flex flex-col gap-2 item-center">
        <span className="text-lg text-[#213363] font-semibold">
          타이머 설정
        </span>
        <Dropdown
          color={"text-secondary"}
          options={numberOptions}
          selectedValue={selectedNumber}
          onChange={(value) => setSelectedNumber(value)}
          showMinutes={true}
        />
      </div>

      <div className="mt-9 flex justify-center">
        <Button
          type="submit"
          size="medium_big_radius"
          color="primary"
          textColor="secondary_font"
          name="게임 시작!"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateModal;
