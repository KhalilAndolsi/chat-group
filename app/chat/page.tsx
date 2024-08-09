import React from "react";
import LoabyChatImage from "@/assets/images/Work chat-rafiki.svg";
import Image from "next/image";

export default function ChatPage() {
  return (
    <div className="flex items-center justify-center flex-col h-full ">
      <Image
        src={LoabyChatImage}
        width={450}
        height={450}
        alt="chat-image"
        className="w-[350px]"
      />
      <h4 className="text-lg font-bold">Welcome to ChatGroup</h4>
      <p className="text-sm">you can start chat if you join to any room</p>
    </div>
  );
}
