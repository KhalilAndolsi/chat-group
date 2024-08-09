import { connectDB } from "@/lib/connectDB";
import pusher from "@/lib/pusher";
import Room from "@/models/Room";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, author } = await req.json();
    const roomExist = await Room.findOne({ name });
    if (roomExist) {
      return NextResponse.json(
        { error: "Room already exists" },
        { status: 400 }
      );
    }
    const newRoom = new Room({ name, author });
    await newRoom.save();
    await pusher.trigger("rooms", "on-add-room", { newRoom });
    return NextResponse.json(
      { message: "Room created successfully", room: newRoom, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find().sort({ createdAt: -1 });
    return NextResponse.json({ rooms, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
