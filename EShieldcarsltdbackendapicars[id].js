import { NextResponse } from 'next/server';
import Car from '../models/Car.js';

export async function GET(request, { params }) {
  try {
    const car = await Car.findOne({ $or: [{ id: params.id }, { stockNumber: new RegExp(`^${params.id}$`, 'i') }] });
    if (!car) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    car.views = (car.views || 0) + 1;
    await car.save();
    return NextResponse.json(car);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
