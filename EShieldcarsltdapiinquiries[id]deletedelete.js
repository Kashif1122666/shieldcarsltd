import { NextResponse } from 'next/server';
import Inquiry from '../backend/src/models/Inquiry.js';

export async function DELETE(request, { params }) {
  try {
    const inquiry = await Inquiry.findOneAndDelete({ id: params.id });
    if (!inquiry) return NextResponse.json({ message: 'Inquiry not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
