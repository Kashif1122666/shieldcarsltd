import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from './models/Admin.js';
import Car from './models/Car.js';
import { INITIAL_MOCK_CARS } from './data/mockCars.js';
import { requireMongoUri, configureDns, mongoClientOptions } from './config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load backend/.env regardless of the current working directory.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  configureDns();
  await mongoose.connect(requireMongoUri(), mongoClientOptions());
  console.log('MongoDB connected');

  // Admin user
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'shield2025', 10);
  await Admin.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL },
    { name: 'Dealership Director', email: process.env.ADMIN_EMAIL, password, role: 'superadmin' },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Admin user seeded');

  // Cars
  await Car.deleteMany({});
  await Car.insertMany(INITIAL_MOCK_CARS);
  console.log(`Seeded ${INITIAL_MOCK_CARS.length} cars`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
