import CompleteLogo from "../../assets/logo.svg";
import EyeSlash from "../../assets/eye-slash.svg";
import Eye from "../../assets/eye.svg";
import React, {useState} from "react";
import Close from "../../assets/close.svg";




const SignUpForm=({setPage})=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [delegation, setDelegation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        // Perform validation checks
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Create a new FormData instance to hold the form data
        const formData = new FormData();

        // Append form fields to the FormData instance
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('gouvernorat', governorate);
        formData.append('delegation', delegation);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('isServiceProvider', isServiceProvider);

        // If a profile image is selected, append it to the FormData
        if (profileImage) {
            // Assuming you have a file input ref or file object from state
            formData.append('profileImage', profileImage);
        }

        // Send the request to the server
        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                body: formData // Sending the FormData object as the request body
                // No headers included, as the fetch API automatically sets the Content-Type
                // to 'multipart/form-data' when dealing with FormData.
            });

            // Handle success or error based on response
            if (response.ok) {
                const data = await response.json();
                window.location.href = '/';
                // Handle further logic here, such as redirecting the user or showing a success message.
            }else if(response.status===409){
                throw new Error("this email is already registred")
            }
            else {
                console.log(response)
                throw new Error(response.statusMessage);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message || 'An error occurred during registration.');
        }
    };
    const handleServiceProviderChange = (event) => {
        setIsServiceProvider(event.target.checked);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    return(<div className="flex flex-col h-full ">
        <div className="flex flex-row items-center w-full mb-1">
            <img className="w-[3vw] h-12" src={CompleteLogo} alt='logo'/>
        </div>
        <div className="flex flex-col mt-8 items-center w-full pr-6 pb-10 h-[90%] overflow-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-hidden">
            <div>
                <h2 className="text-3xl font-bold text-[#263238] mt-4 mb-8 self-start">Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex-col">
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                        <label htmlFor="firstName" className="block mb-2 text-[#263238]">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="lastName" className="block mb-2 text-[#263238]">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

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
                </div>
                <div className="mb-6">

                    <label htmlFor="password" className="block text-[#263238]">
                        Confirm Password
                    </label>
                    <input
                        id="confirmpassword"
                        type={passwordVisible ? "text" : "password"}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />


                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                        <label htmlFor="governorate" className="block mb-2 text-[#263238]">Governorate</label>
                        <input
                            id="governorate"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your governorate"
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="delegation" className="block mb-2 text-[#263238]">Delegation</label>
                        <input
                            id="delegation"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your delegation"
                            value={delegation}
                            onChange={(e) => setDelegation(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='profile-image-upload-container'>
                    <div className="flex justify-between items-center mb-2 mt-2">
                        <label htmlFor="profileimg" className="block text-[#263238]">
                            Profile Image
                        </label>
                        {profileImage ?
                            <div>
                                <img src={Close}
                                     className={"w-[2vw] h-[1.2vw] mr-4 hover:cursor-pointer"}
                                     onClick={() => setProfileImage(null)} alt="close"/>
                            </div> : null
                        }

                    </div>
                    {profileImage ?
                        <div className="flex items-center justify-center">
                            <img src={profileImage} alt='Profile' className='profile-image'/>
                        </div>
                        : <input
                            id="profileimg"
                            type="text"
                            placeholder="Attach your image"
                            className="w-full p-3 border border-gray-300 rounded-md hover:cursor-pointer bg-transparent focus:outline-0 "
                            onChange={(e) => e.preventDefault()}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('formFile').click();
                            }}
                            readOnly={true}
                        />
                    }


                    <input
                        className="hidden"
                        type="file"
                        id="formFile"

                        onChange={handleImageChange}
                    />

                </div>
                <div className="mb-4 mt-6">
                    <label htmlFor="isServiceProvider" className="flex items-center text-[#263238]">
                        <input
                            id="isServiceProvider"
                            type="checkbox"
                            className="mr-2 w-4 h-4 "
                            checked={isServiceProvider}
                            onChange={handleServiceProviderChange}
                        />
                        Are You A Service Provider?
                    </label>
                </div>
                <div className=" text-red-500 w-full h-[4vh] mt-4">{errorMessage ?? null}</div>

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

        </div>
    </div>)
}
export default SignUpForm;