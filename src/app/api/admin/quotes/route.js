import connectToDatabase from "@/lib/mongodb";
import Quote from "@/models/Quote";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimiter";
import sanitizeHtml from "sanitize-html";

/**
 * GET /api/admin/quotes
 * Retrieves all quotes
 */
export async function GET(request) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: rateLimitResult.error,
        },
        { status: 429 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Fetch all quotes
    const quotesCollection = db.collection("quotes");
    const quotes = await quotesCollection.find({}).toArray();

    // Return the quotes as is
    return NextResponse.json(
      {
        success: true,
        data: quotes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quotes:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch quotes",
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
 * POST /api/admin/quotes
 * Creates a new quote
 */
export async function POST(request) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: rateLimitResult.error,
        },
        { status: 429 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Get request body
    const body = await request.json();

    // Handle category lookup if provided
    let categoryId = null;
    let categoryName = null;

    if (body.category && body.category.trim()) {
      const categoriesCollection = db.collection("categories");

      // Try to find category by slug or name
      const category = await categoriesCollection.findOne({
        $or: [{ slug: body.category.trim() }, { name: body.category.trim() }],
      });

      if (category) {
        categoryId = category._id;
        categoryName = category.name;
      }
    }

    // Sanitize input
    const sanitizedBody = {
      text: sanitizeHtml(body.text || ""),
      author: sanitizeHtml(body.author || ""),
      font_family: sanitizeHtml(body.font_family || "Arial"),
      font_color: sanitizeHtml(body.font_color || "#000000"),
      category: categoryId,
      categoryName: categoryName,
      likes: body.likes || 0,
      is_pinned: body.is_pinned || false,
      created_at: body.created_at || new Date(),
    };

    // Create new quote instance
    const quote = new Quote(sanitizedBody);

    // Validate quote data
    const validationResult = await quote.validate();
    if (
      validationResult &&
      validationResult.errors &&
      Object.keys(validationResult.errors).length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          message: Object.values(validationResult.errors).map(
            (err) => err.message
          ),
        },
        { status: 400 }
      );
    }

    // Insert quote into database
    const quotesCollection = db.collection("quotes");
    const result = await quotesCollection.insertOne(quote.toObject());

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          ...quote.toObject(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quote:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create quote",
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
 * PUT /api/admin/quotes
 * Updates an existing quote by ID (ID passed in request body)
 */
export async function PUT(request) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: rateLimitResult.error,
        },
        { status: 429 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Get request body
    const body = await request.json();

    // Extract ID from request body
    const { id, ...quoteData } = body;

    // Validate ID format
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quote ID",
        },
        { status: 400 }
      );
    }

    // Handle category lookup if provided
    let categoryId = null;
    let categoryName = null;

    if (quoteData.category && quoteData.category.trim()) {
      const categoriesCollection = db.collection("categories");

      // Try to find category by slug or name
      const category = await categoriesCollection.findOne({
        $or: [
          { slug: quoteData.category.trim() },
          { name: quoteData.category.trim() },
        ],
      });

      if (category) {
        categoryId = category._id;
        categoryName = category.name;
      }
    }

    // Sanitize input
    const sanitizedQuoteData = {
      text: sanitizeHtml(quoteData.text || ""),
      author: sanitizeHtml(quoteData.author || ""),
      font_family: sanitizeHtml(quoteData.font_family || "Arial"),
      font_color: sanitizeHtml(quoteData.font_color || "#000000"),
      category: categoryId,
      categoryName: categoryName,
      likes: quoteData.likes || 0,
      is_pinned: quoteData.is_pinned || false,
      created_at: quoteData.created_at || new Date(),
    };

    // Create quote instance with updated data
    const quote = new Quote(sanitizedQuoteData);

    // Validate quote data
    const validationResult = await quote.validate();
    if (
      validationResult &&
      validationResult.errors &&
      Object.keys(validationResult.errors).length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          message: Object.values(validationResult.errors).map(
            (err) => err.message
          ),
        },
        { status: 400 }
      );
    }

    // Update quote in database
    const quotesCollection = db.collection("quotes");
    const quoteObj = quote.toObject();
    delete quoteObj._id; // Exclude _id from update
    const result = await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: quoteObj }
    );

    // Check if quote was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Quote not found",
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: id,
          ...quoteObj,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quote:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update quote",
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
 * DELETE /api/admin/quotes
 * Deletes a quote by ID (ID passed in request body)
 */
export async function DELETE(request) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: rateLimitResult.error,
        },
        { status: 429 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Get request body
    const body = await request.json();
    const { id } = body;

    // Validate ID format
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quote ID",
        },
        { status: 400 }
      );
    }

    // Delete quote from database
    const quotesCollection = db.collection("quotes");
    const result = await quotesCollection.deleteOne({ _id: new ObjectId(id) });

    // Check if quote was found and deleted
    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Quote not found",
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "Quote deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quote:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete quote",
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}
