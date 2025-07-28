interface LogoProps {
    variant?: 'icon-only' | 'text-only' | 'icon-text';
    size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'icon-text', size = 'md' }: LogoProps) {
    const logoSize = size === "sm" ? "h-8" : size === "md" ? "h-12" : "h-18";
    return (
        <>
            {variant === 'icon-only' && (
                <img
                    src="/tms-2.svg"
                    alt="App Logo"
                    className={`${logoSize} w-auto`}
                />
            )}
            {variant === 'text-only' && (
                <div className="font-zain font-black flex flex-col gap-y-[-10px]">
                    <div className={`text-${size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'base'}`}>Task</div>
                    <div className={`text-${size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'base'}`}>Manager</div>
                </div>
            )}
            {variant === 'icon-text' && (
                <div className="flex gap-4 min-w-[150px]">
                    <img
                        src="/tms-2.svg"
                        alt="App Logo"
                        className={`${logoSize} w-auto`}
                    />
                    <div className={`font-zain font-black flex flex-col gap-y-[-10px] text-${size === 'sm' ? 'sm' : size === 'md' ? 'md' : '2xl'}`}>
                        <div>Task</div>
                        <div>Manager</div>
                    </div>
                </div >
            )
            }
        </>
    )
}