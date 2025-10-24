import connectToDatabase from '@/lib/mongodb';
import Quote from '@/models/Quote';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Connect (Note: We only need the connection for Mongoose to work)
    await connectToDatabase();

    // 2. Fetch data using the Mongoose Model
    const quotes = await Quote.find({});
    
    // 3. Return the data in the expected format
    return NextResponse.json({ success: true, data: quotes }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

/**
 * GET /api/quotes
 * Fetches all quotes from the database
 */
export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Fetch all quotes from the quotes collection
    const quotesCollection = db.collection('quotes');
    const quotes = await quotesCollection.find({}).toArray();

    // Convert database documents to Quote objects for consistency
    const quoteObjects = quotes.map(doc => Quote.fromDocument(doc));

    // Return successful response with quotes data
    return NextResponse.json({
      success: true,
      data: quoteObjects.map(quote => quote.toObject()),
      count: quotes.length
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching quotes:', error);

    // Return error response
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch quotes',
      message: error.message
    }, { status: 500 });
  }
}