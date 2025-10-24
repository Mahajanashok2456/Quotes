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
    const { id } = await params;

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

    // Toggle is_pinned
    const updatedIsPinned = !existingQuote.is_pinned;

    // Update the quote in the database
    await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { is_pinned: updatedIsPinned } }
    );

    // Return the updated quote
    return NextResponse.json({
      success: true,
      data: { ...existingQuote, is_pinned: updatedIsPinned }
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