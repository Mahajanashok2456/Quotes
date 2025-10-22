import connectToDatabase from '@/lib/mongodb';
import Quote from '@/models/Quote';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * PUT /api/admin/quotes/[id]/pin
 * Toggles the is_pinned field of a quote by ID
 */
export async function PUT(request, { params }) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Get quote ID from URL params
    const { id } = params;

    // Validate ID format
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid quote ID'
      }, { status: 400 });
    }

    // Find the existing quote
    const quotesCollection = db.collection('quotes');
    const existingQuote = await quotesCollection.findOne({ _id: new ObjectId(id) });

    // Check if quote exists
    if (!existingQuote) {
      return NextResponse.json({
        success: false,
        error: 'Quote not found'
      }, { status: 404 });
    }

    // Create Quote instance and toggle is_pinned
    const quote = Quote.fromDocument(existingQuote);
    quote.is_pinned = !quote.is_pinned;

    // Validate the updated quote
    const validation = quote.validate();
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: validation.errors
      }, { status: 400 });
    }

    // Update the quote in the database
    await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { is_pinned: quote.is_pinned } }
    );

    // Return the updated quote
    return NextResponse.json({
      success: true,
      data: quote.toObject()
    }, { status: 200 });

  } catch (error) {
    console.error('Error toggling pin:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to toggle pin',
      message: error.message
    }, { status: 500 });
  }
}