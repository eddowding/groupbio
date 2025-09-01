import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
  try {
    // Check authorization header
    const authHeader = request.headers.get('Authorization')
    if (authHeader !== 'aurora2023') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get signups from Vercel KV
    const signups = await kv.lrange('signups', 0, -1)

    return NextResponse.json({ signups })
  } catch (error) {
    console.error('Error reading signups:', error)
    return NextResponse.json({ error: 'Failed to read signups' }, { status: 500 })
  }
}