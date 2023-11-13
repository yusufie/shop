
import connectDB from "@/utils/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  const { firstName, lastName, email, password, mailConfirmed, wishlist, role, contact, addresses  } = await request.json();
  await connectDB();
  await User.create({ firstName, lastName, email, password, mailConfirmed, wishlist, role, contact, addresses });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request:any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}