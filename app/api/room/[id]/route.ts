import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Room from "@/models/Room";
import Message from "@/models/Message";
import pusher from "@/lib/pusher";

export async function GET(req: any, { params }: any) {
  try {
    await connectDB();
    const room = await Room.findById(params.id)
      .populate({
        path: "author",
        select: ["name", "image"],
      })
      .populate({
        path: "messages",
        populate: {
          path: "author",
          select: ["name", "image"],
        },
      });

    return NextResponse.json({ room, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  try {
    await connectDB();
    const room = await Room.findById(params.id);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    await Message.deleteMany({ roomId: params.id });
    await Room.findByIdAndDelete(params.id)
    await pusher.trigger(params.id, "on-delete-chat", { deleted: true });
    await pusher.trigger("rooms", "on-delete-room", { room });
    return NextResponse.json({message: "Room deleted successfully"}, {status: 200});
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
