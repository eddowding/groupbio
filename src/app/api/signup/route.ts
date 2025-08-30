import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

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

    // File path for storing signups
    const filePath = join(process.cwd(), 'signups.txt')
    
    // Format the data for text file
    const formattedEntry = `${timestamp} | ${email} | ${phone} | ${groupName} | ${finalGroupType || groupType} | ${memberCount}\n`
    
    // Append to file (create if doesn't exist)
    try {
      let existingData = ''
      if (existsSync(filePath)) {
        existingData = readFileSync(filePath, 'utf8')
      }
      
      // Add header if file is empty
      const header = existingData.length === 0 ? 'Timestamp | Email | Phone | Group Name | Group Type | Member Count\n' : ''
      
      writeFileSync(filePath, header + existingData + formattedEntry)
    } catch (fileError) {
      console.error('Error writing to file:', fileError)
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}