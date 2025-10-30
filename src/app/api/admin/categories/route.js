import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
};

// Utility function to convert name to slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .slice(0, 50); // Trim to max length
};

// GET: Fetch all categories
export async function GET() {
  try {
    await connectToDatabase();

    const categories = await Category.find({});

    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
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

// POST: Create a new category
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 }
      );
    }

    const newSlug = slugify(name);

    const category = await Category.create({
      name,
      slug: newSlug,
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Error (Category):", error);
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Category already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: Delete a category (assuming a simple DELETE /api/admin/categories?id=...)
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API DELETE Error (Category):", error);
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
