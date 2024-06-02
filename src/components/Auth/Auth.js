import React, { useState } from 'react';
import LoginGif from "../../assets/login.gif"
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";


const AuthPage = () => {
    const [page,setPage]=useState(1)

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-[#cce7d4] font-public">
            <div className="flex h-[90%] w-[80%] rounded-2xl" style={{backgroundColor: "#e6feed"}}>
                <div className="w-1/2 bg-cover flex flex-col justify-start items-center mt-[10vh]">

                    <img src={LoginGif} alt='login' className="w-[60%]  object-cover rounded-l-2xl"/>

                    <div className="w-[65%]">
                    <h2 className="text-3xl font-bold text-[#263238] tracking-widest ">Welcome To ServiCom</h2>
                    <p className="text-[#263238] tracking-wider text-justify mt-2 w-[90%]">The best  Tunisian platform for connecting service providers  to customers at low cost. <br/></p>
                    </div>

                </div>
                <div className="flex flex-col w-1/2 bg-[#fafffb] p-12 rounded-r-2xl">
                    {page===1?<LoginForm setPage={setPage}></LoginForm>:page===2?<SignUpForm></SignUpForm>:null}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
