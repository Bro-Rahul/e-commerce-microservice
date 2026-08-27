"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeChanger() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-lg
        border
        border-border
        bg-card
        text-foreground
        transition-all
        duration-200
        hover:bg-muted
        hover:shadow-sm
      "
            aria-label="Toggle theme"
        >
            <Sun
                className="
          absolute
          h-5
          w-5
          rotate-0
          scale-100
          transition-all
          duration-300
          dark:-rotate-90
          dark:scale-0
        "
            />

            <Moon
                className="
          absolute
          h-5
          w-5
          rotate-90
          scale-0
          transition-all
          duration-300
          dark:rotate-0
          dark:scale-100
        "
            />
        </button>
    )
}