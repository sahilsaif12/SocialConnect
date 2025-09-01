"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import { DashboardSearchCommand } from "./dashboard-search-command"


export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar()
    const [commandOpen, setCommandOpen] = useState(false)

     useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);
    
    return (
        <div className="fixed w-full bg-yellow-50 z-20   top-0">
            <DashboardSearchCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className=" backdrop-blur-2xl   flex px-4 gap-x-2 py-3 items-center border-b ">
                <Button className="size-9 cursor-pointer" variant="outline" onClick={toggleSidebar} >
                    {
                        (state === "collapsed" || isMobile) ?
                            <PanelLeftIcon className="size-5" />
                            : <PanelLeftCloseIcon className="size-5" />
                    }
                </Button>

                <Button
                    className="h-9 w-[240px] justify-start   font-normal text-muted-foreground hover:text-muted-foreground "
                    variant="outline"
                    size="sm"
                    onClick={() => setCommandOpen((open) => !open)}
                >
                    <SearchIcon />
                    Search
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-2 bg-muted rounded px-1.5 font-mono border text-[10px] font-medium text-muted-foreground ">
                        <span>&#8984;</span>  K
                    </kbd>
                </Button>
            </nav>
        </div>
    )
}