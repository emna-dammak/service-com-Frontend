import React, { useState } from 'react';
import CompleteLogo from "../../assets/logo.svg"
import LoginGif from "../../assets/login.gif"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle your login logic here
        console.log('Login Info', { email, password });
    };

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
                    <div className="flex flex-row items-center w-full">
                        <img className="w-[3vw] h-12" src={CompleteLogo} alt='logo'/>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <h2 className="text-3xl font-bold text-[#263238] mb-8 self-start">Login Into Your Account</h2>
                        <form onSubmit={handleSubmit} className="w-full flex-col">
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-[#263238]">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-[#263238]">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="text-right mt-2">
                                    <a href="#" className="text-sm text-[#80b38f] hover:underline"
                                       style={{color: "#63C474"}}>
                                        Forget the password?
                                    </a>
                                </div>
                            </div>
                            <div className="mb-4 mt-10">
                                <button
                                    type="submit"
                                    className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-700"
                                    style={{backgroundColor: "#84ca90"}}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-left">
                            <a href="#" className="text-sm text-[#80b38f]" style={{color: "#63C474"}}>
                                <span className="text-black hover:none">Are you new?</span> <span
                                className="hover:underline">Create an account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
