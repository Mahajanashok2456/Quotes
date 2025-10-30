import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
};

// Utility function to convert title to slug
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

/**
 * GET /api/admin/blogs
 * Retrieves all blogs (Admin only)
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch all blogs sorted by creation date (newest first)
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    // Return the blogs
    return NextResponse.json(
      {
        success: true,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blogs?id=blogId
 * Deletes a blog post (Admin only)
 */
export async function DELETE(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Get blog ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog ID is required",
        },
        { status: 400 }
      );
    }

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "Blog deleted successfully",
        data: deletedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete blog",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/blogs?id=blogId
 * Updates a blog post (Admin only)
 */
export async function PUT(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Get blog ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog ID is required",
        },
        { status: 400 }
      );
    }

    // Get request body
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      heroQuote,
      heroAuthor,
      publishDate,
      readTime,
      isPublished,
      tags,
      metaTitle,
      metaDescription,
      featuredImage,
    } = body;

    // Build update object with only provided fields
    const updateData = {};

    if (title) updateData.title = title.trim();
    if (slug) updateData.slug = slugify(slug);
    if (excerpt) updateData.excerpt = excerpt.trim();
    if (content) updateData.content = content.trim();
    if (heroQuote !== undefined)
      updateData.heroQuote = heroQuote ? heroQuote.trim() : undefined;
    if (heroAuthor !== undefined)
      updateData.heroAuthor = heroAuthor ? heroAuthor.trim() : undefined;
    if (publishDate) updateData.publishDate = publishDate;
    if (readTime) updateData.readTime = readTime;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (tags !== undefined)
      updateData.tags = Array.isArray(tags)
        ? tags
            .filter((tag) => tag && typeof tag === "string")
            .map((tag) => tag.trim())
        : [];
    if (metaTitle !== undefined)
      updateData.metaTitle = metaTitle ? metaTitle.trim() : undefined;
    if (metaDescription !== undefined)
      updateData.metaDescription = metaDescription
        ? metaDescription.trim()
        : undefined;
    if (featuredImage !== undefined)
      updateData.featuredImage = featuredImage
        ? featuredImage.trim()
        : undefined;

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog slug already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update blog",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blogs
 * Creates a new blog post (Admin only)
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Get request body
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      heroQuote,
      heroAuthor,
      publishDate,
      readTime,
      isPublished,
      tags,
      metaTitle,
      metaDescription,
      featuredImage,
    } = body;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog title is required",
        },
        { status: 400 }
      );
    }

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog content is required",
        },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const finalSlug =
      slug && slug.trim().length > 0 ? slugify(slug) : slugify(title);

    // Validate slug format
    if (!finalSlug || finalSlug.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog title - cannot generate slug",
        },
        { status: 400 }
      );
    }

    // Create excerpt if not provided
    const finalExcerpt =
      excerpt && excerpt.trim().length > 0
        ? excerpt.trim()
        : content.replace(/<[^>]*>/g, "").substring(0, 200) + "...";

    // Set default publish date if not provided
    const finalPublishDate =
      publishDate || new Date().toISOString().split("T")[0];

    // Set default read time if not provided
    const finalReadTime = readTime || "5 min read";

    // Create new blog post
    const blog = await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      excerpt: finalExcerpt,
      content: content.trim(),
      heroQuote: heroQuote ? heroQuote.trim() : undefined,
      heroAuthor: heroAuthor ? heroAuthor.trim() : undefined,
      publishDate: finalPublishDate,
      readTime: finalReadTime,
      isPublished: isPublished !== undefined ? isPublished : false,
      tags: Array.isArray(tags)
        ? tags
            .filter((tag) => tag && typeof tag === "string")
            .map((tag) => tag.trim())
        : [],
      metaTitle: metaTitle ? metaTitle.trim() : undefined,
      metaDescription: metaDescription ? metaDescription.trim() : undefined,
      featuredImage: featuredImage ? featuredImage.trim() : undefined,
    });

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog slug already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}
