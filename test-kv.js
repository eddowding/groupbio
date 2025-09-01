import { kv } from '@vercel/kv'

async function testKV() {
  try {
    console.log('Testing KV connection...')
    const signupData = await kv.lrange('signups', 0, -1)
    console.log(`Found ${signupData.length} signups in KV`)
    
    signupData.forEach((item, index) => {
      console.log(`Raw item ${index + 1}:`, typeof item, item)
      try {
        const signup = JSON.parse(item)
        console.log(`${index + 1}. ${signup.email} - ${signup.groupName} (${signup.timestamp})`)
      } catch (e) {
        console.log(`Failed to parse item ${index + 1}:`, e.message)
      }
    })
  } catch (error) {
    console.error('Error accessing KV:', error)
  }
}

testKV()