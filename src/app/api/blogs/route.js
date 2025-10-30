import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

/**
 * GET /api/blogs
 * Public endpoint to fetch all published blogs
 */
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch only published blogs, sorted by publish date (newest first)
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishDate: -1, createdAt: -1 })
      .select("-__v"); // Exclude version key

    return NextResponse.json(
      { success: true, data: blogs },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("API GET Error (Blogs):", error);
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
