/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SignupInput } from '@100xdevs/medium-common';
import  { type ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {BACKEND_URL} from "../config"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Auth = ({type}:{type:"signup"| "signin"}) => {
    const navigate = useNavigate();
      const [loading, setLoading] = useState(false); 


    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    });
  async function sendRequest() {
    setLoading(true); 
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const jwt = response.data.token;
      localStorage.setItem('token', jwt);

      const data = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: jwt,
        },
      });

      const user = data.data.user;
      localStorage.setItem('userdata', JSON.stringify(user));

      toast.success(`${type === 'signup' ? 'Signup' : 'Signin'} successful!`, {
        position: 'top-center',
        className: 'toast-black-white',
        autoClose: 2000,
      });

      setTimeout(() => navigate('/blogs'), 1500);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage, {
        position: 'top-center',
        className: 'toast-black-white',
        autoClose: 3000,
      });
    } finally {
      setLoading(false); 
    }
  }
      

   return (
    <>
        <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
        />
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div>
            <div className='p-5'>
        <div className='text-3xl  font-bold text-center'>
            {type === "signin" ? "Login" : "Create an Account"}
        </div>
        <div className='text-slate-500 mt-3'>
            {type === "signin"?"Don't have an Account?": "Already have an Account"}
            <Link className='pl-2 underline' to={type==="signin"?"/signup":"/signin"}>
            {type==="signin"?"Sign Up":"Sign In"}
            </Link>
        </div>
        </div>
        <div className=''>
   {type=== "signup" ?  <LabelledInput label='Name' placeholder="john" onChange={(e)=>{
        setPostInputs(c=>({
            ...c,
            name:e.target.value
        }))
    }} /> : null}
    <LabelledInput label='Username' placeholder="john@gmail.com" onChange={(e)=>{
        setPostInputs(c=>({
            ...c,
            username:e.target.value
        }))
    }} />
    <LabelledInput label='password' type={"password"} placeholder="john@123" onChange={(e)=>{
        setPostInputs(c=>({
            ...c,
            password:e.target.value
        }))
    }} />

            <button
                type="button"
                onClick={sendRequest}
                disabled={loading} 
                className={`text-white w-full mt-9 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300'
                }`}
              >
                {loading
                  ? type === 'signup'
                    ? 'Signing up...'
                    : 'Signing in...'
                  : type === 'signup'
                  ? 'Signup'
                  : 'Signin'}
              </button>
    </div>
    </div>
    </div>
    </div>
</>
  )
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}