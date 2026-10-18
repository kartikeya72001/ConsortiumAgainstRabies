import { NextResponse } from 'next/server';
import { getMembers, addMember, updateMember, deleteMember } from '@/lib/db';

function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET_KEY || 'car_admin_2026_secure';
  if (authHeader && authHeader.replace('Bearer ', '') === secret) {
    return true;
  }
  return false;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state') || 'ALL';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const result = await getMembers({ search, state, page, limit });
    return NextResponse.json(result);
  } catch (err) {
    console.error('API GET /api/members error:', err);
    return NextResponse.json({ error: 'Failed to retrieve members' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.membership_id) {
      return NextResponse.json({ error: 'Name and Membership ID are required' }, { status: 400 });
    }

    const result = await addMember(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error('API POST /api/members error:', err);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    const { id, ...updates } = body;
    const result = await updateMember(id, updates);
    return NextResponse.json(result);
  } catch (err) {
    console.error('API PUT /api/members error:', err);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    const result = await deleteMember(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error('API DELETE /api/members error:', err);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
