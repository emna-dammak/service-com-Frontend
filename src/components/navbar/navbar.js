// Navbar.js
import React, {useState} from 'react';
import Logo from '../../assets/completelogo.svg'
import {ReactComponent as Explore} from '../../assets/Explore.svg'
import {ReactComponent as Chat} from '../../assets/Chat.svg'
import {ReactComponent as Basket} from '../../assets/basket.svg'
import {ReactComponent as Arrow} from '../../assets/arrow.svg'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(1);
    return (
        <>
            <div className="w-[20vw] fixed  h-[100vh] bg-#4B4B4B33 z-50 flex flex-col font-public ">
                <div className="flex items-center justify-center w-full">
                    <img src={Logo} alt="logo" className="w-[20vw] mb-[10vh]"/>
                </div>
                <div className="ml-6 mr-6 pt-2 pb-2 pl-2 rounded-md mb-3 flex justify-between text-[#4B465C] hover:cursor-pointer"
                     style={{backgroundColor: isOpen === 1 ? "#63C474" : "", color: isOpen === 1 ? "white" : ""}}
                onClick={()=>setIsOpen(1)}>
                    <div className="flex items-center">
                        <Explore className="w-6 h-6"/>
                        <div className="ml-3 font-[500] mt-[1px]">Explore</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Arrow className="w-6 h-6"/>
                    </div>
                </div>
                <div className="ml-6 mr-6 pt-2 pb-2 pl-2 rounded-md mb-3 flex justify-between text-[#4B465C] hover:cursor-pointer"
                     style={{backgroundColor: isOpen === 2 ? "#63C474" : "", color: isOpen === 2 ? "white" : ""}}
                onClick={()=>setIsOpen(2)}>
                    <div className="flex items-center">
                        <Basket className="w-6 h-6"/>
                        <div className="ml-3 font-[500] mt-[1px]">Orders</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Arrow className="w-6 h-6"/>
                    </div>
                </div>
                <div className="ml-6 mr-6 pt-2 pb-2 pl-2 rounded-md mb-3 flex justify-between text-[#4B465C] hover:cursor-pointer"
                     style={{backgroundColor: isOpen === 3 ? "#63C474" : "", color: isOpen === 3 ? "white" : ""}}
                onClick={()=>setIsOpen(3)}>
                    <div className="flex items-center">
                        <Chat className="w-6 h-6"/>
                        <div className="ml-3 font-[500] mt-[1px]">Chats</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Arrow className="w-6 h-6"/>
                    </div>
                </div>


            </div>

        </>
    );
};

export default Navbar;