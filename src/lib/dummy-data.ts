export interface User {
  id: string
  name: string
  email: string
  phone?: string
  location?: {
    address: string
    lat: number
    lng: number
  }
  bio?: string
  linkedin?: string
  twitter?: string
  website?: string
  interests?: string[]
  avatar?: string
  customFields?: Record<string, any>
}

export interface Group {
  id: string
  name: string
  code: string
  description: string
  type: "parent" | "sports" | "professional" | "social"
  adminId: string
  memberCount: number
  createdAt: string
  settings: {
    requiredFields: string[]
    optionalFields: string[]
    allowMap: boolean
    customFields: CustomField[]
    terms?: string
  }
}

export interface CustomField {
  id: string
  name: string
  type: "text" | "textarea" | "select" | "checkbox" | "number"
  required: boolean
  options?: string[]
}

export interface GroupMember {
  userId: string
  groupId: string
  joinedAt: string
  sharedFields: string[]
  role: "member" | "admin"
}

export interface WikiDoc {
  id: string
  groupId: string
  title: string
  content: string
  lastModified: string
  lastModifiedBy: string
  category: "general" | "rules" | "faq" | "resources"
}

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: { address: "123 Main St, Anytown, USA", lat: 40.7589, lng: -73.9851 },
    bio: "Father of two, loves coaching little league",
    linkedin: "https://linkedin.com/in/johndoe",
    interests: ["Baseball", "Coaching", "Photography"],
    avatar: "/avatars/john.jpg",
    customFields: { 
      childName: "Emma Doe",
      childAge: "8",
      emergencyContact: "Jane Doe - (555) 123-4568"
    }
  },
  {
    id: "2", 
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    location: { address: "456 Oak Ave, Anytown, USA", lat: 40.7614, lng: -73.9776 },
    bio: "Marketing professional and soccer mom",
    linkedin: "https://linkedin.com/in/sarahwilson",
    twitter: "https://twitter.com/sarahw",
    interests: ["Soccer", "Marketing", "Running"],
    customFields: {
      childName: "Alex Wilson", 
      childAge: "9",
      position: "Midfielder"
    }
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com", 
    phone: "+1 (555) 345-6789",
    location: { address: "789 Pine St, Anytown, USA", lat: 40.7505, lng: -73.9934 },
    bio: "Software engineer and basketball enthusiast",
    linkedin: "https://linkedin.com/in/mikechen",
    website: "https://mikechen.dev",
    interests: ["Basketball", "Coding", "Gaming"],
    customFields: {
      company: "TechCorp",
      role: "Senior Software Engineer",
      skillsets: "React, Node.js, Python"
    }
  },
  {
    id: "4",
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "+1 (555) 456-7890",
    bio: "Pediatric nurse and community volunteer",
    interests: ["Healthcare", "Volunteering", "Reading"],
    customFields: {
      childName: "Lily Thompson",
      childAge: "7",
      allergies: "Nuts, Dairy"
    }
  },
  {
    id: "5",
    name: "David Park",
    email: "david@example.com",
    location: { address: "321 Elm Dr, Anytown, USA", lat: 40.7648, lng: -73.9808 },
    bio: "Product manager and youth soccer coach",
    linkedin: "https://linkedin.com/in/davidpark",
    interests: ["Product Management", "Soccer", "Travel"],
    customFields: {
      company: "StartupXYZ",
      role: "Product Manager",
      jerseyNumber: "15"
    }
  }
]

export const dummyGroups: Group[] = [
  {
    id: "1",
    name: "Sunshine Nursery Parents",
    code: "SUNNY1",
    description: "Parent group for Sunshine Nursery School families",
    type: "parent",
    adminId: "1",
    memberCount: 24,
    createdAt: "2024-01-15",
    settings: {
      requiredFields: ["name", "phone", "childName"],
      optionalFields: ["bio", "interests", "emergencyContact"],
      allowMap: true,
      customFields: [
        { id: "childName", name: "Child's Name", type: "text", required: true },
        { id: "childAge", name: "Child's Age", type: "number", required: false },
        { id: "allergies", name: "Allergies", type: "textarea", required: false },
        { id: "emergencyContact", name: "Emergency Contact", type: "text", required: false }
      ],
      terms: "Please respect other families' privacy and only use shared information for group-related activities."
    }
  },
  {
    id: "2", 
    name: "FC Thunder Squad",
    code: "THUND1",
    description: "Youth soccer team for ages 8-10",
    type: "sports",
    adminId: "2",
    memberCount: 16,
    createdAt: "2024-02-01",
    settings: {
      requiredFields: ["name", "phone", "position"],
      optionalFields: ["bio", "emergencyContact", "jerseyNumber"],
      allowMap: true,
      customFields: [
        { id: "position", name: "Position", type: "select", required: true, options: ["Goalkeeper", "Defender", "Midfielder", "Forward"] },
        { id: "jerseyNumber", name: "Jersey Number", type: "number", required: false },
        { id: "emergencyContact", name: "Emergency Contact", type: "text", required: true }
      ]
    }
  },
  {
    id: "3",
    name: "TechCo Remote Team", 
    code: "TECH01",
    description: "Remote engineering team collaboration",
    type: "professional",
    adminId: "3",
    memberCount: 12,
    createdAt: "2024-01-08",
    settings: {
      requiredFields: ["name", "email", "role"],
      optionalFields: ["linkedin", "website", "skillsets", "timezone"],
      allowMap: false,
      customFields: [
        { id: "role", name: "Role", type: "text", required: true },
        { id: "skillsets", name: "Tech Stack", type: "textarea", required: false },
        { id: "timezone", name: "Timezone", type: "select", required: false, options: ["PST", "MST", "CST", "EST", "GMT"] }
      ]
    }
  }
]

