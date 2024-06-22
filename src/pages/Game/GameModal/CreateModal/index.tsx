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
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);
  const [title, setTitle] = useState("");

  useMount(() => {
    if (gameClient?.connected) {
      gameClient.subscribe("/user/queue/game/session", (message) => {
        const data = JSON.parse(message.body);
        if (data.host_id) {
          //생성하고 콜백함수
          onClose();
          navigate(`/wait/${data.host_id}`, {
            state: {
              host: `${data.host}`,
              host_id: `${data.host_id}`,
              players: data.players,
              ready_player: data.ready_player,
              max_player: data.max_player,
              problem_level: data.problem_level,
              timer_time: data.timer_time,
              title: data.title,
              chat_room_id: data.chat_room_id,
            },
          });
        }
      });
    }
  });
  const handleSubmit = () => {
    const message = {
      title: title || "알고리즘 대결할래?",
      difficulty: selectedDifficulty,
      timer: selectedNumber,
    };
    if (gameClient?.connected) {
      createGame(gameClient, message);
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
