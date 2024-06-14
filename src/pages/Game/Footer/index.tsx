import React from "react";
import { Button } from "../../../components/Common";
import PublishIcon from "@mui/icons-material/Publish";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerIcon from "@mui/icons-material/Timer";

const Footer = ({
  runCode,
  isLoading,
}: {
  runCode: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full h-[60px] flex gap-4 justify-end items-center pr-4">
      <div className="flex justify-start items-center gap-2 text-secondary text-xl">
        <TimerIcon />
        <span>59:59</span>
      </div>
      <Button
        type="button"
        size={"small_radius"}
        onClick={runCode}
        color="primary"
        textColor="secondary_color_font"
        name={"Run Code"}
        isLoading={isLoading}
        icon={<PlayArrowIcon />}
      />
      <Button
        type="button"
        size={"small_radius"}
        // onClick={runCode}
        color="primary"
        textColor="secondary_color_font"
        name={"submit"}
        isLoading={isLoading}
        icon={<PublishIcon />}
      />
    </div>
  );
};

export default Footer;