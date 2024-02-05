"use client"

import { ModeToggle } from "./ui/toggle-mode"

export default function Nav(){
return (
    <header>
        <nav>
            <ul className= "flex items-center justify-between">
                <li>
                  <ModeToggle/>  
                </li>
            </ul>
        </nav>
    </header>
)
}