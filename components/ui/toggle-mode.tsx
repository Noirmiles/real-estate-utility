"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

    // Determine which icon to display based on current theme
    const currentIcon = theme === "light" ? <Moon /> : <Sun />;

    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    };
  return (
       <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="absolute h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

  )
}
