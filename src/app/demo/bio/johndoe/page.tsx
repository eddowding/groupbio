"use client"

import { useState } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Heart,
  Briefcase,
  Calendar,
  MessageSquare,
  Share,
  ArrowLeft,
  Users
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Dynamic import for Map component (client-side only)
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-lg animate-pulse" />
})

export default function JohnDoeBioDemo() {
  const [viewContext, setViewContext] = useState<'public' | 'professional' | 'parent' | 'soccer' | 'school'>('public')

  const bioContexts = {
    public: {
      name: "John Doe",
      title: "Product Manager & Soccer Dad",
      bio: "Tech professional by day, youth soccer coach by evening, coffee enthusiast always. Living in SF with my family. Always happy to connect!",
      location: "San Francisco",
      email: null,
      phone: null,
      linkedin: null,
      website: null,
      whatsapp: null,
      interests: ["Technology", "Youth Sports", "Community", "Coffee"],
      showEmail: false,
      showPhone: false,
      showLinkedin: false,
      showWebsite: false,
      showWhatsApp: false,
      showLocation: true,
      showMap: false,
      childAge: null,
      customFields: []
    },
    professional: {
      name: "John Doe",
      title: "Senior Product Manager",
      bio: "Building products that people love at a growing tech startup. 8 years experience in product strategy, user research, and go-to-market. Always happy to chat about product management, career growth, or the startup ecosystem.",
      location: "San Francisco Bay Area",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.dev",
      whatsapp: "+1 (555) 123-4567",
      interests: ["Product Strategy", "User Research", "Startups", "Growth Hacking", "SaaS"],
      showEmail: true,
      showPhone: false,
      showLinkedin: true,
      showWebsite: true,
      showWhatsApp: false,
      showLocation: true,
      showMap: false,
      childAge: null,
      customFields: []
    },
    parent: {
      name: "John Doe",
      title: "Emma's Dad (Grade 3, Age 8)",
      bio: "Dad to Emma who's 8 and loves soccer, art, and asking 'why' about everything! Happy to help with carpools, school events, or playdates. Work in tech but always have time for kid stuff.",
      location: "Mission District, SF (Near Dolores Park)",
      email: "john.parent@gmail.com",
      phone: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 123-4567",
      interests: ["School Volunteering", "Carpools", "Kids Activities", "Local Parks", "Coffee Meetups"],
      showEmail: true,
      showPhone: true,
      showLinkedin: false,
      showWebsite: false,
      showWhatsApp: true,
      showLocation: true,
      showMap: true,
      childAge: "8 years old",
      customFields: [
        { label: "Child's Name", value: "Emma Doe" },
        { label: "Grade", value: "3rd Grade" },
        { label: "Teacher", value: "Ms. Johnson" },
        { label: "Emergency Contact", value: "Sarah Doe (mom) - (555) 987-6543" },
        { label: "Allergies", value: "None" }
      ]
    },
    soccer: {
      name: "John Doe",
      title: "Lightning Bolts Assistant Coach",
      bio: "Assistant coach for Emma's team - the Lightning Bolts! Love helping kids develop their skills and confidence. Played college soccer and coached for 3 years. Emma's my star player (totally unbiased!).",
      location: "Practices at Dolores Park Fields",
      phone: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 123-4567",
      interests: ["Youth Coaching", "Soccer Drills", "Team Building", "Sports Psychology", "Equipment"],
      showEmail: false,
      showPhone: true,
      showLinkedin: false,
      showWebsite: false,
      showWhatsApp: true,
      showLocation: true,
      showMap: true,
      childAge: "8 years old",
      customFields: [
        { label: "Player", value: "Emma Doe (#7)" },
        { label: "Position", value: "Midfielder/Forward" },
        { label: "Experience", value: "3 years coaching" },
        { label: "Certifications", value: "SafeSport, First Aid" },
        { label: "Availability", value: "Weekends, some weekday evenings" }
      ]
    },
    school: {
      name: "John Doe", 
      title: "Room Parent • Emma's Dad",
      bio: "Room parent for Ms. Johnson's 3rd grade class and Emma's dad! Organizing field trips, coordinating class parties, and helping make this school year amazing for all our kids.",
      location: "Pickup/Dropoff Zone B",
      email: "john.parent@gmail.com",
      phone: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 123-4567",
      interests: ["Field Trips", "Class Parties", "Fundraising", "Art Projects", "Reading Programs"],
      showEmail: true,
      showPhone: true,
      showLinkedin: false,
      showWebsite: false,
      showWhatsApp: true,
      showLocation: true,
      showMap: false,
      childAge: "8 years old",
      customFields: [
        { label: "Student", value: "Emma Doe" },
        { label: "Classroom", value: "Room 15 - Ms. Johnson" },
        { label: "Role", value: "Room Parent Coordinator" },
        { label: "Volunteer Hours", value: "Available mornings & some afternoons" },
        { label: "Special Skills", value: "Event planning, design, tech setup" }
      ]
    }
  }

  const currentBio = bioContexts[viewContext]

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#ededff',
        opacity: 0.8,
        backgroundImage: 'linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(60deg, #ffffff77 25%, transparent 25.5%, transparent 75%, #ffffff77 75%, #ffffff77), linear-gradient(60deg, #ffffff77 25%, transparent 25.5%, transparent 75%, #ffffff77 75%, #ffffff77)',
        backgroundSize: '20px 35px',
        backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px'
      }}
    >
      
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 relative">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/solo" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Solo
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">GroupBio</span>
          </div>
        </div>
      </div>

      {/* Bio Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 relative flex-1">
        {/* Demo Banner with Context Selector */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary font-medium">📍 Demo Profile</span>
                <span className="text-gray-600 text-sm">- View as it appears to different groups John is a member of:</span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <Button
                variant={viewContext === 'public' ? 'default' : 'outline'}
                onClick={() => setViewContext('public')}
                className="flex items-center justify-center gap-2 h-auto py-3"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">Public</span>
              </Button>
              
              <Button
                variant={viewContext === 'professional' ? 'default' : 'outline'}
                onClick={() => setViewContext('professional')}
                className="flex items-center justify-center gap-2 h-auto py-3"
              >
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">Professional</span>
              </Button>
              
              <Button
                variant={viewContext === 'parent' ? 'default' : 'outline'}
                onClick={() => setViewContext('parent')}
                className="flex items-center justify-center gap-2 h-auto py-3"
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">Parents</span>
              </Button>
              
              <Button
                variant={viewContext === 'soccer' ? 'default' : 'outline'}
                onClick={() => setViewContext('soccer')}
                className="flex items-center justify-center gap-2 h-auto py-3"
              >
                <Heart className="h-4 w-4" />
                <span className="text-sm">Soccer</span>
              </Button>
              
              <Button
                variant={viewContext === 'school' ? 'default' : 'outline'}
                onClick={() => setViewContext('school')}
                className="flex items-center justify-center gap-2 h-auto py-3"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">School</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Bio Card */}
        <Card className="mb-6 shadow-lg relative">
          <CardContent className="pt-8">
            {/* Header */}
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="John Doe" />
                <AvatarFallback className="text-3xl bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBio.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{currentBio.title}</p>
              {currentBio.showLocation && (
                <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
                  <MapPin className="h-4 w-4" />
                  <span>{currentBio.location}</span>
                </div>
              )}
            </div>

            {/* Bio Text */}
            <div className="mb-8">
              <p className="text-gray-700 text-lg leading-relaxed text-center max-w-lg mx-auto">
                {currentBio.bio}
              </p>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {currentBio.showEmail && (
                <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              )}
              {currentBio.showPhone && (
                <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              )}
              {currentBio.showWhatsApp && (
                <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              )}
            </div>

            {/* Professional Links */}
            {(currentBio.showLinkedin || currentBio.showWebsite) && (
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Professional
                </h3>
                <div className="space-y-2">
                  {currentBio.showLinkedin && currentBio.linkedin && (
                    <a href={`https://${currentBio.linkedin}`} className="flex items-center gap-3 p-3 rounded-lg bg-[#f3f6ff] hover:bg-[#e8f0ff] transition-colors border border-[#0a66c2]/20">
                      <div className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center">
                        <Linkedin className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[#0a66c2] font-medium">LinkedIn Profile</span>
                    </a>
                  )}
                  {currentBio.showWebsite && currentBio.website && (
                    <a href={`https://${currentBio.website}`} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700 font-medium">Personal Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Map Location - Now with real map */}
            {currentBio.showMap && (
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <MapComponent 
                    lat={37.7596} 
                    lng={-122.4269} 
                    zoom={14}
                    markerText={currentBio.location}
                    height="200px"
                  />
                </div>
              </div>
            )}

            {/* Interests - Moved up before Additional Info */}
            <div className="space-y-3 mb-8">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Interests & Activities
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentBio.interests.map((interest, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Custom Fields */}
            {currentBio.customFields && currentBio.customFields.length > 0 && (
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Additional Info
                </h3>
                <div className="space-y-2">
                  {currentBio.customFields.map((field, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0">
                        {field.label}:
                      </span>
                      <span className="text-sm text-gray-800">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500 mb-6">
          <Calendar className="h-4 w-4 inline mr-1" />
          Last updated 2 hours ago
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">Want a smart profile like this?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/profile/setup">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-white">
                  Create Your Bio
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share This Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8 relative mt-auto">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">GroupBio</span>
          </div>
          <p className="text-gray-600 text-sm">One bio that adapts to every audience</p>
        </div>
      </footer>
    </div>
  )
}