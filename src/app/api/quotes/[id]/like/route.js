import connectToDatabase from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, context) {
  const { id } = await context.params;

  if (!id) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Quote ID is required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid quote ID format",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { db } = await connectToDatabase();
    const quotesCollection = db.collection("quotes");

    const result = await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Quote not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedQuote = await quotesCollection.findOne({
      _id: new ObjectId(id),
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          likes: updatedQuote.likes,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update likes",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
