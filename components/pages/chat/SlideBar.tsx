"use client";
import React, { useState } from "react";
import Aside from "./Aside";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash, X } from "lucide-react";

export default function SlideBar({ session }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{ translate: isOpen ? "0 0" : "100% 0" }}
      className="h-dvh w-fit fixed z-[9999] right-0 top-0 lg:hidden bg-background p-2 flex flex-col gap-5 items-end shadow-xl transition-all">
      <button
      style={{opacity: isOpen ? "" : "80%"}}
        className="absolute left-0 top-1/2 bg-background -translate-x-full p-1 pl-2 rounded-l-full"
        onClick={() => setIsOpen(prev => !prev)}>
        <ArrowBigLeftDash size={35} />
      </button>
      <Button
        variant="outline"
        className="p-2 size-fit"
        onClick={() => setIsOpen(false)}>
        <X size={14} strokeWidth={3} />
      </Button>
      <Aside
        session={session}
        className="w-fit rounded flex flex-col gap-4 grow"
      />
    </div>
  );
}
