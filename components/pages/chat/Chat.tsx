"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export default function Chat({ session, room, roomMessages }: any) {
  const router = useRouter();
  const [messages, setMessages] = useState<any>(roomMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const chatRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const channel = pusherClient.subscribe(room._id);

    const handleNewMessage = (data: any) => {
      // console.log("Received new message:", data);
      setMessages((prev: any) => [...prev, data]);
    };

    channel.bind("on-send-message", handleNewMessage);
    channel.bind("on-delete-chat", (data: any) => {
      router.replace("/chat");
      router.refresh();
    });

    return () => {
      channel.unbind("on-send-message", handleNewMessage);
      channel.bind("on-delete-chat", (data: any) => {
        router.replace("/chat");
        router.refresh();
      });
      pusherClient.unsubscribe(room._id);
    };
  }, [room]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const response = await fetch("/api/room/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: room._id,
          message: newMessage,
          author: session.user.id,
        }),
      });
      if (response.ok) {
        setNewMessage("");
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <section className="grow flex flex-col gap-2">
      <hr />
      <div className="grow relative overflow-hidden rounded">
        {/* ================= Chat ================= */}
        <div
          ref={chatRef}
          className="absolute size-full left-0 top-0 p-2 overflow-hidden overflow-y-auto without-scrollbar flex flex-col gap-4">
          {messages?.length > 0 &&
            messages.map((message: any, i: any) => (
              <div
                key={i}
                className="flex flex-col"
                style={{
                  alignItems:
                    message.author._id === session.user.id ? "end" : "start",
                }}>
                <p className="p-2 rounded border border-foreground w-fit max-w[90%]">
                  {message.message}
                </p>
                <h6 className="text-xs font-medium px-1">
                  {message.author._id === session.user.id
                    ? "you"
                    : message.author.name}
                </h6>
              </div>
            ))}
        </div>
        {/* ================= Chat ================= */}
      </div>
      <hr />
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Message"
          ref={inputRef}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type="submit" className="w-[60px]" disabled={isPending}>
          {isPending && <Loader size={16} className="animate-spin" />}
          {!isPending && <Send size={16} />}
        </Button>
      </form>
    </section>
  );
}
