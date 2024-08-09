import Chat from "@/components/pages/chat/Chat";
import RemoveRoom from "@/components/system/RemoveRoom";
import { authOptions } from "@/lib/authOptions ";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

const getRoomData: any = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/room/${id}`);
    if (!response.ok) {
      notFound();
    } else {
      const { room } = await response.json();
      return room;
    }
  } catch (error: any) {
    // throw new Error(error.message);
    notFound();
  }
};

export const generateMetadata = async ({ params: { id } }: any) => {
  const room = await getRoomData(id);
  return {
    title: room.name,
  };
};

export default async function RoomPage({ params: { id } }: any) {
  const session: any = await getServerSession(authOptions);
  const room = await getRoomData(id);
  return (
    <main className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-xl font-medium">{room.name}</h3>
        {session.user.id === room.author._id && (
          <RemoveRoom roomId={room._id} />
        )}
      </div>
      <Chat session={session} room={room} roomMessages={room.messages} />
    </main>
  );
}
