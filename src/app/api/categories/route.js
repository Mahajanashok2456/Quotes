import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

/**
 * GET /api/categories
 * Public endpoint to fetch all categories
 */
export async function GET() {
  try {
    await connectToDatabase();

    const categories = await Category.find({}).sort({ name: 1 });

    return NextResponse.json(
      { success: true, data: categories },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("API GET Error (Categories):", error);
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
