import React, { useState } from 'react'
import Input from '../../../components/Common/input/Input';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const REST_API_KEY = '백엔드한테 달라하자1';
    const REDIRECT_URI = '백엔드한테 달라하자2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const onClickSocialLogin = () => {
      window.location.href = link;
    };
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        "email" : "",
        "password":"",
    })
    const onChange = (e:any) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({
           ...form,
            [name]: value,
        });
    }
    const onSubmit = (e:any) => {
        e.preventDefault();
        console.log("onSubmit");
        console.log(form);
    }
  return (
    <form className="w-[520px] h-[480px] flex flex-col justify-center items-center shadow-2xl" onSubmit={onSubmit}>
    <h1 className="text-[#213363] text-3xl font-semibold">LOGIN</h1>
    
     
            <Input type = "email"
            placeholder = "이메일"
            value={form?.email}
            onChange={onChange}
            name="email"
            size="large"
            
            />
            <Input type = "password"
            placeholder = "비밀번호"
            value={form?.password}
            onChange={onChange}
            name="password"
            size="large"
          
            />
            <div className='w-[360px] h-[56px] flex justify-center'>
                <button type="button" onClick={onClickSocialLogin}>
                    TEST-카카오 소셜로그인
            </button>
            </div>
           <button type="submit">
                    로그인
            </button>
            <ul className='flex gap-2 text-[#213363] text-sm'>
                <li className='cursor-pointer'>아이디 찾기</li>
                <li>|</li>
                <li className='cursor-pointer'>비밀번호 찾기</li>
                <li>|</li>
                <li 
                className='font-semibold cursor-pointer'
                onClick={()=>navigate("/register")}>회원가입</li>
            </ul>
    
</form>
  )
}

export default Login;