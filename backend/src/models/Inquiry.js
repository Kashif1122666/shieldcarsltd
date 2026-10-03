import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    type: { type: String, default: 'general' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: String,
    vehicleId: String,
    vehicleTitle: String,
    preferredDate: String,
    tradeInDetails: {
      make: String,
      model: String,
      year: Number,
      mileage: Number,
    },
    status: { type: String, default: 'new' },
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

export default mongoose.model('Inquiry', inquirySchema);
