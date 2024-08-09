"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";

export default function RemoveRoom({ roomId }: any) {
  const [isPending, setIsPending] = useState(false);
  const handleDelte = async () => {
    try {
      setIsPending(true);
      const resposne = await fetch(`/api/room/${roomId}`, { method: "DELETE" });
      const data = await resposne.json();
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      title="delete this room"
      variant="ghost"
      disabled={isPending}
      className=" text-red-500 hover:bg-red-500 hover:text-white transition-all"
      onClick={handleDelte}>
      {!isPending && <Trash size={16} />}
      {isPending && <Loader size={16} className="animate-spin" />}
    </Button>
  );
}
