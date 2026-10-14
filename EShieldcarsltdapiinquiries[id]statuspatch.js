import { NextResponse } from 'next/server';
import Inquiry from '../backend/src/models/Inquiry.js';

export async function PATCH(request, { params }) {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { id: params.id },
      { status: await request.json() },
      { returnDocument: 'after' }
    );
    if (!inquiry) return NextResponse.json({ message: 'Inquiry not found' }, { status: 404 });
    return NextResponse.json(inquiry);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
