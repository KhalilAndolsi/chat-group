import { connectDB } from "@/lib/connectDB";
import Message from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";
import pusher from "@/lib/pusher";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { room, message, author } = await req.json();
    const newMessage = new Message({ roomId: room, message, author });
    await newMessage.save();
    const authorData = await User.findById(author)
    await pusher.trigger(room, "on-send-message", {
      message,
      author: authorData,
    });
    return NextResponse.json({
      message: "Message saved",
      success: true,
      newMessage,
    });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
