"use client";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./ui/toggle-mode";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import logo from "@/public/Logo_Zest.png";
import Image from "next/image";
import * as AuthService from "@/app/services/auth.service";
import { IUser } from "@/app/types/user-types";

import background from "@/cityscape.jpg";

export default function Nav() {
  const [isClick, setisClick] = useState(false);
  const [isSignInDropdownVisible, setIsSignInDropdownVisibile] =
    useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const toogleSignInDropdown = () => {
    setIsSignInDropdownVisibile((prev) => !prev);
  };

  const logOut = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    AuthService.logout();
    setCurrentUser(null);
    window.location.href = "/";
  };
  const formStyle = {
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "",
  };

  return (
    <nav className="navbar-container z-50">
      <div className="w-full" style={formStyle}>
        <div className="flex items-center justify-center">
          <div className=" ml-4 flex  space-x-4 justify-center items-center">
            <a
              href="/houses"
              className="text-black text-xl hover:drop-shadow-lg p-4 rounded-lg "
            >
              Buy
            </a>
            <a
              href="/about"
              className="text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75  rounded-lg "
            >
              About
            </a>
            <a href="/" className="">
              <Image
                className=""
                src={logo}
                alt="Zest Logo"
                style={{ width: "60px", height: "auto" }}
              />
            </a>
            <a
              href="/about-agents"
              className="text-black text-xl hover:drop-shadow-lg p-4 hover:opacity-75  rounded-lg "
            >
              Agents
            </a>

            {currentUser ? (
              <>
                <a
                  href="/portal"
                  className="text-black text-2xl hover:shadow-lg  rounded-lg"
                >
                  Profile
                </a>
                <a
                  href="/"
                  onClick={logOut}
                  className="text-black text-2xl hover:shadow-lg rounded-lg"
                >
                  Log Out
                </a>
              </>
            ) : (
              <button onClick={toogleSignInDropdown} className=" text-black text-xl hover:drop-shadow-lg rounded-lg">
                <DropdownMenu>
                  <DropdownMenuTrigger>Sign in</DropdownMenuTrigger>


                  {isSignInDropdownVisible && (
                    <DropdownMenuContent>

                      <div className="fixed ring-0 bg-white flex flex-col items-center justify-center ">
                        {" "}
                        {/* Added overflow and box-sizing */}
                        <DropdownMenuItem>

                          <div className="px-3 py-1 text-md" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
                            <a href="/sign-in" className="text-md text-black " role="menuitem">
                              Client
                            </a>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <div className="px-3 py-1 text-md">
                            <a href="/agent-login" className="text-md text-black " role="menuitem">
                              Agent
                            </a>
                          </div>
                        </DropdownMenuItem>

                      </div>


                    </DropdownMenuContent>

                  )}
                </DropdownMenu>
              </button>
            )}
            {/*<div className="flex"> <ModeToggle /></div>*/}
          </div>
        </div>
      </div>
    </nav >
  );
}
