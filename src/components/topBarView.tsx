// /components/sideBarView.tsx

import { Menu, Settings } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";

export function TopBarView() {
    return (
        <div className="w-screen h-min-16 flex justify-between items-center px-6 sticky top-0">
            {/* <!-- TopBar Component --> */}

            {/* <!-- Menu Icon --> */}
            <button aria-label="Menu">
                <Menu />
            </button>

            {/* <!-- Circle Logo --> */}
            <Logo size="sm" variant="text-only" />

            {/* <!-- Right: Settings --> */}

            <button aria-label="Settings">
                <Settings className="w-6 h-6" />
            </button>


        </div>
    )
}