"use client"
import React, { useState } from "react";
import { ModeToggle } from "./ui/toggle-mode"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import logo from '@/public/Logo_Zest.png'
import Image from 'next/image'

import background from '@/cityscape.jpg'




export default function Nav() {
    const [isClick, setisClick] = useState(false);
    const [isSignInDropdownVisible, setIsSignInDropdownVisibile] = useState(false);


    const toogleSignInDropdown = () => {
        setIsSignInDropdownVisibile((prev) => !prev);
    };

    const formStyle = {
        margin: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: '',
    };


    return (


        <nav className="navbar-container ">
            <div className="p-1" style={formStyle}>
                <div className="flex items-center justify-center">
                    <a href="/" className="">
                        <Image
                            className=""
                            src={logo}
                            alt="Zest Logo"
                            style={{ width: '60px', height: 'auto' }}
                        />
                    </a>
                        <div className=" ml-4 flex  space-x-4 justify-center items-center">
                            <a href="/houses" className="text-black text-xl hover:drop-shadow-lg p-4 rounded-lg ">
                                Buy
                            </a>
                            <a href="/about" className="text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75  rounded-lg ">
                                About
                            </a>
                            <a href="/about-agents" className="text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75  rounded-lg ">
                                Our Agents
                            </a>
                            <a href="/" className="text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75  rounded-lg ">
                                Help
                            </a>
                            <button onClick={toogleSignInDropdown} className=" text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75 rounded-lg">
                                Sign in

                                {isSignInDropdownVisible && (
                                    <div className="aboslute left-0 right-0 z-0 w-25 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
                                            <a href="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                Client Login
                                            </a>
                                            <a href="/agent-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                Agent Login
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </button>
                            <div className="flex">
                                <ModeToggle />
                            </div>

                        </div>
                    </div>
                </div>
        </nav>
    )
    }
