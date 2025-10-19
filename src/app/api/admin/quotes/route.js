import connectToDatabase from '@/lib/mongodb';
import Quote from '@/models/Quote';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * POST /api/admin/quotes
 * Creates a new quote
 */
export async function POST(request) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Get request body
    const body = await request.json();
    
    // Create new quote instance
    const quote = new Quote(body);
    
    // Validate quote data
    const validation = quote.validate();
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: validation.errors
      }, { status: 400 });
    }
    
    // Insert quote into database
    const quotesCollection = db.collection('quotes');
    const result = await quotesCollection.insertOne(quote.toObject());
    
    // Return successful response
    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...quote.toObject()
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating quote:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create quote',
      message: error.message
    }, { status: 500 });
  }
}

/**
 * PUT /api/admin/quotes/:id
 * Updates an existing quote by ID
 */
export async function PUT(request) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Get quote ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid quote ID'
      }, { status: 400 });
    }
    
    // Get request body
    const body = await request.json();
    
    // Create quote instance with updated data
    const quote = new Quote(body);
    
    // Validate quote data
    const validation = quote.validate();
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: validation.errors
      }, { status: 400 });
    }
    
    // Update quote in database
    const quotesCollection = db.collection('quotes');
    const result = await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: quote.toObject() }
    );
    
    // Check if quote was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Quote not found'
      }, { status: 404 });
    }
    
    // Return successful response
    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        ...quote.toObject()
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating quote:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update quote',
      message: error.message
    }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/quotes/:id
 * Deletes a quote by ID
 */
export async function DELETE(request) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Get quote ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid quote ID'
      }, { status: 400 });
    }
    
    // Delete quote from database
    const quotesCollection = db.collection('quotes');
    const result = await quotesCollection.deleteOne({ _id: new ObjectId(id) });
    
    // Check if quote was found and deleted
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Quote not found'
      }, { status: 404 });
    }
    
    // Return successful response
    return NextResponse.json({
      success: true,
      message: 'Quote deleted successfully'
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error deleting quote:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to delete quote',
      message: error.message
    }, { status: 500 });
  }
}