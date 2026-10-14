import { NextResponse } from 'next/server';
import Car from '../backend/src/models/Car.js';

export async function DELETE(request, { params }) {
  try {
    const car = await Car.findOneAndDelete({ id: params.id });
    if (!car) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
