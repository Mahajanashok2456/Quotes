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