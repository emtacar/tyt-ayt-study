import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Tüm alanlar gerekli' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email zaten kayıtlı' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return NextResponse.json(
      { message: 'Kayıt başarılı', userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında hata oluştu' },
      { status: 500 }
    );
  }
}
