import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Dark Mode"
        >
            {
                theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )

            }
        </Button>
    )
}