export const dummyGroupMembers: GroupMember[] = [
  {
    userId: "1",
    groupId: "1", 
    joinedAt: "2024-01-15",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "admin"
  },
  {
    userId: "2",
    groupId: "1",
    joinedAt: "2024-01-16", 
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "4",
    groupId: "1",
    joinedAt: "2024-01-18",
    sharedFields: ["name", "bio", "childName", "childAge", "allergies"],
    role: "member"
  },
  {
    userId: "2",
    groupId: "2",
    joinedAt: "2024-02-01",
    sharedFields: ["name", "phone", "position", "emergencyContact"],
    role: "admin"
  },
  {
    userId: "5", 
    groupId: "2",
    joinedAt: "2024-02-03",
    sharedFields: ["name", "phone", "bio", "position", "jerseyNumber"],
    role: "member"
  },
  {
    userId: "3",
    groupId: "3",
    joinedAt: "2024-01-08", 
    sharedFields: ["name", "email", "linkedin", "website", "role", "skillsets"],
    role: "admin"
  }
]

export const dummyWikiDocs: WikiDoc[] = [
  {
    id: "1",
    groupId: "1",
    title: "Welcome to Sunshine Nursery Parents",
    content: "# Welcome!\n\nWelcome to our parent group. This is a space for families to connect and support each other.\n\n## Group Guidelines\n- Be respectful and kind\n- Keep discussions focused on school and family topics\n- Protect children's privacy\n\n## Upcoming Events\n- Parent-Teacher Conferences: March 15-16\n- Spring Fair: April 20\n- End of Year Party: June 10",
    lastModified: "2024-02-15",
    lastModifiedBy: "John Doe",
    category: "general"
  },
  {
    id: "2", 
    groupId: "2",
    title: "Team Rules and Expectations",
    content: "# FC Thunder Squad Rules\n\n## Practice Schedule\n- Tuesdays 6:00-7:30 PM\n- Saturdays 9:00-10:30 AM\n\n## Game Day Guidelines\n- Arrive 30 minutes early\n- Bring water bottle and snacks\n- Positive attitude only!\n\n## Parent Responsibilities\n- Volunteer for game snacks (sign up sheet coming soon)\n- Help with field setup when possible\n- Cheer positively for ALL players",
    lastModified: "2024-02-10",
    lastModifiedBy: "Sarah Wilson", 
    category: "rules"
  },
  {
    id: "3",
    groupId: "3",
    title: "Engineering Team Resources",
    content: "# Development Resources\n\n## Code Style Guide\n- Use TypeScript for all new projects\n- Follow ESLint configuration\n- Write tests for critical functions\n\n## Tools & Access\n- GitHub: [team repo]\n- Slack: #engineering\n- Jira: [project board]\n\n## Meeting Schedule\n- Daily standups: 9 AM PST\n- Sprint planning: Every other Monday\n- Retrospectives: Last Friday of sprint",
    lastModified: "2024-02-12",
    lastModifiedBy: "Mike Chen",
    category: "resources"
  }
]

// Helper functions
export function getUserById(id: string): User | undefined {
  return dummyUsers.find(user => user.id === id)
}

export function getGroupById(id: string): Group | undefined {
  return dummyGroups.find(group => group.id === id)
}

export function getGroupMembers(groupId: string): (User & { membership: GroupMember })[] {
  const memberships = dummyGroupMembers.filter(m => m.groupId === groupId)
  return memberships.map(membership => {
    const user = getUserById(membership.userId)!
    return { ...user, membership }
  })
}

export function getUserGroups(userId: string): (Group & { membership: GroupMember })[] {
  const memberships = dummyGroupMembers.filter(m => m.userId === userId)
  return memberships.map(membership => {
    const group = getGroupById(membership.groupId)!
    return { ...group, membership }
  })
}

export function getWikiDocs(groupId: string): WikiDoc[] {
  return dummyWikiDocs.filter(doc => doc.groupId === groupId)
}

// Get current logged-in user (in real app this would come from auth)
export function getCurrentUser(): User {
  return getUserById("1")! // John Doe is our demo user
}