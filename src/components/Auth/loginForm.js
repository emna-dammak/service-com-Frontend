import CompleteLogo from "../../assets/logo.svg";
import EyeSlash from "../../assets/eye-slash.svg";
import Eye from "../../assets/eye.svg";
import React, {useState} from "react";
import Cookies from 'js-cookie';





const LoginForm=({setPage})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const body = JSON.stringify({
                email: email,
                password: password,
            });
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
                credentials: 'include', // Ensure cookies are included in the request
            });

            if (!response.ok) {
                setPassword('')
                setEmail('')
                if (response.status === 401) {
                    setErrorMessage("Wrong credentials. Please try again.");
                } else {
                    setErrorMessage(`Please Verify Your Internet Connections`);
                }
                return;
            }

            const data = await response.json();
            Cookies.set('jwtToken', data.access_token, { expires: 1, path: '/' });
            window.location.href="/"


        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Login failed:', error);

        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    return(<>
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
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-[#263238]">
                            Password
                        </label>
                        <div>
                            <img src={passwordVisible ? EyeSlash : Eye}
                                 className={"w-[2vw] h-[1.2vw] mr-4 hover:cursor-pointer"}
                                 onClick={togglePasswordVisibility} alt="password"/>
                        </div>
                    </div>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="text-right mt-2">
                        <a href="/public" className="text-sm text-[#80b38f] hover:underline"
                           style={{color: "#63C474"}}>
                            Forget the password?
                        </a>
                    </div>
                    <div className="mb-4 text-red-500 w-full h-[4vh] mt-4">{errorMessage ?? null}</div>

                </div>
                <div className="mb-4 mt-5">
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-[#84ca90]
                                        rounded-md hover:bg-green-600"

                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="mt-4 text-left">
                <a  className="text-sm text-[#80b38f]" style={{color: "#63C474"}}>
                    <span className="text-black hover:none">Are you new?</span> <span
                    className="hover:underline hover:cursor-pointer" onClick={()=>setPage(2)}>Create an account</span>
                </a>
            </div>
        </div>
    </>)
}
export default LoginForm;