import connectToDatabase from "@/lib/mongodb";
import Quote from "@/models/Quote";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Connect (Note: We only need the connection for Mongoose to work)
    await connectToDatabase();

    // 2. Fetch data sorted: pinned first, then newest first
    // Only select necessary fields to reduce data transfer
    const quotes = await Quote.find({})
      .select(
        "_id text author font_family font_color likes is_pinned created_at"
      )
      .sort({ is_pinned: -1, created_at: -1 })
      .lean();

    // 3. Return the data in the expected format
    return NextResponse.json({ success: true, data: quotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
