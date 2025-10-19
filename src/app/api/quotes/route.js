import connectToDatabase from '@/lib/mongodb';
import Quote from '@/models/Quote';
import { NextResponse } from 'next/server';

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