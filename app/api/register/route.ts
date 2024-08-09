import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: any) {
  try {
    await connectDB();
    const data = await req.json();
    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 500 }
      );
    }
    if (data.password) {
      const salts = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salts);
      const newUser = new User({ ...data, password: hashedPassword });
      await newUser.save();
      return NextResponse.json(
        { newUser, message: "Account created successfully", success: true },
        { status: 201 }
      );
    }
    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json(
      { newUser, message: "Created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
