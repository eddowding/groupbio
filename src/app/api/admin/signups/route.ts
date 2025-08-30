import { NextRequest, NextResponse } from 'next/server'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    // Check authorization header
    const authHeader = request.headers.get('Authorization')
    if (authHeader !== 'aurora2023') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // File path for signups data
    const filePath = join(process.cwd(), 'signups.txt')
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ signups: [] })
    }

    // Read and parse the file
    const fileContent = readFileSync(filePath, 'utf8')
    const lines = fileContent.split('\n').filter(line => line.trim() && !line.includes('Timestamp |')) // Remove empty lines and header
    
    const signups = lines.map(line => {
      const parts = line.split(' | ')
      if (parts.length === 6) {
        return {
          timestamp: parts[0].trim(),
          email: parts[1].trim(),
          phone: parts[2].trim(),
          groupName: parts[3].trim(),
          groupType: parts[4].trim(),
          memberCount: parts[5].trim()
        }
      }
      return null
    }).filter(signup => signup !== null)

    return NextResponse.json({ signups })
  } catch (error) {
    console.error('Error reading signups:', error)
    return NextResponse.json({ error: 'Failed to read signups' }, { status: 500 })
  }
}