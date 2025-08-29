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
  },
  {
    id: "6",
    name: "Lisa Rodriguez",
    email: "lisa@example.com",
    phone: "+1 (555) 567-8901",
    location: { address: "567 Broadway, Anytown, USA", lat: 40.7580, lng: -73.9857 },
    bio: "Teacher and mother of twins",
    interests: ["Education", "Reading", "Arts"],
    customFields: {
      childName: "Sofia Rodriguez",
      childAge: "8",
      emergencyContact: "Carlos Rodriguez - (555) 567-8902"
    }
  },
  {
    id: "7",
    name: "James Miller",
    email: "james@example.com",
    phone: "+1 (555) 678-9012",
    location: { address: "890 5th Ave, Anytown, USA", lat: 40.7640, lng: -73.9729 },
    bio: "Architect and community organizer",
    interests: ["Architecture", "Urban Planning", "Cycling"],
    customFields: {
      childName: "Max Miller",
      childAge: "9",
      emergencyContact: "Anna Miller - (555) 678-9013"
    }
  },
  {
    id: "8",
    name: "Rachel Kim",
    email: "rachel@example.com",
    phone: "+1 (555) 789-0123",
    location: { address: "234 Park Ave, Anytown, USA", lat: 40.7527, lng: -73.9772 },
    bio: "Graphic designer and yoga instructor",
    interests: ["Design", "Yoga", "Meditation"],
    customFields: {
      childName: "Zoe Kim",
      childAge: "7",
      emergencyContact: "Kevin Kim - (555) 789-0124"
    }
  },
  {
    id: "9",
    name: "Tom Anderson",
    email: "tom@example.com",
    phone: "+1 (555) 890-1234",
    location: { address: "345 Madison Ave, Anytown, USA", lat: 40.7590, lng: -73.9712 },
    bio: "Financial advisor and little league coach",
    interests: ["Finance", "Baseball", "Fishing"],
    customFields: {
      childName: "Jake Anderson",
      childAge: "8",
      emergencyContact: "Susan Anderson - (555) 890-1235"
    }
  },
  {
    id: "10",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+1 (555) 901-2345",
    location: { address: "456 Lexington Ave, Anytown, USA", lat: 40.7611, lng: -73.9665 },
    bio: "Nurse practitioner and volunteer firefighter",
    interests: ["Healthcare", "Emergency Services", "Hiking"],
    customFields: {
      childName: "Carlos Garcia",
      childAge: "9",
      emergencyContact: "Jose Garcia - (555) 901-2346"
    }
  },
  {
    id: "11",
    name: "Steven Lee",
    email: "steven@example.com",
    phone: "+1 (555) 012-3456",
    location: { address: "678 3rd Ave, Anytown, USA", lat: 40.7523, lng: -73.9658 },
    bio: "Chef and cooking instructor",
    interests: ["Cooking", "Food Photography", "Travel"],
    customFields: {
      childName: "Amy Lee",
      childAge: "7",
      emergencyContact: "Jenny Lee - (555) 012-3457"
    }
  },
  {
    id: "12",
    name: "Amanda Davis",
    email: "amanda@example.com",
    phone: "+1 (555) 123-4568",
    location: { address: "789 7th Ave, Anytown, USA", lat: 40.7561, lng: -73.9851 },
    bio: "Lawyer and marathon runner",
    interests: ["Law", "Running", "Traveling"],
    customFields: {
      childName: "Ryan Davis",
      childAge: "8",
      emergencyContact: "Mark Davis - (555) 123-4569"
    }
  },
  {
    id: "13",
    name: "Chris Johnson",
    email: "chris@example.com",
    phone: "+1 (555) 234-5679",
    location: { address: "123 8th Ave, Anytown, USA", lat: 40.7445, lng: -74.0059 },
    bio: "Police officer and youth mentor",
    interests: ["Law Enforcement", "Mentoring", "Basketball"],
    customFields: {
      childName: "Tyler Johnson",
      childAge: "9",
      emergencyContact: "Michelle Johnson - (555) 234-5680"
    }
  },
  {
    id: "14",
    name: "Nicole Brown",
    email: "nicole@example.com",
    phone: "+1 (555) 345-6790",
    location: { address: "234 9th Ave, Anytown, USA", lat: 40.7484, lng: -73.9980 },
    bio: "Social worker and community advocate",
    interests: ["Social Work", "Community Service", "Gardening"],
    customFields: {
      childName: "Mia Brown",
      childAge: "7",
      emergencyContact: "David Brown - (555) 345-6791"
    }
  },
  {
    id: "15",
    name: "Robert Taylor",
    email: "robert@example.com",
    phone: "+1 (555) 456-7891",
    location: { address: "345 10th Ave, Anytown, USA", lat: 40.7500, lng: -73.9969 },
    bio: "Electrician and handyman",
    interests: ["Electrical Work", "Home Improvement", "Woodworking"],
    customFields: {
      childName: "Sam Taylor",
      childAge: "8",
      emergencyContact: "Linda Taylor - (555) 456-7892"
    }
  },
  {
    id: "16",
    name: "Jessica White",
    email: "jessica@example.com",
    phone: "+1 (555) 567-8902",
    location: { address: "456 11th Ave, Anytown, USA", lat: 40.7621, lng: -73.9890 },
    bio: "Veterinarian and animal rescue volunteer",
    interests: ["Veterinary Medicine", "Animal Rescue", "Photography"],
    customFields: {
      childName: "Ethan White",
      childAge: "9",
      emergencyContact: "Paul White - (555) 567-8903"
    }
  },
  {
    id: "17",
    name: "Daniel Martinez",
    email: "daniel@example.com",
    phone: "+1 (555) 678-9013",
    location: { address: "567 12th Ave, Anytown, USA", lat: 40.7533, lng: -73.9745 },
    bio: "Mechanic and race car enthusiast",
    interests: ["Auto Repair", "Racing", "Motorcycles"],
    customFields: {
      childName: "Alex Martinez",
      childAge: "7",
      emergencyContact: "Rosa Martinez - (555) 678-9014"
    }
  },
  {
    id: "18",
    name: "Ashley Wilson",
    email: "ashley@example.com",
    phone: "+1 (555) 789-0124",
    location: { address: "678 13th Ave, Anytown, USA", lat: 40.7598, lng: -73.9823 },
    bio: "Physical therapist and fitness trainer",
    interests: ["Physical Therapy", "Fitness", "Nutrition"],
    customFields: {
      childName: "Chloe Wilson",
      childAge: "8",
      emergencyContact: "Brian Wilson - (555) 789-0125"
    }
  },
  {
    id: "19",
    name: "Kevin Moore",
    email: "kevin@example.com",
    phone: "+1 (555) 890-1235",
    location: { address: "789 14th Ave, Anytown, USA", lat: 40.7567, lng: -73.9678 },
    bio: "Firefighter and EMT",
    interests: ["Emergency Services", "Fitness", "Outdoor Activities"],
    customFields: {
      childName: "Noah Moore",
      childAge: "9",
      emergencyContact: "Sarah Moore - (555) 890-1236"
    }
  },
  {
    id: "20",
    name: "Laura Jackson",
    email: "laura@example.com",
    phone: "+1 (555) 901-2346",
    location: { address: "890 15th Ave, Anytown, USA", lat: 40.7454, lng: -73.9912 },
    bio: "Accountant and financial planner",
    interests: ["Accounting", "Financial Planning", "Reading"],
    customFields: {
      childName: "Emma Jackson",
      childAge: "7",
      emergencyContact: "John Jackson - (555) 901-2347"
    }
  },
  {
    id: "21",
    name: "Brian Clark",
    email: "brian@example.com",
    phone: "+1 (555) 012-3457",
    location: { address: "123 16th Ave, Anytown, USA", lat: 40.7612, lng: -73.9756 },
    bio: "Construction foreman and soccer dad",
    interests: ["Construction", "Soccer", "Camping"],
    customFields: {
      childName: "Liam Clark",
      childAge: "8",
      emergencyContact: "Karen Clark - (555) 012-3458"
    }
  },
  {
    id: "22",
    name: "Michelle Lewis",
    email: "michelle@example.com",
    phone: "+1 (555) 123-4570",
    location: { address: "234 17th Ave, Anytown, USA", lat: 40.7576, lng: -73.9834 },
    bio: "Pharmacist and health advocate",
    interests: ["Pharmacy", "Health Education", "Yoga"],
    customFields: {
      childName: "Olivia Lewis",
      childAge: "9",
      emergencyContact: "Andrew Lewis - (555) 123-4571"
    }
  },
  {
    id: "23",
    name: "Andrew Walker",
    email: "andrew@example.com",
    phone: "+1 (555) 234-5681",
    location: { address: "345 18th Ave, Anytown, USA", lat: 40.7498, lng: -73.9789 },
    bio: "IT consultant and tech enthusiast",
    interests: ["Technology", "Cybersecurity", "Gaming"],
    customFields: {
      childName: "Lucas Walker",
      childAge: "7",
      emergencyContact: "Lisa Walker - (555) 234-5682"
    }
  },
  {
    id: "24",
    name: "Stephanie Hall",
    email: "stephanie@example.com",
    phone: "+1 (555) 345-6792",
    location: { address: "456 19th Ave, Anytown, USA", lat: 40.7543, lng: -73.9701 },
    bio: "Real estate agent and community volunteer",
    interests: ["Real Estate", "Community Service", "Interior Design"],
    customFields: {
      childName: "Isabella Hall",
      childAge: "8",
      emergencyContact: "Michael Hall - (555) 345-6793"
    }
  },
  {
    id: "25",
    name: "Ryan Allen",
    email: "ryan@example.com",
    phone: "+1 (555) 456-7893",
    location: { address: "567 20th Ave, Anytown, USA", lat: 40.7589, lng: -73.9623 },
    bio: "Pilot and aviation instructor",
    interests: ["Aviation", "Flying", "Travel"],
    customFields: {
      childName: "Mason Allen",
      childAge: "9",
      emergencyContact: "Jennifer Allen - (555) 456-7894"
    }
  },
  {
    id: "26",
    name: "Megan Young",
    email: "megan@example.com",
    phone: "+1 (555) 567-8904",
    location: { address: "678 21st Ave, Anytown, USA", lat: 40.7467, lng: -73.9845 },
    bio: "Dentist and oral health educator",
    interests: ["Dentistry", "Health Education", "Swimming"],
    customFields: {
      childName: "Sophia Young",
      childAge: "7",
      emergencyContact: "Peter Young - (555) 567-8905"
    }
  },
  {
    id: "27",
    name: "Patrick King",
    email: "patrick@example.com",
    phone: "+1 (555) 678-9015",
    location: { address: "789 22nd Ave, Anytown, USA", lat: 40.7521, lng: -73.9812 },
    bio: "Plumber and home renovation specialist",
    interests: ["Plumbing", "Home Renovation", "Fishing"],
    customFields: {
      childName: "Jackson King",
      childAge: "8",
      emergencyContact: "Rachel King - (555) 678-9016"
    }
  },
  {
    id: "28",
    name: "Kimberly Wright",
    email: "kimberly@example.com",
    phone: "+1 (555) 789-0126",
    location: { address: "890 23rd Ave, Anytown, USA", lat: 40.7634, lng: -73.9734 },
    bio: "Speech therapist and special education advocate",
    interests: ["Speech Therapy", "Special Education", "Music"],
    customFields: {
      childName: "Aiden Wright",
      childAge: "9",
      emergencyContact: "Thomas Wright - (555) 789-0127"
    }
  },
  {
    id: "29",
    name: "Gregory Lopez",
    email: "gregory@example.com",
    phone: "+1 (555) 890-1237",
    location: { address: "123 24th Ave, Anytown, USA", lat: 40.7556, lng: -73.9689 },
    bio: "Insurance agent and little league umpire",
    interests: ["Insurance", "Baseball", "Coaching"],
    customFields: {
      childName: "Gabriel Lopez",
      childAge: "7",
      emergencyContact: "Maria Lopez - (555) 890-1238"
    }
  },
  {
    id: "30",
    name: "Catherine Scott",
    email: "catherine@example.com",
    phone: "+1 (555) 901-2348",
    location: { address: "234 25th Ave, Anytown, USA", lat: 40.7487, lng: -73.9867 },
    bio: "Librarian and literacy advocate",
    interests: ["Literature", "Education", "Book Clubs"],
    customFields: {
      childName: "Grace Scott",
      childAge: "8",
      emergencyContact: "William Scott - (555) 901-2349"
    }
  },
  {
    id: "31",
    name: "Jonathan Green",
    email: "jonathan@example.com",
    phone: "+1 (555) 012-3459",
    location: { address: "345 26th Ave, Anytown, USA", lat: 40.7612, lng: -73.9612 },
    bio: "Environmental scientist and nature photographer",
    interests: ["Environmental Science", "Photography", "Hiking"],
    customFields: {
      childName: "Caleb Green",
      childAge: "9",
      emergencyContact: "Emily Green - (555) 012-3460"
    }
  },
  {
    id: "32",
    name: "Samantha Adams",
    email: "samantha@example.com",
    phone: "+1 (555) 123-4572",
    location: { address: "456 27th Ave, Anytown, USA", lat: 40.7545, lng: -73.9778 },
    bio: "Marketing manager and event planner",
    interests: ["Marketing", "Event Planning", "Travel"],
    customFields: {
      childName: "Avery Adams",
      childAge: "7",
      emergencyContact: "Daniel Adams - (555) 123-4573"
    }
  },
  {
    id: "33",
    name: "Benjamin Baker",
    email: "benjamin@example.com",
    phone: "+1 (555) 234-5683",
    location: { address: "567 28th Ave, Anytown, USA", lat: 40.7478, lng: -73.9723 },
    bio: "Baker and culinary instructor",
    interests: ["Baking", "Culinary Arts", "Food Writing"],
    customFields: {
      childName: "Logan Baker",
      childAge: "8",
      emergencyContact: "Sarah Baker - (555) 234-5684"
    }
  },
  {
    id: "34",
    name: "Victoria Gonzalez",
    email: "victoria@example.com",
    phone: "+1 (555) 345-6794",
    location: { address: "678 29th Ave, Anytown, USA", lat: 40.7623, lng: -73.9656 },
    bio: "Occupational therapist and adaptive sports coach",
    interests: ["Occupational Therapy", "Adaptive Sports", "Volunteering"],
    customFields: {
      childName: "Maya Gonzalez",
      childAge: "9",
      emergencyContact: "Carlos Gonzalez - (555) 345-6795"
    }
  },
  {
    id: "35",
    name: "Timothy Nelson",
    email: "timothy@example.com",
    phone: "+1 (555) 456-7895",
    location: { address: "789 30th Ave, Anytown, USA", lat: 40.7534, lng: -73.9801 },
    bio: "Carpenter and furniture maker",
    interests: ["Carpentry", "Woodworking", "Craftsmanship"],
    customFields: {
      childName: "Connor Nelson",
      childAge: "7",
      emergencyContact: "Amanda Nelson - (555) 456-7896"
    }
  },
  {
    id: "36",
    name: "Angela Carter",
    email: "angela@example.com",
    phone: "+1 (555) 567-8906",
    location: { address: "890 31st Ave, Anytown, USA", lat: 40.7589, lng: -73.9734 },
    bio: "Psychologist and family counselor",
    interests: ["Psychology", "Counseling", "Mental Health"],
    customFields: {
      childName: "Natalie Carter",
      childAge: "8",
      emergencyContact: "Robert Carter - (555) 567-8907"
    }
  },
  {
    id: "37",
    name: "Edward Mitchell",
    email: "edward@example.com",
    phone: "+1 (555) 678-9017",
    location: { address: "123 32nd Ave, Anytown, USA", lat: 40.7456, lng: -73.9689 },
    bio: "Engineer and robotics hobbyist",
    interests: ["Engineering", "Robotics", "Technology"],
    customFields: {
      childName: "Owen Mitchell",
      childAge: "9",
      emergencyContact: "Jessica Mitchell - (555) 678-9018"
    }
  },
  {
    id: "38",
    name: "Melissa Perez",
    email: "melissa@example.com",
    phone: "+1 (555) 789-0128",
    location: { address: "234 33rd Ave, Anytown, USA", lat: 40.7601, lng: -73.9823 },
    bio: "Journalist and communications specialist",
    interests: ["Journalism", "Writing", "Current Events"],
    customFields: {
      childName: "Addison Perez",
      childAge: "7",
      emergencyContact: "Miguel Perez - (555) 789-0129"
    }
  },
  {
    id: "39",
    name: "Joshua Roberts",
    email: "joshua@example.com",
    phone: "+1 (555) 890-1239",
    location: { address: "345 34th Ave, Anytown, USA", lat: 40.7512, lng: -73.9756 },
    bio: "Personal trainer and nutrition coach",
    interests: ["Fitness", "Nutrition", "Wellness"],
    customFields: {
      childName: "Hunter Roberts",
      childAge: "8",
      emergencyContact: "Kelly Roberts - (555) 890-1240"
    }
  },
  {
    id: "40",
    name: "Amy Turner",
    email: "amy@example.com",
    phone: "+1 (555) 901-2350",
    location: { address: "456 35th Ave, Anytown, USA", lat: 40.7567, lng: -73.9678 },
    bio: "Art teacher and muralist",
    interests: ["Art Education", "Painting", "Community Art"],
    customFields: {
      childName: "Lily Turner",
      childAge: "9",
      emergencyContact: "Jason Turner - (555) 901-2351"
    }
  },
  {
    id: "41",
    name: "Scott Phillips",
    email: "scott@example.com",
    phone: "+1 (555) 012-3461",
    location: { address: "567 36th Ave, Anytown, USA", lat: 40.7489, lng: -73.9812 },
    bio: "Sales manager and marathon runner",
    interests: ["Sales", "Running", "Endurance Sports"],
    customFields: {
      childName: "Evan Phillips",
      childAge: "7",
      emergencyContact: "Michelle Phillips - (555) 012-3462"
    }
  },
  {
    id: "42",
    name: "Heather Campbell",
    email: "heather@example.com",
    phone: "+1 (555) 123-4574",
    location: { address: "678 37th Ave, Anytown, USA", lat: 40.7634, lng: -73.9645 },
    bio: "Scientist and environmental advocate",
    interests: ["Research", "Environmental Conservation", "Sustainability"],
    customFields: {
      childName: "Paige Campbell",
      childAge: "8",
      emergencyContact: "David Campbell - (555) 123-4575"
    }
  },
  {
    id: "43",
    name: "Frank Parker",
    email: "frank@example.com",
    phone: "+1 (555) 234-5685",
    location: { address: "789 38th Ave, Anytown, USA", lat: 40.7523, lng: -73.9701 },
    bio: "Retired teacher and volunteer tutor",
    interests: ["Education", "Tutoring", "Reading"],
    customFields: {
      childName: "Grandchild: Sophie Parker",
      childAge: "9",
      emergencyContact: "Helen Parker - (555) 234-5686"
    }
  },
  {
    id: "44",
    name: "Deborah Evans",
    email: "deborah@example.com",
    phone: "+1 (555) 345-6796",
    location: { address: "890 39th Ave, Anytown, USA", lat: 40.7578, lng: -73.9789 },
    bio: "Nurse manager and healthcare advocate",
    interests: ["Healthcare", "Leadership", "Community Health"],
    customFields: {
      childName: "Jordan Evans",
      childAge: "7",
      emergencyContact: "Richard Evans - (555) 345-6797"
    }
  },
  {
    id: "45",
    name: "Peter Edwards",
    email: "peter@example.com",
    phone: "+1 (555) 456-7897",
    location: { address: "123 40th Ave, Anytown, USA", lat: 40.7445, lng: -73.9834 },
    bio: "Web developer and coding mentor",
    interests: ["Web Development", "Mentoring", "Open Source"],
    customFields: {
      childName: "Riley Edwards",
      childAge: "8",
      emergencyContact: "Sarah Edwards - (555) 456-7898"
    }
  },
  {
    id: "46",
    name: "Sharon Collins",
    email: "sharon@example.com",
    phone: "+1 (555) 567-8908",
    location: { address: "234 41st Ave, Anytown, USA", lat: 40.7612, lng: -73.9723 },
    bio: "Administrative assistant and PTA president",
    interests: ["Administration", "School Activities", "Organization"],
    customFields: {
      childName: "Taylor Collins",
      childAge: "9",
      emergencyContact: "Mark Collins - (555) 567-8909"
    }
  },
  {
    id: "47",
    name: "Carl Stewart",
    email: "carl@example.com",
    phone: "+1 (555) 678-9019",
    location: { address: "345 42nd Ave, Anytown, USA", lat: 40.7534, lng: -73.9656 },
    bio: "Landscaper and garden designer",
    interests: ["Landscaping", "Gardening", "Outdoor Design"],
    customFields: {
      childName: "Blake Stewart",
      childAge: "7",
      emergencyContact: "Linda Stewart - (555) 678-9020"
    }
  },
  {
    id: "48",
    name: "Janet Sanchez",
    email: "janet@example.com",
    phone: "+1 (555) 789-0130",
    location: { address: "456 43rd Ave, Anytown, USA", lat: 40.7489, lng: -73.9778 },
    bio: "Social media manager and digital marketer",
    interests: ["Social Media", "Digital Marketing", "Content Creation"],
    customFields: {
      childName: "Diego Sanchez",
      childAge: "8",
      emergencyContact: "Roberto Sanchez - (555) 789-0131"
    }
  },
  {
    id: "49",
    name: "Raymond Morris",
    email: "raymond@example.com",
    phone: "+1 (555) 890-1241",
    location: { address: "567 44th Ave, Anytown, USA", lat: 40.7567, lng: -73.9812 },
    bio: "Project manager and efficiency expert",
    interests: ["Project Management", "Process Improvement", "Technology"],
    customFields: {
      childName: "Morgan Morris",
      childAge: "9",
      emergencyContact: "Patricia Morris - (555) 890-1242"
    }
  },
  {
    id: "50",
    name: "Christine Rogers",
    email: "christine@example.com",
    phone: "+1 (555) 901-2352",
    location: { address: "678 45th Ave, Anytown, USA", lat: 40.7623, lng: -73.9689 },
    bio: "Event coordinator and party planner",
    interests: ["Event Planning", "Party Organization", "Decorating"],
    customFields: {
      childName: "Cameron Rogers",
      childAge: "7",
      emergencyContact: "Steven Rogers - (555) 901-2353"
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
    memberCount: 50,
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
  },
  {
    id: "4",
    name: "Downtown Book Club",
    code: "BOOK01", 
    description: "Monthly book discussions and literary events",
    type: "social",
    adminId: "4",
    memberCount: 8,
    createdAt: "2024-03-10",
    settings: {
      requiredFields: ["name", "email"],
      optionalFields: ["bio", "interests", "favoriteGenres"],
      allowMap: true,
      customFields: [
        { id: "favoriteGenres", name: "Favorite Genres", type: "textarea", required: false },
        { id: "readingGoal", name: "Annual Reading Goal", type: "number", required: false }
      ]
    }
  },
  {
    id: "5", 
    name: "Community Garden Collective",
    code: "GARDEN1",
    description: "Urban gardening enthusiasts and sustainability advocates",
    type: "social",
    adminId: "5",
    memberCount: 15,
    createdAt: "2024-03-15",
    settings: {
      requiredFields: ["name", "phone"],
      optionalFields: ["location", "bio", "interests", "gardeningExperience"],
      allowMap: true,
      customFields: [
        { id: "gardeningExperience", name: "Gardening Experience", type: "select", required: false, options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
        { id: "plotAssignment", name: "Plot Assignment", type: "text", required: false },
        { id: "specialties", name: "Plant Specialties", type: "textarea", required: false }
      ],
      terms: "Members are responsible for maintaining their assigned plots and contributing to community areas."
    }
  }
]

export const dummyGroupMembers: GroupMember[] = [
  // Group 1 (Sunshine Nursery Parents) - 50 total members
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
    userId: "3",
    groupId: "1",
    joinedAt: "2024-01-17",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge"],
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
    userId: "5",
    groupId: "1",
    joinedAt: "2024-01-19",
    sharedFields: ["name", "location", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "6",
    groupId: "1",
    joinedAt: "2024-01-20",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "7",
    groupId: "1",
    joinedAt: "2024-01-21",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "8",
    groupId: "1",
    joinedAt: "2024-01-22",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "9",
    groupId: "1",
    joinedAt: "2024-01-23",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "10",
    groupId: "1",
    joinedAt: "2024-01-24",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "11",
    groupId: "1",
    joinedAt: "2024-01-25",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "12",
    groupId: "1",
    joinedAt: "2024-01-26",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "13",
    groupId: "1",
    joinedAt: "2024-01-27",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "14",
    groupId: "1",
    joinedAt: "2024-01-28",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "15",
    groupId: "1",
    joinedAt: "2024-01-29",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "16",
    groupId: "1",
    joinedAt: "2024-01-30",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "17",
    groupId: "1",
    joinedAt: "2024-02-01",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "18",
    groupId: "1",
    joinedAt: "2024-02-02",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "19",
    groupId: "1",
    joinedAt: "2024-02-03",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "20",
    groupId: "1",
    joinedAt: "2024-02-04",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "21",
    groupId: "1",
    joinedAt: "2024-02-05",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "22",
    groupId: "1",
    joinedAt: "2024-02-06",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "23",
    groupId: "1",
    joinedAt: "2024-02-07",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "24",
    groupId: "1",
    joinedAt: "2024-02-08",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "25",
    groupId: "1",
    joinedAt: "2024-02-09",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "26",
    groupId: "1",
    joinedAt: "2024-02-10",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "27",
    groupId: "1",
    joinedAt: "2024-02-11",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "28",
    groupId: "1",
    joinedAt: "2024-02-12",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "29",
    groupId: "1",
    joinedAt: "2024-02-13",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "30",
    groupId: "1",
    joinedAt: "2024-02-14",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "31",
    groupId: "1",
    joinedAt: "2024-02-15",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "32",
    groupId: "1",
    joinedAt: "2024-02-16",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "33",
    groupId: "1",
    joinedAt: "2024-02-17",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "34",
    groupId: "1",
    joinedAt: "2024-02-18",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "35",
    groupId: "1",
    joinedAt: "2024-02-19",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "36",
    groupId: "1",
    joinedAt: "2024-02-20",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "37",
    groupId: "1",
    joinedAt: "2024-02-21",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "38",
    groupId: "1",
    joinedAt: "2024-02-22",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "39",
    groupId: "1",
    joinedAt: "2024-02-23",
    sharedFields: ["name", "phone", "location", "bio", "childName", "childAge", "emergencyContact"],
    role: "member"
  },
  {
    userId: "40",
    groupId: "1",
    joinedAt: "2024-02-24",
    sharedFields: ["name", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "41",
    groupId: "1",
    joinedAt: "2024-02-25",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "42",
    groupId: "1",
    joinedAt: "2024-02-26",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "43",
    groupId: "1",
    joinedAt: "2024-02-27",
    sharedFields: ["name", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "44",
    groupId: "1",
    joinedAt: "2024-02-28",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "45",
    groupId: "1",
    joinedAt: "2024-03-01",
    sharedFields: ["name", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "46",
    groupId: "1",
    joinedAt: "2024-03-02",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "47",
    groupId: "1",
    joinedAt: "2024-03-03",
    sharedFields: ["name", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "48",
    groupId: "1",
    joinedAt: "2024-03-04",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "49",
    groupId: "1",
    joinedAt: "2024-03-05",
    sharedFields: ["name", "bio", "childName", "childAge"],
    role: "member"
  },
  {
    userId: "50",
    groupId: "1",
    joinedAt: "2024-03-06",
    sharedFields: ["name", "phone", "bio", "childName", "childAge"],
    role: "member"
  },

  // Group 2 (FC Thunder Squad)
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

  // Group 3 (TechCo Remote Team)
  {
    userId: "3",
    groupId: "3",
    joinedAt: "2024-01-08", 
    sharedFields: ["name", "email", "linkedin", "website", "role", "skillsets"],
    role: "admin"
  },
  {
    userId: "1",
    groupId: "3",
    joinedAt: "2024-02-15",
    sharedFields: ["name", "email", "linkedin"],
    role: "member"
  },

  // Group 4 (Downtown Book Club)
  {
    userId: "4",
    groupId: "4",
    joinedAt: "2024-03-10",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres"],
    role: "admin"
  },
  {
    userId: "1",
    groupId: "4",
    joinedAt: "2024-03-12",
    sharedFields: ["name", "email", "bio", "interests"],
    role: "member"
  },

  // Group 5 (Community Garden Collective)
  {
    userId: "5",
    groupId: "5",
    joinedAt: "2024-03-15",
    sharedFields: ["name", "phone", "location", "bio", "gardeningExperience", "specialties"],
    role: "admin"
  },
  {
    userId: "1",
    groupId: "5",
    joinedAt: "2024-03-18",
    sharedFields: ["name", "phone", "location", "bio", "interests"],
    role: "member"
  },
  {
    userId: "1", 
    groupId: "2",
    joinedAt: "2024-02-20",
    sharedFields: ["name", "phone", "bio"],
    role: "member"
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