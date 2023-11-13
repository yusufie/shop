import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET() {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ products });
}