import { NextResponse } from 'next/server';
import Car from '../backend/src/models/Car.js';

export async function PUT(request, { params }) {
  try {
    const car = await Car.findOneAndUpdate({ id: params.id }, await request.json(), { returnDocument: 'after', runValidators: true });
    if (!car) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    return NextResponse.json(car);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
