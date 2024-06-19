import React from "react";
import { useMount } from "react-use";
import { useMe } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { reset } = useMe();
  const navigate = useNavigate();
  useMount(() => {
    reset();
    localStorage.clear();
    navigate("/login");
  });
  return <div>index</div>;
};

export default Logout;
