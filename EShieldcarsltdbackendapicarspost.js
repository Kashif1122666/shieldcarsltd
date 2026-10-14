import { NextResponse } from 'next/server';
import Car from '../models/Car.js';

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.id) data.id = `scl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const car = await Car.create(data);
    return NextResponse.json(car, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
