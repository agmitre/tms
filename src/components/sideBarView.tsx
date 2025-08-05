// /components/sideBarView.tsx

import { Menu, Settings } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";

export function SideBarView() {
    return (
        <div className="h-screen w-min-16 flex flex-col justify-between items-center py-4 sticky top-0">
            {/* <!-- Sidebar Component --> */}


            {/* <!-- Top Section: Menu + Logo --> */}
            <div className="flex flex-col items-center space-y-4">
                {/* <!-- Circle Logo --> */}
                <Logo size="md" variant="icon-only" />
                {/* <!-- Menu Icon --> */}
                <button aria-label="Menu">
                    <Menu />
                </button>
            </div>

            {/* <!-- Bottom Section: Settings --> */}
            <div className="flex flex-col items-center gap-4 pb-2">
                <DarkModeToggle />
                <button aria-label="Settings" className="cursor-pointer ">
                    <Settings className="w-6 h-6" />
                </button>
            </div>

        </div>
    )
}