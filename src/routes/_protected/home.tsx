import { createFileRoute, useNavigate } from '@tanstack/react-router'
import userPicture from '../../assets/user.svg';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth") || "null");

  useEffect(() => {
    if (!authData) {
      navigate({ to: '/login' });
    }
  }, [authData]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate({ to: '/login' });
  }
  
  return (
    <div className='flex flex-col gap-20 justify-center items-center h-full'>
      <h1 className="flex flex-col items-center text-[28px]">
              Welcome to<span className="font-extrabold text-[32px] text-[#6358DC]">Unstop</span>
      </h1>
      <div className='bg-white flex flex-col gap-2 justify-center items-center px-16 py-8 border border-[#f0f0f0] shadow-2xl rounded-2xl'>
         <img src={authData.image || userPicture} className='w-[130px] border rounded-full border-[#bdbdbd]'/>
         <h1 className='text-[#6358DC] font-bold'>{authData.firstName || "Michael"} {authData.lastName || "Dam"} </h1>
         <p className='text-sm'>{authData.email || "example@gmail.com"}</p>
         <p className='text-sm'>{authData.gender || "female"} </p>
         <button onClick={handleLogout} className='bg-[#6358DC] px-10 py-3 mt-3 rounded-2xl text-sm  text-white cursor-pointer hover:opacity-80'>Logout</button>
      </div>
    </div>
  )
}
