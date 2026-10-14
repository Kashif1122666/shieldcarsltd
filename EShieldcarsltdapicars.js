import { NextResponse } from 'next/server';
import Car from '../../backend/src/models/Car.js';

export async function GET(request) {
  try {
    const { search, make, bodyType, condition, fuelType, transmission, status, minPrice, maxPrice, minYear, maxYear, sort } = await request.json();

    const filter = {};
    if (search) {
      const rx = new RegExp(String(search).trim(), 'i');
      filter.$or = [
        { make: rx },
        { model: rx },
        { trim: rx },
        { stockNumber: rx },
        { exteriorColor: rx },
      ];
    }
    if (make) filter.make = new RegExp(`^${make}$`, 'i');
    if (bodyType) filter.bodyType = new RegExp(`^${bodyType}$`, 'i');
    if (condition) filter.condition = new RegExp(`^${condition}$`, 'i');
    if (fuelType) filter.fuelType = new RegExp(`^${fuelType}$`, 'i');
    if (transmission) filter.transmission = new RegExp(`^${transmission}$`, 'i');
    if (status) filter.status = new RegExp(`^${status}$`, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      mileage_asc: { mileage: 1 },
      year_desc: { year: -1 },
      newest: { createdAt: -1 },
    };

    const cars = await Car.find(filter).sort(sortMap[sort] || sortMap.newest);
    return NextResponse.json(cars);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
