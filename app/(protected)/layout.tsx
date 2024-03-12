"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/auth/logout-button";
import NavBar from "@/app/(protected)/_componenets/NavBar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const font = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const callBackURL = searchParams.get("callBackUrl");
  return (
    <main
      className={cn(
        "flex h-screen flex-col items-center justify-center space-y-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",
        font.className,
      )}
    >
      <NavBar className="flex justify-between ">
        <div className="space-x-3">
          <Button
            asChild
            variant={pathName === "/settings" ? "default" : "unSelected"}
          >
            <Link href={"/settings"}>Settings</Link>
          </Button>
          <Button
            asChild
            variant={pathName === "/server" ? "default" : "unSelected"}
          >
            <Link href={"/server"}>Server</Link>
          </Button>
          <Button
            asChild
            variant={pathName === "/client" ? "default" : "unSelected"}
          >
            <Link href={"/client"}>Client</Link>
          </Button>
          <Button
            asChild
            variant={pathName === "/admin" ? "default" : "unSelected"}
          >
            <Link href={"/admin"}>Admin</Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="rounded-full bg-sky-400 text-slate-900">
                <FaUser />
              </AvatarFallback>
              <AvatarImage src={user?.image || undefined} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LogoutButton>
                <div className="ms-1 flex items-center justify-start space-x-2 text-stone-900">
                  <ExitIcon />
                  <p>logout</p>
                </div>
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavBar>
      {children}
    </main>
  );
}
