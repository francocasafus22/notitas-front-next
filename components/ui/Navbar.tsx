"use client"

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";
import { logout } from "@/src/services/auth.service";
import Image from "next/image";

export default function Navbar({user} : {user: any}) {

    const location = usePathname()    
    const router = useRouter()
    const isActive = (path: string) => {
        if (location === path) {
            return "bg-primary text-primary-foreground"
        }
    }

    return (
        <nav className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
                <Logo/>
            </div>
            
        </div>
        <ul className="hidden md:flex md:gap-1">
            <Link
            href={"/"}
            className={`hover:bg-primary py-2 px-5 rounded-xl hover:text-primary-foreground cursor-pointer transition-colors duration-200 ${isActive("/")}`}
            >
            Home
            </Link>
            <Link
            href={"/explore"}
            className={`hover:bg-primary py-2 px-5 rounded-xl hover:text-primary-foreground cursor-pointer transition-colors duration-200 ${isActive("/explore")}`}
            >
            Explore
            </Link>
        </ul>

        {user ? (
            <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Image
                alt={`${user?.username || "Notitas User"} profile image`}
                width={500}
                height={500}                                
                src={
                    user.image ||
                    "/logo-placeholder-white.jpg"
                }
                className="w-12 rounded-full cursor-pointer hover:shadow-2xl transition-all duration-300"
                ></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                <Link href={`/`} className="w-full">
                    Home
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href={`/explore`} className="w-full">
                    Explore
                </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <Link  href={`/${user.username}`} className="w-full">
                    Profile
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link  href={`/settings`} className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <button
                    onClick={async () => {
                    await logout();
                    router.refresh()
                    }}
                    className="cursor-pointer w-full text-start"
                >
                    Log out
                </button>
                </DropdownMenuItem>            
                <div className="flex justify-center py-2">
                    <ModeToggle/>
                </div>
            </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Button
            onClick={() => router.push("/auth/login")}
            className={"hover:shadow-xl cursor-pointer"}
            >
            Log in
            </Button>
        )}
        </nav>
    )
}
