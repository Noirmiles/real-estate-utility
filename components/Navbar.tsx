"use client"
import React, {useState} from "react";
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


export default function Nav(){
    const [isClick, setisClick] = useState(false);
    const [isSignInDropdownVisible, setIsSignInDropdownVisibile] = useState(false);


    const toggleNavbar = () =>{
        setisClick(!isClick)
    };
    
    const toogleSignInDropdown = () => {
        setIsSignInDropdownVisibile( (prev) => !prev);
    };

return (
    
    <nav className="bg">
        <div className="max-m-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white text-xl font-bold text-center ">
                            Project Z: Real Estate
                        </a>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center space-x-4">
                        <a href="/houses" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                            Buy
                        </a>
                        <a href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                            Services
                        </a>
                        <a href="/about" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                            About
                        </a>
                        <a href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                            Help
                        </a>
                        <button onClick={toogleSignInDropdown} className="relative text-white hover:bg-white hover:text-black rounded-lg p-2">
                            Sign in

            {isSignInDropdownVisible && (
             <div className="aboslute left-0 right-0 z-0 w-25 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                <ModeToggle/>
                
                </div>
                </div>
                
                <div className="md:hidden flex items-center">
                    <button className="infinite-flex items-center justify-center p-2 rounded-md text-whiteS hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                        ): (
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
        </div>
        {isClick && ( <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
                        <a href="/houses" className="text-center text-white block hover:bg-white hover:text-black rounded-lg p-2">
                            Buy
                        </a>
                        <a href="/" className="text-center text-white block hover:bg-white hover:text-black rounded-lg p-2">
                            Services
                        </a>
                        <a href="/about" className="text-center text-white block hover:bg-white hover:text-black rounded-lg p-2">
                            About Us
                        </a>
                        <a href="/" className="text-center text-white block hover:bg-white hover:text-black rounded-lg p-2">
                            Help
                        </a>
                        <a href="/sign-in" className="text-center text-white block hover:bg-white hover:text-black rounded-lg p-2">
                            Sign-in
                        </a>
                                   
        </div>)}
    </nav>
)
}