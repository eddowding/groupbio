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
    phone: "+44 1225 123-456",
    location: { address: "12 Royal Crescent, Bath, UK", lat: 51.3758, lng: -2.3599 },
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
    phone: "+44 1225 456-789",
    location: { address: "15 Circus Lane, Bath, UK", lat: 51.3832, lng: -2.3668 },
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
    phone: "+44 1225 567-890",
    location: { address: "22 Pulteney Street, Bath, UK", lat: 51.3801, lng: -2.3594 },
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
    phone: "+44 1225 012-345",
    location: { address: "8 Gay Street, Bath, UK", lat: 51.3814, lng: -2.3605 },
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
    phone: "+44 1225 567-892",
    location: { address: "31 Great Pulteney Street, Bath, UK", lat: 51.3777, lng: -2.3580 },
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
    phone: "+44 1225 901-234",
    location: { address: "5 Queen Square, Bath, UK", lat: 51.3823, lng: -2.3635 },
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
    phone: "+44 1225 345-679",
    location: { address: "14 Lansdown Road, Bath, UK", lat: 51.3889, lng: -2.3622 },
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
    phone: "+44 1225 901-234",
    location: { address: "19 The Paragon, Bath, UK", lat: 51.3861, lng: -2.3644 },
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
    phone: "+44 1225 123-457",
    location: { address: "27 Marlborough Buildings, Bath, UK", lat: 51.3795, lng: -2.3615 },
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
    phone: "+44 1225 567-890",
    location: { address: "42 Rivers Street, Bath, UK", lat: 51.3844, lng: -2.3587 },
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
    phone: "+44 1225 789-012",
    location: { address: "11 Alfred Street, Bath, UK", lat: 51.3753, lng: -2.3611 },
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
    phone: "+44 1225 123-457",
    location: { address: "6 Bennett Street, Bath, UK", lat: 51.3798, lng: -2.3641 },
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
    phone: "+44 1225 567-890",
    location: { address: "18 Sydney Place, Bath, UK", lat: 51.3781, lng: -2.3564 },
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
    phone: "+44 1225 789-013",
    location: { address: "25 Camden Crescent, Bath, UK", lat: 51.3907, lng: -2.3651 },
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
    phone: "+44 1225 901-235",
    location: { address: "33 Brock Street, Bath, UK", lat: 51.3856, lng: -2.3679 },
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
    code: "GRP001",
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
    name: "Downtown Basketball League",
    code: "GRP002", 
    description: "Weekly basketball games and team social events",
    type: "sports",
    adminId: "4",
    memberCount: 15,
    createdAt: "2024-03-10",
    settings: {
      requiredFields: ["name", "email"],
      optionalFields: ["bio", "interests", "favoriteGenres"],
      allowMap: true,
      customFields: [
        { id: "position", name: "Preferred Position", type: "text", required: false },
        { id: "experience", name: "Basketball Experience", type: "select", required: false, options: ["Beginner", "Intermediate", "Advanced"] }
      ]
    }
  },
  {
    id: "3",
    name: "TechStartup Team",
    code: "GRP003",
    description: "Professional networking for tech startup founders and employees",
    type: "professional",
    adminId: "2",
    memberCount: 25,
    createdAt: "2024-02-01",
    settings: {
      requiredFields: ["name", "email", "phone"],
      optionalFields: ["bio", "interests", "linkedin", "website"],
      allowMap: true,
      customFields: [
        { id: "company", name: "Company Name", type: "text", required: false },
        { id: "role", name: "Job Title", type: "text", required: false },
        { id: "techStack", name: "Tech Stack", type: "textarea", required: false }
      ]
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

  // Group 2 (Downtown Book Club)
  {
    userId: "4",
    groupId: "2",
    joinedAt: "2024-03-10",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "admin"
  },
  {
    userId: "1",
    groupId: "2",
    joinedAt: "2024-03-12",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "6",
    groupId: "2",
    joinedAt: "2024-03-14",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "11",
    groupId: "2",
    joinedAt: "2024-03-16",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "16",
    groupId: "2",
    joinedAt: "2024-03-18",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "20",
    groupId: "2",
    joinedAt: "2024-03-20",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "24",
    groupId: "2",
    joinedAt: "2024-03-22",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "30",
    groupId: "2",
    joinedAt: "2024-03-24",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "32",
    groupId: "2",
    joinedAt: "2024-03-26",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "36",
    groupId: "2",
    joinedAt: "2024-03-28",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "38",
    groupId: "2",
    joinedAt: "2024-03-30",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "42",
    groupId: "2",
    joinedAt: "2024-04-01",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "46",
    groupId: "2",
    joinedAt: "2024-04-03",
    sharedFields: ["name", "email", "bio", "interests", "location"],
    role: "member"
  },
  {
    userId: "48",
    groupId: "2",
    joinedAt: "2024-04-05",
    sharedFields: ["name", "email", "bio", "interests", "favoriteGenres", "location"],
    role: "member"
  },
  {
    userId: "50",
    groupId: "2",
    joinedAt: "2024-04-07",
    sharedFields: ["name", "email", "bio", "interests", "location"],
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
  // Group 2 (Downtown Book Club) documents
  {
    id: "2",
    groupId: "2",
    title: "Welcome to Downtown Book Club",
    content: "# Welcome to Our Literary Community! 📚\n\nWelcome to the Downtown Book Club! We're a passionate group of readers who love exploring diverse stories and engaging in thoughtful discussions.\n\n## About Us\nFounded in March 2024, we meet monthly to discuss our selected books. Our members bring different perspectives and reading experiences, making for rich conversations.\n\n## What We Offer\n- Monthly book discussions\n- Author events and readings\n- Book swaps and recommendations\n- Literary-themed social events\n- Online discussion forum\n\n## Meeting Details\n- **When**: Second Saturday of each month, 2:00 PM\n- **Where**: Downtown Public Library, Community Room B\n- **Duration**: 2 hours with optional coffee after\n\n## Getting Started\n1. Join our WhatsApp group for updates\n2. Check out our current book selection\n3. Attend your first meeting (newcomers always welcome!)\n4. Consider hosting a future discussion\n\nLooking forward to many great book discussions together!",
    lastModified: "2024-03-10",
    lastModifiedBy: "Emma Thompson",
    category: "general"
  },
  {
    id: "3",
    groupId: "2",
    title: "Book Club Guidelines & Etiquette",
    content: "# Book Club Guidelines 📖\n\n## Discussion Rules\n- **Respect all opinions**: Every member's perspective is valuable\n- **No spoilers**: Always warn before discussing plot points\n- **Stay on topic**: Keep discussions focused on the current book\n- **Active listening**: Let everyone share their thoughts\n- **Be prepared**: Try to finish the book before our meeting\n\n## Meeting Etiquette\n- Arrive on time or message the group\n- Turn phones to silent during discussions\n- Bring your copy of the book for reference\n- Take turns speaking - don't dominate the conversation\n- Ask questions to encourage participation\n\n## Book Selection Process\n1. Suggestions are collected monthly\n2. We vote democratically on 3 finalist books\n3. Consider diverse authors and genres\n4. Keep books under 400 pages when possible\n5. Avoid books members have recently read\n\n## Hosting Guidelines\nWhen it's your turn to host a discussion:\n- Prepare 5-7 discussion questions\n- Research the author's background\n- Bring snacks or refreshments (optional)\n- Keep discussion flowing and inclusive\n- Send recap notes to the group afterward\n\n## Library Partnership\nThanks to our partnership with Downtown Public Library:\n- Multiple copies available for checkout\n- Quiet discussion space reserved monthly\n- Access to author biography resources\n- Book club discount at library café",
    lastModified: "2024-03-12",
    lastModifiedBy: "Emma Thompson",
    category: "rules"
  },
  {
    id: "4",
    groupId: "2",
    title: "2024 Reading Schedule",
    content: "# 2024 Reading Calendar 📅\n\n## Completed Books\n\n### March - \"The Seven Husbands of Evelyn Hugo\" by Taylor Jenkins Reid\n- **Discussion Date**: March 16, 2024\n- **Host**: Emma Thompson\n- **Rating**: ⭐⭐⭐⭐⭐ (Group average: 4.2/5)\n- **Notes**: Fantastic debut book! Great discussion about Hollywood glamour and hidden truths.\n\n## Upcoming Books\n\n### April - \"Klara and the Sun\" by Kazuo Ishiguro\n- **Discussion Date**: April 13, 2024\n- **Host**: John Doe (volunteered!)\n- **Genre**: Science Fiction/Literary Fiction\n- **Pages**: 303\n- **Why we chose it**: Exploration of AI consciousness and human connection\n\n### May - \"The Midnight Library\" by Matt Haig\n- **Discussion Date**: May 11, 2024\n- **Host**: TBD\n- **Genre**: Contemporary Fiction/Philosophy\n- **Pages**: 288\n- **Why we chose it**: Thought-provoking concept about life choices\n\n### June - \"Educated\" by Tara Westover\n- **Discussion Date**: June 8, 2024\n- **Host**: TBD\n- **Genre**: Memoir\n- **Pages**: 334\n- **Why we chose it**: Powerful story of education and family\n\n## Book Selection Ideas for Later\n- \"Circe\" by Madeline Miller\n- \"The Invisible Bridge\" by Julie Orringer\n- \"Homegoing\" by Yaa Gyasi\n- \"The Silent Patient\" by Alex Michaelides\n- \"Anxious People\" by Fredrik Backman\n\n## Special Events\n- **May 25**: Author reading at Bookstore Downtown (optional group outing)\n- **July**: Summer picnic with book swap\n- **December**: Holiday party and book gift exchange",
    lastModified: "2024-03-25",
    lastModifiedBy: "John Doe",
    category: "general"
  },
  {
    id: "5",
    groupId: "2",
    title: "Discussion Questions: Klara and the Sun",
    content: "# Discussion Questions: \"Klara and the Sun\" 🤖\n\n*For our April 13th meeting - hosted by John*\n\n## Character & Perspective Questions\n1. What did you think of Ishiguro's choice to tell the story from Klara's perspective? How did this affect your reading experience?\n\n2. How did Klara's understanding of the world differ from human understanding? What did this reveal about both AI and human nature?\n\n3. Discuss Josie's character development. How did her illness shape her relationships and worldview?\n\n4. What role did the Mother play in the story? How did her fears and hopes drive the plot?\n\n## Themes & Ideas\n5. What does the novel suggest about the nature of love and sacrifice? Consider both Klara's sacrifices and those made by the human characters.\n\n6. How does the book explore themes of faith and belief? What different belief systems do we see?\n\n7. Discuss the concept of \"being lifted\" - what are the social implications of this genetic enhancement?\n\n8. What does the sun represent in the novel? How do different characters relate to it?\n\n## Broader Discussion\n9. How realistic did you find Ishiguro's vision of AI companionship? What aspects seemed most/least believable?\n\n10. What ethical questions does the book raise about AI consciousness and rights?\n\n11. How does this book compare to other AI fiction you've read or seen?\n\n12. What do you think the ending suggests about Klara's future and the nature of memory?\n\n## Fun Questions\n- If you could have an Artificial Friend like Klara, would you want one?\n- Which scene or passage affected you most emotionally?\n- What questions would you ask Kazuo Ishiguro about this book?\n\n*Bring your favorite quotes to share!*",
    lastModified: "2024-03-28",
    lastModifiedBy: "John Doe",
    category: "resources"
  },
  {
    id: "6",
    groupId: "2",
    title: "Book Recommendations & Reviews",
    content: "# Member Book Recommendations 💎\n\n*Books recommended by our members (not for club reading, just personal suggestions)*\n\n## Emma's Picks\n**\"The Atlas Six\" by Olivie Blake**\n- Genre: Dark Academia/Fantasy\n- Emma's review: \"Mind-bending magic system and complex characters. Perfect if you loved 'The Secret History'\"\n- Rating: ⭐⭐⭐⭐\n\n**\"Mexican Gothic\" by Silvia Moreno-Garcia**\n- Genre: Gothic Horror\n- Emma's review: \"Atmospheric and creepy. Great blend of horror and historical fiction.\"\n- Rating: ⭐⭐⭐⭐⭐\n\n## John's Picks\n**\"Project Hail Mary\" by Andy Weir**\n- Genre: Science Fiction\n- John's review: \"If you liked 'The Martian', you'll love this. Humor, science, and heart.\"\n- Rating: ⭐⭐⭐⭐⭐\n\n**\"The Thursday Murder Club\" by Richard Osman**\n- Genre: Mystery/Cozy Crime\n- John's review: \"Delightful characters and clever mysteries. Perfect comfort read.\"\n- Rating: ⭐⭐⭐⭐\n\n## Genre Wishlists\n\n### Historical Fiction Lovers\n- \"The Nightingale\" by Kristin Hannah\n- \"All the Light We Cannot See\" by Anthony Doerr\n- \"The Book Thief\" by Markus Zusak\n\n### Mystery/Thriller Fans\n- \"Gone Girl\" by Gillian Flynn\n- \"The Girl with the Dragon Tattoo\" by Stieg Larsson\n- \"In the Woods\" by Tana French\n\n### Literary Fiction\n- \"A Little Life\" by Hanya Yanagihara\n- \"The Goldfinch\" by Donna Tartt\n- \"Normal People\" by Sally Rooney\n\n### Non-Fiction\n- \"Sapiens\" by Yuval Noah Harari\n- \"Born a Crime\" by Trevor Noah\n- \"Wild\" by Cheryl Strayed\n\n## Book Swap Corner\n*Available for borrowing from members:*\n- \"Where the Crawdads Sing\" - Emma\n- \"The Vanishing Half\" - John\n- \"Dune\" (complete series) - Emma\n- \"Becoming\" by Michelle Obama - John\n\n*Want to add your books to the swap? Message the group!*",
    lastModified: "2024-03-30",
    lastModifiedBy: "Emma Thompson",
    category: "resources"
  },
  {
    id: "7",
    groupId: "2",
    title: "Frequently Asked Questions",
    content: "# Book Club FAQ ❓\n\n## Getting Started\n\n**Q: I'm new to book clubs. What should I expect?**\nA: Book clubs are relaxed, friendly discussions! Come with an open mind, and don't worry if you haven't finished the book - we welcome all levels of participation.\n\n**Q: What if I didn't like the book?**\nA: That's perfectly fine! Differing opinions make for the best discussions. We value honest perspectives.\n\n**Q: Do I need to prepare anything before meetings?**\nA: Just read (or attempt to read) the book. If you want to take notes or mark passages, great! But it's not required.\n\n## Practical Questions\n\n**Q: What if I can't make a meeting?**\nA: No problem! We understand life happens. We'll send you a summary of the discussion.\n\n**Q: How are books chosen?**\nA: Members suggest books, we vote democratically, and try to rotate genres to keep things interesting.\n\n**Q: Can I bring a friend?**\nA: Absolutely! New members are always welcome. Just give us a heads up so we know to expect them.\n\n**Q: What about refreshments?**\nA: The host usually provides light snacks, but it's not required. We sometimes grab coffee together after meetings.\n\n## Book Selection\n\n**Q: How long should books be?**\nA: We try to keep them under 400 pages when possible, but we make exceptions for exceptional books.\n\n**Q: What genres do we read?**\nA: We read everything! Literary fiction, mysteries, sci-fi, memoirs, historical fiction - variety is key.\n\n**Q: Can we read classics?**\nA: Yes! We love revisiting classics with fresh eyes and adult perspectives.\n\n## Group Dynamics\n\n**Q: What if someone dominates the conversation?**\nA: Our hosts are trained to facilitate inclusive discussions. We encourage everyone to participate.\n\n**Q: Is there homework besides reading?**\nA: Nope! Just show up ready to chat about the book.\n\n**Q: How big is the group?**\nA: We currently have 8 active members, which is perfect for intimate discussions.\n\n*Have other questions? Don't hesitate to ask in our group chat!*",
    lastModified: "2024-03-15",
    lastModifiedBy: "Emma Thompson",
    category: "faq"
  },
  // Additional docs for Sunshine Nursery Parents (Group 1)
  {
    id: "10",
    groupId: "1",
    title: "Emergency Contact Information",
    content: "# Emergency Contact Information 🚨\n\n## School Emergency Contacts\n**Sunshine Nursery School**\n- Main Office: (555) 123-4567\n- Director Sarah Matthews: (555) 123-4568\n- Assistant Director Mike Johnson: (555) 123-4569\n\n**After Hours Emergency**\n- School Emergency Line: (555) 123-HELP\n- Available 24/7 for urgent school-related matters\n\n## Medical Emergency\n- **Call 911 immediately for any life-threatening emergency**\n- Children's Hospital: (555) 234-5678\n- Poison Control: 1-800-222-1222\n\n## Parent Coordinators\n**Class Representatives:**\n- Morning Class (9am-12pm): Lisa Rodriguez (555) 567-8901\n- Afternoon Class (1pm-4pm): James Miller (555) 678-9012\n- Extended Day: Rachel Kim (555) 789-0123\n\n## Pickup Authorization\nReminder: Only authorized individuals can pick up your child. Update your pickup list with the office if you need to make changes.\n\n## Weather-Related Closures\n- Check school website: sunshirenursery.edu\n- Text alerts sent to all parents\n- Follow @SunshineNursery on social media\n\n## Important: Keep this information easily accessible!",
    lastModified: "2024-03-20",
    lastModifiedBy: "Lisa Rodriguez",
    category: "resources"
  },
  {
    id: "11",
    groupId: "1",
    title: "Daily Schedule & Drop-off Procedures",
    content: "# Daily Schedule & Procedures ⏰\n\n## Morning Routine (9:00 AM Start)\n**8:45-9:00 AM: Drop-off Window**\n- Use main entrance only\n- Sign your child in at the front desk\n- Help child hang up backpack and lunch\n- Give hugs and say goodbye quickly (helps with separation!)\n\n## Daily Schedule\n**9:00-9:30 AM**: Circle time and morning songs\n**9:30-10:15 AM**: Free play stations\n**10:15-10:30 AM**: Snack time\n**10:30-11:15 AM**: Outdoor play (weather permitting)\n**11:15-11:45 AM**: Art & crafts\n**11:45 AM-12:00 PM**: Story time and cleanup\n\n## Pickup Procedures\n**12:00-12:15 PM: Pickup Window**\n- Wait in designated pickup area\n- Staff will call your child when you arrive\n- Sign child out at front desk\n- Collect any artwork or notes from teachers\n\n## Extended Day Program\n- Available until 4:00 PM\n- Includes lunch and quiet time\n- Additional activities: music, movement, nature exploration\n\n## What to Bring Daily\n- Named water bottle\n- Healthy snack in labeled container\n- Extra clothes in labeled bag\n- Comfort item if needed\n- Lunch (extended day children only)\n\n## Parking Notes\n- Please use visitor parking spots\n- Do not block fire lanes\n- Be mindful of neighbors when dropping off\n- Carpool arrangements welcome!",
    lastModified: "2024-02-28",
    lastModifiedBy: "Sarah Matthews",
    category: "general"
  },
  {
    id: "12",
    groupId: "1",
    title: "Birthday Party Guidelines",
    content: "# Birthday Party Guidelines 🎂\n\n## School Birthday Celebrations\n**Classroom Celebrations**\n- Simple treats welcomed (nut-free required)\n- Coordinate with teacher at least 1 week ahead\n- Suggested items: mini cupcakes, fruit cups, or crackers\n- Special birthday crown provided by school\n- Songs and celebration during snack time\n\n## Outside Party Invitations\n**Invitation Distribution Policy**\n- If inviting entire class: distribute at school freely\n- If inviting select children: send invitations privately\n- Please don't distribute partial-class invitations at school\n\n## Party Planning Tips\n**Age-Appropriate Activities** (Ages 3-5)\n- Keep parties to 1.5-2 hours max\n- Simple games: musical chairs, freeze dance, treasure hunt\n- Craft activity: decorating picture frames or cookies\n- Avoid overstimulating activities\n\n**Timing Recommendations**\n- Weekend afternoons work best (2-4 PM)\n- Avoid nap times (12-2 PM typically)\n- Consider multiple mini-parties for large invite lists\n\n## Gift Guidelines\n- No pressure for expensive gifts\n- Suggested budget: $10-15\n- Books, art supplies, and puzzles are always hits\n- Gift receipts appreciated by parents\n\n## RSVPs & Planning\n- Always RSVP by requested date\n- Include any dietary restrictions/allergies\n- Confirm pickup time and location\n- Exchange contact info with hosting parents\n\n## Sibling Considerations\n- Ask if siblings are welcome before bringing them\n- Some parties are child-only events\n- Offer to help if bringing additional children\n\n**Remember: The goal is fun, not perfection! 🎉**",
    lastModified: "2024-03-18",
    lastModifiedBy: "Emma Thompson",
    category: "general"
  },
  {
    id: "13",
    groupId: "1",
    title: "Carpool Coordination",
    content: "# Carpool Coordination 🚗\n\n## Current Carpool Groups\n\n**North Side Route** (Coordinator: James Miller)\n- James Miller (555) 678-9012\n- Rachel Kim (555) 789-0123\n- Tom Anderson (555) 890-1234\n- Maria Garcia (555) 901-2345\n\n**East Side Route** (Coordinator: Lisa Rodriguez)\n- Lisa Rodriguez (555) 567-8901\n- Steven Lee (555) 012-3456\n- Amanda Davis (555) 123-4568\n- Chris Johnson (555) 234-5679\n\n**West Side Route** (Coordinator: David Park)\n- David Park (555) 789-0123\n- Nicole Brown (555) 345-6790\n- Robert Taylor (555) 456-7891\n- Jessica White (555) 567-8902\n\n## How Carpool Works\n- Each family takes one week per month\n- Morning pickup starts at 8:30 AM\n- Afternoon dropoff after 12:15 PM\n- Extended day pickup at 4:00 PM\n\n## Carpool Guidelines\n**Safety First**\n- All children must use car seats/boosters\n- Driver must have valid license and insurance\n- Emergency contact info shared among group\n- No more than planned number of children\n\n**Communication**\n- Confirm pickup day before your week\n- Text group if running late (even 5 minutes)\n- Share any route changes in advance\n- Notify group of sick days immediately\n\n## Backup Plans\n- Each carpool has 1-2 backup drivers\n- School has list of authorized pickup people\n- Emergency contact tree established\n\n## Want to Join or Start a Carpool?\nContact your area coordinator or John Doe (555) 123-4567 to get connected with families in your area.\n\n**Benefits of Carpooling:**\n- Reduces daily driving\n- Builds friendships between families  \n- Helps in emergencies\n- Environmentally friendly\n- Kids love riding together!",
    lastModified: "2024-03-22",
    lastModifiedBy: "James Miller",
    category: "resources"
  },
  {
    id: "14",
    groupId: "1",
    title: "Volunteer Opportunities",
    content: "# Volunteer Opportunities 🙋‍♀️\n\n## Current Volunteer Needs\n\n**Weekly Opportunities**\n- **Reading Volunteers**: Tuesday & Thursday 10:30-11:00 AM\n- **Garden Helpers**: Friday mornings (seasonal)\n- **Library Organization**: Ongoing, flexible schedule\n- **Playground Maintenance**: Saturday mornings monthly\n\n**Special Events**\n- **Spring Fair Committee** (April 20)\n  - Setup crew needed Friday evening\n  - Game booth volunteers Saturday 10 AM-2 PM\n  - Cleanup crew Saturday 2-4 PM\n\n- **Field Day Helpers** (May 15)\n  - Station leaders for outdoor games\n  - Snack coordination\n  - First aid volunteer (certification required)\n\n## Monthly Commitments\n\n**Room Parent Coordinators** (Still needed for 2 classes)\n- Organize class parties and celebrations\n- Coordinate teacher appreciation gifts\n- Communicate school news to class families\n- Time commitment: 2-3 hours monthly\n\n**Fundraising Committee**\n- Plan and execute 2-3 fundraising events yearly\n- Research grant opportunities\n- Coordinate with local businesses for donations\n- Meets monthly on first Tuesday\n\n## Skills-Based Volunteering\n\n**Marketing & Communications**\n- Social media management\n- Newsletter design\n- Website updates\n- Photography at events\n\n**Professional Services**\n- Legal advice (pro bono)\n- Accounting/bookkeeping support\n- IT and technical support\n- Grant writing assistance\n\n## How to Sign Up\n1. Contact volunteer coordinator Sarah Wilson (555) 234-5678\n2. Fill out volunteer application (background check required)\n3. Attend brief orientation session\n4. Choose opportunities that fit your schedule\n\n## Volunteer Appreciation\n- Monthly volunteer breakfast\n- End-of-year appreciation dinner\n- Volunteer appreciation certificates\n- Priority enrollment for returning families\n\n**Every contribution matters - thank you for supporting our school community! 💚**",
    lastModified: "2024-03-25",
    lastModifiedBy: "Sarah Wilson",
    category: "general"
  },
  {
    id: "15",
    groupId: "1",
    title: "Meal Planning & Allergy Information",
    content: "# Meal Planning & Allergy Information 🥙\n\n## School Allergy Policy\n**Nut-Free Environment**\n- NO tree nuts or peanuts in any school meals\n- Check all packaged foods for \"may contain\" warnings\n- Common hidden sources: granola bars, cookies, bread\n- Alternative proteins: sunflower seed butter, soy butter\n\n## Current Class Allergies (Confidential - Parents Only)\n- **Severe nut allergy**: 3 children\n- **Dairy sensitivity**: 2 children  \n- **Gluten intolerance**: 1 child\n- **Egg allergy**: 1 child\n\n## Healthy Snack Ideas\n\n**Protein Options**\n- String cheese (if no dairy allergies in class)\n- Hard-boiled eggs (check with teacher first)\n- Hummus with vegetables\n- Sunflower seed butter with crackers\n\n**Fresh Fruits**\n- Apple slices with cinnamon\n- Berries (strawberries, blueberries, grapes - halved)\n- Banana with sunflower seed butter\n- Orange segments\n\n**Vegetable Options**\n- Carrot sticks with ranch dip\n- Cucumber rounds\n- Cherry tomatoes (halved)\n- Bell pepper strips\n\n**Whole Grains**\n- Whole grain crackers\n- Mini rice cakes\n- Homemade muffins (nut-free recipes available)\n- Pretzels\n\n## Lunch Ideas (Extended Day)\n\n**Sandwich Alternatives**\n- Sunbutter and jelly\n- Cream cheese and cucumber\n- Turkey and avocado wrap\n- Hummus and veggie pita\n\n**Hot Lunch Options**\n- Thermos soups (chicken noodle, tomato)\n- Mac and cheese (dairy-free version available)\n- Quesadillas (check cheese allergies)\n- Leftover dinner portions\n\n## Party & Celebration Foods\n**Always Safe Options**\n- Fresh fruit kabobs\n- Veggie tray with safe dips\n- Rice crackers with safe toppings\n- Homemade treats (recipe sharing encouraged)\n\n## Emergency Procedures\n- EpiPens stored in office and with child\n- All staff trained in allergy response\n- Emergency action plans posted in each classroom\n- Substitute teachers briefed on all allergies\n\n**Questions about allergies? Contact school nurse Jennifer Adams (555) 123-4570**",
    lastModified: "2024-03-15",
    lastModifiedBy: "Jennifer Adams",
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