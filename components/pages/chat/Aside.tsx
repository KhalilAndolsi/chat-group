import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccountSettingsPopUp from "./AccountSettingsPopUp";
import Rooms from "./Rooms";

export default function Aside({ session, className }: any) {
  return (
    <aside className={className}>
      {/* ========= Profile Header ========= */}
      <div className="p-2 flex items-center gap-2 border border-foreground rounded">
        <Avatar>
          {session?.user?.image && (
            <AvatarImage src={session?.user?.image} alt="pfp" />
          )}
          <AvatarFallback className="border border-foreground">
            {session?.user?.name?.toUpperCase()[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grow flex gap-3 justify-between">
          <div className="leading-none grow">
            <p className="block font-semibold">{session?.user?.name}</p>
            <p className="text-sm max-w-[200px] truncate">
              {session?.user?.email}
            </p>
          </div>
          <AccountSettingsPopUp />
        </div>
      </div>
      {/* ========= Profile Header ========= */}
      <Rooms authorId={session.user.id} />
    </aside>
  );
}
