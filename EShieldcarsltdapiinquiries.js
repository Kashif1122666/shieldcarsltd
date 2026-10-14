import { NextResponse } from 'next/server';
import Inquiry from '../backend/src/models/Inquiry.js';

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.id) data.id = `inq-${Date.now().toString(36)}`;
    const inquiry = await Inquiry.create(data);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(request) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
