"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Home, LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AccountSettingsPopUp() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99999999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">Profile<User size={16} /></DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">Home<Home size={16} /></DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">Settings<Settings size={16} /></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between" onClick={() => signOut({callbackUrl: "/signin"})}>Sign Out<LogOut size={16} /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
