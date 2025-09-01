import { kv } from '@vercel/kv'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

async function migrateSignups() {
  const filePath = join(process.cwd(), 'signups.txt')
  
  if (!existsSync(filePath)) {
    console.log('No signups.txt file found')
    return
  }

  const fileContent = readFileSync(filePath, 'utf8')
  const lines = fileContent.split('\n').filter(line => line.trim() && !line.includes('Timestamp |'))
  
  console.log(`Found ${lines.length} signups to migrate`)

  for (const line of lines) {
    const parts = line.split(' | ')
    if (parts.length === 6) {
      const dataEntry = {
        timestamp: parts[0].trim(),
        email: parts[1].trim(),
        phone: parts[2].trim(),
        groupName: parts[3].trim(),
        groupType: parts[4].trim(),
        memberCount: parts[5].trim()
      }
      
      console.log(`Migrating: ${dataEntry.email} - ${dataEntry.groupName}`)
      await kv.lpush('signups', JSON.stringify(dataEntry))
    }
  }
  
  console.log('Migration completed!')
}

migrateSignups().catch(console.error)