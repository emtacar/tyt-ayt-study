import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Progress from '@/models/Progress';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const userId = (session.user as { id?: string }).id;
    const progress = await Progress.findOne({ userId });

    return NextResponse.json({
      checkedItems: progress?.checkedItems ? Object.fromEntries(progress.checkedItems) : {}
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json({ error: 'Hata oluştu' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { checkedItems } = await req.json();

    await dbConnect();

    const userId = (session.user as { id?: string }).id;
    
    await Progress.findOneAndUpdate(
      { userId },
      { checkedItems, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'Kaydedildi' });
  } catch (error) {
    console.error('Save progress error:', error);
    return NextResponse.json({ error: 'Kaydetme hatası' }, { status: 500 });
  }
}
