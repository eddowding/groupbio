import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, groupName, groupType, customGroupType, memberCount, finalGroupType } = body

    // Validate required fields
    if (!email || !phone || !groupName || !groupType || !memberCount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (groupType === 'other' && !customGroupType) {
      return NextResponse.json({ error: 'Custom group type required' }, { status: 400 })
    }

    // Create data entry
    const timestamp = new Date().toISOString()
    const dataEntry = {
      timestamp,
      email,
      phone,
      groupName,
      groupType: finalGroupType || groupType,
      memberCount
    }

    // Store signup in Vercel KV
    try {
      await kv.lpush('signups', dataEntry)
    } catch (kvError) {
      console.error('Error storing signup:', kvError)
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}