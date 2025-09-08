"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/layout/navbar"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { 
  User, 
  Shield, 
  Settings, 
  MessageSquare, 
  CheckCircle, 
  ChevronRight,
  Users,
  MapPin,
  Briefcase,
  Heart,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  Mail,
  Linkedin,
  Crown,
  FileText,
  Search,
  Globe,
  Calendar,
  Share,
  ArrowLeft
} from "lucide-react"

// Dynamic import for Map component (client-side only)
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-lg animate-pulse" />
})

export default function SoloPage() {
  const [activeContext, setActiveContext] = useState<'work' | 'parent' | 'social'>('work')
  const [viewContext, setViewContext] = useState<'public' | 'professional' | 'parent' | 'soccer' | 'school'>('public')

  const testimonials = [
    {
      text: "Finally! I'm not just 'Emma from accounting' anymore. My work group sees my professional side, my kid's school sees parent me. It's brilliant.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b4?w=150&h=150&fit=crop&crop=face",
      name: "Emma Chen",
      role: "Marketing Manager at Stripe & Soccer Mom",
    },
    {
      text: "I was always 'that guy who never talks' in groups. Now people know I'm into photography and hiking - started three new friendships!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", 
      name: "Marcus Thompson",
      role: "Software Developer at Google",
    },
    {
      text: "Love how I can share my LinkedIn with professional groups but keep it private from my book club. Perfect control.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Rodriguez", 
      role: "HR Director at Microsoft",
    },
    {
      text: "No more awkward 'Sorry, who is this again?' moments. Everyone knows I'm the parent coordinator now.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "David Park",
      role: "Product Manager at Meta & Parent Coordinator",
    },
    {
      text: "Game changer for networking. People can actually find me based on my skills and interests, not just remember my name.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Martinez",
      role: "Senior Designer at Airbnb", 
    },
    {
      text: "I'm in 8 different WhatsApp groups and I'm a different version of myself in each. This finally makes that work seamlessly.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      name: "James Wilson",
      role: "Engineering Lead at Uber",
    }
  ]

  const contextData = {
    work: {
      name: "Alex Chen",
      title: "Senior Product Manager",
      company: "TechStartup Co",
      bio: "Leading product strategy for AI-powered analytics. 8 years in product management, Stanford MBA.",
      fields: [
        { icon: Briefcase, label: "Company", value: "TechStartup Co", visible: true },
        { icon: User, label: "Role", value: "Senior Product Manager", visible: true },
        { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexchen", visible: true },
        { icon: Mail, label: "Work Email", value: "alex@techstartup.co", visible: true },
        { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", visible: false },
        { icon: MapPin, label: "Location", value: "San Francisco, CA", visible: true }
      ]
    },
    parent: {
      name: "Alex Chen", 
      title: "Parent of Emma (Grade 3)",
      company: null,
      bio: "Working parent of an 8-year-old who loves soccer and art. Happy to help with carpools and class events!",
      fields: [
        { icon: User, label: "Child", value: "Emma Chen (Grade 3)", visible: true },
        { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", visible: true },
        { icon: Mail, label: "Email", value: "alex.chen.parent@gmail.com", visible: true },
        { icon: MapPin, label: "Location", value: "Mission District", visible: true },
        { icon: Heart, label: "Interests", value: "Soccer, Art Classes, Hiking", visible: true },
        { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexchen", visible: false }
      ]
    },
    social: {
      name: "Alex",
      title: "Photography Enthusiast", 
      company: null,
      bio: "Weekend warrior with a camera. Love capturing street scenes and nature. Always up for photo walks!",
      fields: [
        { icon: Heart, label: "Interests", value: "Photography, Hiking, Coffee", visible: true },
        { icon: MapPin, label: "Location", value: "SF Bay Area", visible: true },
        { icon: Mail, label: "Email", value: "alex.photos@gmail.com", visible: true },
        { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", visible: false },
        { icon: Briefcase, label: "Work", value: "TechStartup Co", visible: false },
        { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexchen", visible: false }
      ]
    }
  }

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

  const currentContext = contextData[activeContext]
  const currentBio = bioContexts[viewContext]

  return (
    <div className="min-h-screen hero-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        <ParticlesBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-900 leading-tight">
              One bio that adapts to <span className="text-primary">every audience</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-600 mb-8 leading-relaxed">
              Show the right you to the right people—automatically.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              Professional with colleagues. Personal with friends. Parent-focused with school groups. 
              One profile that's always perfectly appropriate for the situation.
            </p>

            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="text-primary font-medium">Perfect for</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">WhatsApp</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Instagram</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Slack groups</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/profile/setup">
              <Button size="lg" className="text-xl px-12 py-6 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                Create Your Smart Bio
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 hover:bg-primary/10 hover:border-primary rounded-full">
              Watch 30-second Demo
            </Button>
          </div>

        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-green-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              See it in action
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Experience how one profile adapts to different audiences. Try switching between the different contexts below to see how John's profile changes for each group he's part of.
            </p>
          </div>

          {/* Demo Profile Container */}
          <div className="max-w-4xl mx-auto">
            {/* Context Selector */}
            <div className="mb-8 bg-green-700/50 border border-green-600 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <Button
                  variant={viewContext === 'public' ? 'default' : 'outline'}
                  onClick={() => setViewContext('public')}
                  className={`flex items-center justify-center gap-2 h-auto py-3 transition-all ${
                    viewContext === 'public' 
                      ? 'bg-white text-green-800 hover:bg-gray-50 border-0' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-green-800'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">Public</span>
                </Button>
                
                <Button
                  variant={viewContext === 'professional' ? 'default' : 'outline'}
                  onClick={() => setViewContext('professional')}
                  className={`flex items-center justify-center gap-2 h-auto py-3 transition-all ${
                    viewContext === 'professional' 
                      ? 'bg-white text-green-800 hover:bg-gray-50 border-0' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-green-800'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm">Professional</span>
                </Button>
                
                <Button
                  variant={viewContext === 'parent' ? 'default' : 'outline'}
                  onClick={() => setViewContext('parent')}
                  className={`flex items-center justify-center gap-2 h-auto py-3 transition-all ${
                    viewContext === 'parent' 
                      ? 'bg-white text-green-800 hover:bg-gray-50 border-0' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-green-800'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Parents</span>
                </Button>
                
                <Button
                  variant={viewContext === 'soccer' ? 'default' : 'outline'}
                  onClick={() => setViewContext('soccer')}
                  className={`flex items-center justify-center gap-2 h-auto py-3 transition-all ${
                    viewContext === 'soccer' 
                      ? 'bg-white text-green-800 hover:bg-gray-50 border-0' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-green-800'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Soccer</span>
                </Button>
                
                <Button
                  variant={viewContext === 'school' ? 'default' : 'outline'}
                  onClick={() => setViewContext('school')}
                  className={`flex items-center justify-center gap-2 h-auto py-3 transition-all ${
                    viewContext === 'school' 
                      ? 'bg-white text-green-800 hover:bg-gray-50 border-0' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-green-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">School</span>
                </Button>
              </div>
            </div>

            {/* Main Bio Card */}
            <Card className="shadow-2xl border-0">
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

                {/* Map Location */}
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

                {/* Interests */}
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

                {/* Last Updated */}
                <div className="text-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Last updated 2 hours ago
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Pillars Value Proposition */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              The smart way to share yourself
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finally, a bio tool that understands you have different sides for different people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Context-Aware</h3>
              <p className="text-gray-600 text-lg">
                Shows the right info to the right people. Your work colleagues see your professional side, your kid's soccer team sees parent you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Privacy-First</h3>
              <p className="text-gray-600 text-lg">
                You control what each group sees. Share your LinkedIn with colleagues, keep it private from your book club.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Group-Ready</h3>
              <p className="text-gray-600 text-lg">
                Built for communities, not just broadcasting. Perfect for WhatsApp groups, Slack teams, and real connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 mb-6">Trusted by employees at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-700">Google</div>
              <div className="text-2xl font-bold text-gray-700">Microsoft</div>
              <div className="text-2xl font-bold text-gray-700">Meta</div>
              <div className="text-2xl font-bold text-gray-700">Stripe</div>
              <div className="text-2xl font-bold text-gray-700">Airbnb</div>
              <div className="text-2xl font-bold text-gray-700">Uber</div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Data Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-600" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 feature-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Stop oversharing with the wrong people
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your LinkedIn shouldn't go to your kid's soccer team. Your TikTok shouldn't go to your boss. 
            But with traditional bio tools, it's all or nothing.
          </p>
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <p className="text-lg text-gray-700">
              GroupBio creates smart profiles that automatically show relevant information 
              based on who's looking and where they found you.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Set up once, works everywhere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create different versions of your profile—Professional, Personal, Parent, Social—or let our smart system suggest what to show based on context.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <ChevronRight className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Share with confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Send different links for different situations, or use our smart link that automatically adapts. Your work contact info goes to colleagues, your personal interests go to friends.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Privacy that actually makes sense</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Granular controls mean you decide exactly what each audience sees. No more choosing between "public everything" or "private everything."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Case Carousel Section */}
      <section className="py-20 px-4 feature-section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Perfect for every situation
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who are already using GroupBio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="hover:shadow-lg transition-shadow bg-white group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Consultants & Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  Share your portfolio with clients, experience with networks, personal side with friends.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Parent Groups & Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  Connect with other parents while keeping work and personal life separate.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Sports Teams & Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  Share contact info and availability with teammates, keep everything else private.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Professional Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  Show LinkedIn and experience to colleagues, interests and personality to social groups.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Community Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  Share relevant location and volunteer info while maintaining personal privacy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform integration showcase */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">2-minute setup, lifetime of better connections</h3>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <MessageSquare className="h-6 w-6" />
                <span className="text-lg font-medium">WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-6 w-6" />
                <span className="text-lg font-medium">Instagram</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-6 w-6" />
                <span className="text-lg font-medium">Slack</span>
              </div>
            </div>
            <p className="text-gray-600">Share offline with QR codes • Works on any device • No app required</p>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Know your impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand who's connecting with you and what information resonates most
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">See who's viewing your profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Track profile views by group and context. Know which communities are most engaged with your bio.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Track which groups engage most</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Discover which groups are most active with your profile and optimize your information accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Know what information resonates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  See which contact methods and interests generate the most engagement across different contexts.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Make data-driven connections</h3>
              <p className="text-gray-600 mb-6">
                Unlike traditional bio tools, GroupBio shows you exactly how your profile performs across different audiences, 
                helping you optimize for better connections.
              </p>
              <Badge variant="secondary" className="text-primary font-medium px-4 py-2">
                Coming Soon: Advanced Analytics
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* More Than Just Bio */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              More than just a smart bio
            </h2>
            <p className="text-xl text-gray-600">
              Group features that actually help
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Shared maps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">for carpools and meetups</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Group wikis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">for schedules and resources</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Member search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">by interests and location</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">WhatsApp integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Seamless connection</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Built for real relationships</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlike static bio tools, GroupBio helps you build actual connections within your communities.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Process */}
      <section className="py-20 px-4 feature-section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Simple setup, powerful results
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create your profile</h3>
              <p className="text-gray-600">Add your info once with privacy controls</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Set contexts</h3>
              <p className="text-gray-600">Choose what to share with work, friends, family, etc.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Share smartly</h3>
              <p className="text-gray-600">Use context-specific links or our adaptive smart link</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build community</h3>
              <p className="text-gray-600">Join or create groups that need more than just chat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 testimonial-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Join thousands who've stopped being mystery numbers
            </h2>
          </div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] overflow-hidden">
            <TestimonialsColumn 
              testimonials={testimonials.slice(0, 2)} 
              duration={15} 
            />
            <TestimonialsColumn 
              testimonials={testimonials.slice(2, 4)} 
              className="hidden md:block" 
              duration={19} 
            />
            <TestimonialsColumn 
              testimonials={testimonials.slice(4, 6)} 
              className="hidden lg:block" 
              duration={17} 
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Pricing that makes sense
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free, upgrade only when you need to create groups for others
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Personal Plan */}
            <Card className="bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow relative">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mx-auto mb-4 px-3 py-1">Most Popular</Badge>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Personal</CardTitle>
                <div className="text-5xl font-bold text-primary mb-2">FREE</div>
                <div className="text-gray-600">Forever</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Unlimited contexts and audiences</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Smart links that adapt automatically</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Granular privacy controls</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Join unlimited groups</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">QR code sharing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Basic analytics</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white">
                    Get Started Free
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 hover:shadow-xl transition-shadow relative">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4 px-3 py-1 bg-primary text-white">For Leaders</Badge>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pro</CardTitle>
                <div className="text-5xl font-bold text-primary mb-2">$5</div>
                <div className="text-gray-600">per year</div>
                <div className="text-sm text-gray-500 mt-2">Less than 50¢/month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 mb-4 font-medium">Everything in Personal, plus:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Create unlimited groups</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Group management tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Custom group branding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Perfect for individuals who want to join groups. Upgrade only if you want to create and manage groups for others.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No setup fees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                30-day money back guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Linktree Comparison */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Why not just use Linktree?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Great question! Here's why thousands are choosing GroupBio instead
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Linktree</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700">One static bio for everyone</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700">No privacy controls by audience</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700">Built for broadcasting, not groups</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700">Expensive for basic features</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700">Generic, branded experience</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">GroupBio</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-700">Context-aware profiles that adapt</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-700">Granular privacy by group</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-700">Perfect for WhatsApp groups & communities</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-700">Free forever for personal use</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-green-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-700">Clean, professional appearance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">The GroupBio difference</h3>
              <p className="text-lg text-gray-600 mb-8">
                While Linktree helps you broadcast to everyone, GroupBio helps you connect meaningfully with the right people in the right context.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/profile/setup">
                  <Button size="lg" className="bg-primary hover:bg-primary/80 text-white px-8 py-3">
                    Try GroupBio Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Compare Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center bg-[#111B21] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Create Your Smart Bio
          </h2>
          <p className="text-2xl mb-4 opacity-95">
            2 minutes to set up. Lifetime of better connections.
          </p>
          <p className="text-xl mb-8 opacity-80">
            Join 10,000+ who've already upgraded their bio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/profile/setup">
              <Button size="lg" className="text-3xl px-24 py-10 bg-white text-[#111B21] hover:bg-gray-50 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-200">
                Get Started Free
              </Button>
            </Link>
          </div>
          <p className="text-sm opacity-70">Free forever • No app download • Works everywhere</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">GroupBio</span>
          </div>
          <p className="text-gray-600 text-sm">&copy; 2024 GroupBio. Stop being a mystery number.</p>
        </div>
      </footer>
    </div>
  )
}