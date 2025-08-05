import { useTheme } from "next-themes";

interface LogoProps {
    variant?: 'icon-only' | 'text-only' | 'icon-text';
    size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'icon-text', size = 'md' }: LogoProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    let source = ""

    if (variant === 'icon-only') {
        source = isDark ? "/Taskel_icon_color_white.svg" : "/Taskel_icon_color.svg"
    } else if (variant === 'text-only') {
        source = isDark ? "/Taskel_text_color.svg" : "/Taskel_text_color.svg"
    }

    const logoSize = size === "sm" ? "h-8" : size === "md" ? "h-12" : "h-18";
    return (
        <img
            src={source}
            alt="App Logo"
            className={`${logoSize} w-auto`}
        />
    )
}