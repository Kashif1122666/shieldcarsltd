import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    stockNumber: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    trim: String,
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    mileage: { type: Number, required: true },
    condition: String,
    bodyType: String,
    fuelType: String,
    transmission: String,
    drivetrain: String,
    engine: String,
    power: String,
    torque: String,
    acceleration: String,
    exteriorColor: String,
    interiorColor: String,
    vin: String,
    description: String,
    features: [String],
    images: [String],
    status: { type: String, default: 'available' },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model('Car', carSchema);
