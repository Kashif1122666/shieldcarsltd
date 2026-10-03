import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, default: 'Dealership Director' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'superadmin' },
});

adminSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.password;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Admin', adminSchema);
