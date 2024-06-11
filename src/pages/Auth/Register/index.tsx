import { useNavigate } from "react-router-dom";
import Button from "../../../components/Common/button/Button";
import Input from "../../../components/Common/input/Input";
import React, { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateCheckpassword,
} from "../utils";

const Register = () => {
  const navigate = useNavigate();
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
  const onSubmit = (e: any) => {
    e.preventDefault();

    if (validatedForm) {
      //유효성 검사 통과 - 회원가입진행
      console.log("onSubmit");
      console.log(form);
    } else {
      //유효성 검사 실패 - 메시지 리턴
    }
  };
  return (
    <form
      className="w-[520px] h-[520px] flex flex-col justify-center items-center shadow-2xl"
      onSubmit={onSubmit}
    >
      <h1 className="text-[#213363] text-3xl font-semibold">REGISTER</h1>

      <Input
        type="text"
        placeholder="이름"
        value={form?.name}
        onChange={onChange}
        onBlur={onBlur}
        name="name"
        size="large"
        errorText={touched.name && validatedName}
      />
      <Input
        type="email"
        placeholder="이메일"
        value={form?.email}
        onChange={onChange}
        onBlur={onBlur}
        name="email"
        size="large"
        errorText={touched.email && validatedEmail}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={form?.password}
        onChange={onChange}
        onBlur={onBlur}
        name="password"
        size="large"
        errorText={touched.password && validatedPassword}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={form?.password_check}
        onChange={onChange}
        onBlur={onBlur}
        name="password_check"
        size="large"
        errorText={touched.password_check && validatedCheckpassword}
      />
      <div className="flex flex-col">
        <button type="submit">회원가입</button>
        <button type="button" onClick={() => navigate("/login")}>
          취소
        </button>
      </div>
    </form>
  );
};

export default Register;
