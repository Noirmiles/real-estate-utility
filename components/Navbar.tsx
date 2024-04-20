"use client"
import React, { useState,useEffect} from "react";
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

import SearchBar from "@/components/searchBar"
import logo from '@/public/Logo_Zest.png'
import Image from 'next/image'
import * as AuthService from '@/app/services/auth.service';
import { IUser } from "@/app/types/user-types";
import Link from 'next/link';




export default function Nav() {
    const [isClick, setisClick] = useState(false);
    const [isSignInDropdownVisible, setIsSignInDropdownVisibile] = useState(false);
    const [currentUser,setCurrentUser]=useState<IUser | null>(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const toggleNavbar = () => {
        setisClick(!isClick)
    };

    const toogleSignInDropdown = () => {
        setIsSignInDropdownVisibile((prev) => !prev);
    };

        const logOut = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        AuthService.logout();
        setCurrentUser(null);
        window.location.href ='/';
    };

    
    const formStyle = {
        margin: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        fontFamily: '',
        display: 'flex',          // Enable flexbox
        alignItems: 'center',     // Center vertically


    };

    return (
        

        <nav className="bg">
            <div style={formStyle}>
                <div className="flex items-center h-16 p-4">
                    <a href="/" className="">
                        <Image
                            className=""
                            src={logo}
                            alt="slide_image"
                            style={{ width: '60px', height: 'auto' }}
                        />
                    </a>
                </div>
                <div className="hidden md:block">
                    <div className=" ml-4 flex  space-x-4 p-4 items-center">
                        <a href="/houses" className="text-black text-2xl hover:shadow-lg p-4 rounded-lg ">
                            Buy
                        </a>
                        <a href="/about" className="text-black text-2xl hover:shadow-lg p-4 hover:opacity-75  rounded-lg ">
                            About
                        </a>
                        <a href="/about-agents" className="text-black text-2xl hover:shadow-lg p-4 hover:opacity-75  rounded-lg ">
                            Our Agents
                        </a>
                        <a href="/" className="text-black text-2xl hover:shadow-lg p-4 hover:opacity-75  rounded-lg ">
                            Help
                        </a>
                        {currentUser ? (
                            <>
                                <a href="/portal" className="text-black text-2xl hover:shadow-lg p-4 rounded-lg">Profile</a>
                                <a href="/" onClick={logOut} className="text-black text-2xl hover:shadow-lg p-4 rounded-lg">Log Out</a>
                            </>
                        ) : (
                        <button onClick={toogleSignInDropdown} className=" text-black text-2xl hover:shadow-lg p-4 hover:opacity-75 rounded-lg">
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
                        )}
                        <ModeToggle />

                    </div>
                </div>

                <div className="md:hidden flex items-center">
                    <button className="shadow-lg drop-shadow-lg infinite-flex items-center justify-center p-2 rounded-md text-whiteS hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={toggleNavbar} >
                        {isClick ? (
                            <svg className="h-6 w-6"
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6"
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isClick && (<div className="md:hidden">
                <div style={formStyle}>

                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>

                    <a href="/houses" className="text-center text-black block hover:text-black rounded-lg p-2">
                        Buy
                    </a>
                    <a href="/" className="text-center text-black block hover:text-black rounded-lg p-2">
                        Services
                    </a>
                    <a href="/about" className="text-center text-black block hover:text-black rounded-lg p-2">
                        About
                    </a>
                    <a href="/about-agents" className="text-center text-black block hover:text-black rounded-lg p-2">
                        Our Agents
                    </a>
                    <a href="/agents" className="text-center text-black block hover:text-black rounded-lg p-2">
                        Agents
                    </a>
                    <a href="/" className="text-center text-black block  hover:text-black rounded-lg p-2">
                        Help
                    </a>
                    <a href="/sign-login" className="text-center text-black block  hover:text-black rounded-lg p-2">
                        Agent Login
                    </a>
                    {currentUser ? (
                        <>
                        <a href="/" className="text-center text-black block hover:text-black rounded-lg p-2">{currentUser.username}</a>
                        <a href="/" onClick={logOut} className="text-center text-black block hover:text-black rounded-lg p-2">Log Out</a>
                 </>
                    ):(
                        <a href="/sign-in" className="text-center text-black block hover:text-black rounded-lg p-2">Login</a> 
                    )}

                </div>
            </div>)}
        </nav>
    )
}