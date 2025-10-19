import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * PUT /api/quotes/:id/like
 * Increments the like count for a quote
 */
export async function PUT(request, context) {
  try {
    console.log('Received like request with context:', context);
    
    const { params } = context;
    console.log('Params:', params);
    
    if (!params) {
      console.log('No params provided');
      return NextResponse.json({ 
        success: false,
        message: 'No parameters provided' 
      }, { status: 400 });
    }
    
    const { id } = params;
    console.log('ID from params:', id);
    
    // Backend guard: Check if ID is provided and valid
    if (!id || id === 'undefined' || id === ':id') {
      console.log('Invalid quote ID provided:', id);
      return NextResponse.json({ 
        success: false,
        message: 'Invalid quote ID provided' 
      }, { status: 400 });
    }
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return NextResponse.json({
        success: false,
        error: 'Invalid quote ID format'
      }, { status: 400 });
    }
    
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Update quote in database
    const quotesCollection = db.collection('quotes');
    const result = await quotesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );
    
    // Check if quote was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Quote not found'
      }, { status: 404 });
    }
    
    // Fetch updated quote
    const updatedQuote = await quotesCollection.findOne({ _id: new ObjectId(id) });
    
    // Return successful response
    return NextResponse.json({
      success: true,
      data: {
        likes: updatedQuote.likes || 0
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error liking quote:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to like quote',
      message: error.message
    }, { status: 500 });
  }
}