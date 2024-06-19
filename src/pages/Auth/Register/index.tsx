import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import React, { useEffect, useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateCheckpassword,
} from "../utils";
import { saveTokens } from "../../../utils";
import { register } from "../../../api/Auth";
import { useMe, useTheme } from "../../../store/store";
import { useMount } from "react-use";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { reset } = useMe();
  useMount(() => {
    reset();
    localStorage.clear();
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_check: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    password_check: false,
  });
  const onBlur = (e: any) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: false,
    });
    setForm({
      ...form,
      [name]: value,
    });
  };
  //유효성 검사 -> 조건 충족 X ? 메시지 리턴
  const validatedName = validateName(form.name);
  const validatedEmail = validateEmail(form.email);
  const validatedPassword = validatePassword(form.password);
  const validatedCheckpassword = validateCheckpassword(
    form.password_check,
    form.password
  );

  const validatedForm =
    !validatedName &&
    !validatedEmail &&
    !validatedPassword &&
    !validatedCheckpassword;
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!validatedForm) {
      //유효성 검사 통과 - 회원가입진행
      alert("invalid form");
      return;
    }
    try {
      console.log(form);
      const registerData = {
        id: form.email,
        password: form.password,
        name: form.name,
      };

      const response = await register(registerData);
      if (response.status === 200) {
        const data = response.data;
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        console.error(err);
        const { msg } = err.response.data;
        alert(msg);
      }

      //임시로 alert로 해놓음
    }
  };
  return (
    <main
      className={`w-full h-[100vh] flex flex-col justify-center items-center  ${
        // theme === "dark"
        //   ? "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "
        //   : "bg-white text-secondary"
        "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white "
      } `}
    >
      <form
        className="w-[600px] h-[600px] gap-2 p-12 flex flex-col justify-center items-center drop-shadow-md rounded-md"
        onSubmit={onSubmit}
      >
        <h1 className=" text-[64px] font-semibold">Register</h1>

        <Input
          type="text"
          placeholder="Name"
          value={form?.name}
          onChange={onChange}
          onBlur={onBlur}
          name="name"
          size="large"
          errorText={touched.name && validatedName}
          border={false}
        />
        <Input
          type="email"
          placeholder="Email"
          value={form?.email}
          onChange={onChange}
          onBlur={onBlur}
          name="email"
          size="large"
          errorText={touched.email && validatedEmail}
          border={false}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form?.password}
          onChange={onChange}
          onBlur={onBlur}
          name="password"
          size="large"
          errorText={touched.password && validatedPassword}
          border={false}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={form?.password_check}
          onChange={onChange}
          onBlur={onBlur}
          name="password_check"
          size="large"
          errorText={touched.password_check && validatedCheckpassword}
          border={false}
        />
        <div className="mt-2 flex flex-col gap-2">
          <Button
            type="submit"
            size="medium_big_radius"
            color="secondary"
            textColor="primary_font"
            name="회원 가입"
          />
          <Button
            type="button"
            onClick={() => navigate("/login")}
            size="medium_big_radius"
            color="secondary_border"
            textColor="secondary_color_font"
            name="취소"
          />
        </div>
      </form>
    </main>
  );
};

export default Register;
