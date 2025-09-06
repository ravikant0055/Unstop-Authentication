import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import Banner from '../../assets/Illustration.svg'
import Google from '../../assets/google.svg'
import Facebook from '../../assets/fb.svg'
import { PiUserCircleFill } from "react-icons/pi";
import { IoMdMail } from "react-icons/io";
import { MdKey } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from 'react';
import { login } from '../../api';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

interface InputState {
  username: string,
  email: string,
  password: string
}

interface ErrorState {
  username?: string;
  email?: string;
  password?: string;
}

function RouteComponent() {
  const [inputs, setInputs] = useState<InputState>({
      username: "",
      email: "",
      password : "",
  })
  const [errors, setErrors] = useState<ErrorState>({});
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      navigate({ to: '/home' });
    }
  }, []);

  const handlChange = ( e:React.ChangeEvent<HTMLInputElement>) =>{
      setInputs({
          ...inputs,
          [e.target.name]: e.target.value
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: ErrorState = {};

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Please enter a valid email (e.g., example@gmail.com).";
    }

    // Password Validation
    if (inputs.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters e.g emilyspass.";
    }

    //Username Validation
    if (inputs.username.trim().toLowerCase() !== "emilys") {
      newErrors.username = "Only the username 'emilys' is allowed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
        const res = await login(inputs);
        if (res) {
          setErrors({});
          localStorage.setItem('auth', JSON.stringify(res));
          navigate({ to: '/home' }); 
        } 
      }
    catch (error) {
        alert("Invalid credentials or login failed.");
      }
}

  return (
    <div className="bg-[#F4F4F4] flex h-full">
      <div className="hidden md:flex justify-center w-[50%] h-full">
        <img src={Banner} className="w-[500px]" />
      </div>
      <div className="md:w-[50%] w-[100%] flex flex-col h-full md:p-13">
        <div className="bg-white flex flex-col gap-5 md:gap-4 py-6 px-7 rounded-2xl w-full h-full">
         
          <div className="flex flex-col gap-5 md:gap-3">
            <h1 className="flex flex-col text-[20px]">
              Welcome to<span className="font-extrabold text-[27px] text-[#6358DC]">Unstop</span>
            </h1>
            <button className="flex justify-center items-center gap-5 border border-[#dadada] shadow w-full py-2 rounded-md text-sm cursor-pointer hover:shadow-md">
              <img src={Google} /> Login with Google
            </button>
            <button className="flex justify-center items-center gap-5 pl-3 border border-[#dadada] shadow w-full py-2 rounded-md text-sm cursor-pointer hover:shadow-md">
              <img src={Facebook} /> Login with Facebook
            </button>
          </div>

          <div className="flex items-center w-full">
            <hr className="flex-grow border-[#BFBFBF]" />
            <span className="text-sm px-3 text-[#1C1B1F]">OR</span>
            <hr className="flex-grow border-[#BFBFBF]" />
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                <div className='flex flex-col w-full'>
                    <div className='bg-[#F4F4F4] flex gap-4 items-center w-full py-4 px-3 rounded-md'>
                        <PiUserCircleFill className='text-xl'/>
                        <input type='text' name='username' value={inputs.username} onChange={handlChange} placeholder='User name' className='w-full placeholder:text-[13px] outline-none bg-transparent leading-none'/>
                    </div>
                    <p className={`text-xs min-h-[1rem] ${errors.username ? "text-red-500" : "invisible"}`}>
                      {errors.username || "placeholder"}
                    </p>
                    <div className='bg-[#F4F4F4] flex gap-4 items-center w-full py-4 px-3 rounded-md'>
                        <IoMdMail className='text-xl'/>
                        <input type='email' name='email' value={inputs.email} onChange={handlChange} placeholder='Email' className='w-full placeholder:text-[13px] outline-none bg-transparent leading-none'/>
                    </div>
                    <p className={`text-xs min-h-[1rem] ${errors.email ? "text-red-500" : "invisible"}`}>
                      {errors.email || "placeholder"}
                    </p>
                    <div className='bg-[#F4F4F4] flex justify-between w-full py-4 px-3 rounded-md'>
                        <div className='flex gap-4'>
                            <MdKey className='text-xl'/>
                            <input type={visible ? "text" : "password"} name='password' value={inputs.password} onChange={handlChange} placeholder='Password' className='w-full placeholder:text-[13px] outline-none bg-transparent leading-none'/>
                        </div>
                        {visible ? 
                          <IoMdEye onClick={()=>setVisible(!visible)} className='text-xl cursor-pointer'/>
                          :
                          <IoMdEyeOff onClick={()=>setVisible(!visible)} className='text-xl cursor-pointer'/>
                         }
                        
                    </div>
                    <p className={`text-xs min-h-[1rem] ${errors.password ? "text-red-500" : "invisible"}`}>
                      {errors.password || "placeholder"}
                    </p>
                </div>
                <div className='flex w-full justify-between text-sm my-3 md:my-2'>
                    <label className='flex items-center gap-2'><input type='checkbox' className="appearance-none w-4 h-4 bg-[#E2E2E2] checked:appearance-auto rounded-sm"/>Remember me</label>
                    <Link to='/' className='text-[#6358DC]'>Forgot Password?</Link>
                </div>
                <button type='submit' className='bg-[#6358DC] my-3 md:my-2 text-sm text-white w-full py-4 rounded-md cursor-pointer hover:opacity-80'>Login</button>
                <h1 className='text-sm mt-1'>Don't have an account? <Link to='/' className='text-[#6358DC]'>Register</Link></h1>
          </form>

        </div>
      </div>
    </div>
  );
}
