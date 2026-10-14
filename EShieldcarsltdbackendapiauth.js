import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export async function GET(request) {
  return NextResponse.json({ message: 'Use POST /api/auth/login' });
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const admin = await Admin.findOne({ email: String(email || '').trim() });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: { id: String(admin._id), name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
