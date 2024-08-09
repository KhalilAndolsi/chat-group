"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export default function Rooms({ authorId }: { authorId: string }) {
  const pathname = usePathname()
  const [rooms, setRooms] = useState<any>([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [createPending, setCreatePending] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch("/api/room");
        const data = await response.json();
        if (!response.ok) {
          setIsError(true);
          return;
        }
        setRooms(data.rooms);
        setFilteredRooms(data.rooms);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    const channel = pusherClient.subscribe("rooms");

    const handleNewRoom = (data: any) => {
      setRooms((prev: any) => [data.newRoom, ...prev])
    };
    const handleDeleteRoom = (data: any) => {
      setRooms((prev: any) => prev.filter((r: any) => r._id !== data.room._id))
    };

    channel.bind("on-add-room", handleNewRoom);
    channel.bind("on-delete-room", handleDeleteRoom);
    
    return () => {
      channel.unbind("on-add-room", handleNewRoom);
      channel.bind("on-delete-room", handleDeleteRoom);
      pusherClient.unsubscribe("rooms");
    };
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setFilteredRooms((prev) =>
        prev.filter((r: any) => r.name.includes(search))
      );
    } else {
      setFilteredRooms(rooms);
    }
  }, [search, rooms]);

  const createNewRoom = async (e: any) => {
    e.preventDefault();
    try {
      setCreatePending(true);
      const response = await fetch("/api/room", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: newRoom, author: authorId }),
      });
      const data = await response.json();
      if (!response.ok) {
        return toast.warning(data.error || "Creation failed");
      }
      toast.success(data.message);
      setNewRoom("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreatePending(false);
    }
  };

  return (
    <>
      {/* ========= Rooms ========= */}
      <div className="p-2 border border-foreground rounded grow flex flex-col">
        <h3 className="font-medium">Rooms</h3>
        <Input
          type="text"
          placeholder="Search..."
          className="my-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="border border-foreground rounded overflow-hidden grow relative">
          {filteredRooms.length > 0 && (
            <div className="flex flex-col gap-2 p-2  absolute size-full overflow-y-auto">
              {filteredRooms.map((room: any, i: number) => (
                <Link
                  href={`/chat/${room._id}`}
                  key={i}
                  className="p-2 border border-foreground rounded bg-white dark:bg-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-500">
                  {room.name}
                </Link>
              ))}
            </div>
          )}
          {filteredRooms.length === 0 && !isPending && (
            <p className="text-sm h-full grid place-items-center bg-neutral-100 dark:bg-neutral-800">
              No Rooms Found!
            </p>
          )}
          {isPending && (
            <p className="text-sm h-full grid place-items-center bg-neutral-100 dark:bg-neutral-800">
              Loading...
            </p>
          )}
          {isError && (
            <p className="text-sm h-full grid place-items-center bg-neutral-100 dark:bg-neutral-800">
              Error fetching rooms!
            </p>
          )}
        </div>
      </div>
      {/* ========= Rooms ========= */}

      {/* ========= Create room ========= */}
      <div className="p-2 border border-foreground rounded">
        <h3 className="font-medium">Create Room</h3>
        <form className="flex items-center gap-2" onSubmit={createNewRoom}>
          <Input
            type="text"
            placeholder="Room name"
            className="my-2"
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <Button type="submit" disabled={createPending} className="w-[100px]">
            {createPending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </div>
      {/* ========= Create room ========= */}
    </>
  );
}
