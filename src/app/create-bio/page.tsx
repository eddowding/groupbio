"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Search
} from "lucide-react"

export default function CreateBioPage() {
  const [activeContext, setActiveContext] = useState<'work' | 'parent' | 'social'>('work')

  const testimonials = [
    {
      text: "Finally! I'm not just 'Emma from accounting' anymore. My work group sees my professional side, my kid's school sees parent me. It's brilliant.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b4?w=150&h=150&fit=crop&crop=face",
      name: "Emma Chen",
      role: "Marketing Manager & Soccer Mom",
    },
    {
      text: "I was always 'that guy who never talks' in groups. Now people know I'm into photography and hiking - started three new friendships!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", 
      name: "Marcus Thompson",
      role: "Software Developer",
    },
    {
      text: "Love how I can share my LinkedIn with professional groups but keep it private from my book club. Perfect control.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Rodriguez", 
      role: "HR Director",
    },
    {
      text: "No more awkward 'Sorry, who is this again?' moments. Everyone knows I'm the parent coordinator now.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "David Park",
      role: "Parent Group Admin",
    },
    {
      text: "Game changer for networking. People can actually find me based on my skills and interests, not just remember my name.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Martinez",
      role: "Freelance Designer", 
    },
    {
      text: "I'm in 8 different WhatsApp groups and I'm a different version of myself in each. This finally makes that work seamlessly.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      name: "James Wilson",
      role: "Community Volunteer",
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

  const currentContext = contextData[activeContext]

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
            
            <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
              Professional with colleagues. Personal with friends. Parent-focused with school groups. 
              One profile that's always perfectly appropriate for the situation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/profile/setup">
              <Button size="lg" className="text-xl px-12 py-6 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                Get Started Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 hover:bg-primary/10 hover:border-primary rounded-full">
              See How It Works
            </Button>
          </div>

          {/* Simple Explainer */}
          <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl p-8 border shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">How it works in 3 simple steps</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                <h4 className="font-semibold mb-2">Create your profile</h4>
                <p className="text-gray-600 text-sm">Add your info once with privacy controls for different contexts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                <h4 className="font-semibold mb-2">Add link to WhatsApp bio</h4>
                <p className="text-gray-600 text-sm">Put your GroupBio link in your WhatsApp About section</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
                <h4 className="font-semibold mb-2">People see what you allow</h4>
                <p className="text-gray-600 text-sm">Different groups see different info based on your privacy settings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-white">
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
      <section className="py-20 px-4 feature-section-alt">
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

      {/* Perfect For Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Perfect for every situation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Professional networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Share your work experience, portfolio, and LinkedIn without the personal stuff.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Parent groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Show your family info and local details to other parents, keep work private.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Social circles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Share your interests, social media, and fun stuff with friends who actually care.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Community groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Reveal relevant location info and shared interests while keeping everything else private.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* More Than Just Bio */}
      <section className="py-20 px-4 feature-section-alt">
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
      <section className="py-20 px-4 bg-white">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Pricing that makes sense
          </h2>
          <div className="bg-primary/5 rounded-2xl p-12 border border-primary/20">
            <div className="text-6xl md:text-7xl font-bold text-primary mb-4">FREE</div>
            <div className="text-2xl text-gray-700 mb-6">Forever</div>
            <ul className="text-lg text-gray-600 space-y-3 max-w-xl mx-auto mb-8">
              <li className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Unlimited contexts and audiences
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Smart links that adapt automatically
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Granular privacy controls
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Join unlimited groups
              </li>
            </ul>
            <p className="text-sm text-gray-500">
              Want to create your own groups? That's £10/year for unlimited members.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center bg-[#111B21] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Create your smart profile
          </h2>
          <p className="text-2xl mb-4 opacity-95">
            2 minutes to set up. Lifetime of better connections.
          </p>
          <p className="text-xl mb-12 opacity-80">
            Free forever. No app download required.
          </p>
          <div className="flex justify-center">
            <Link href="/profile/setup">
              <Button size="lg" className="text-3xl px-24 py-10 bg-white text-[#111B21] hover:bg-gray-50 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-200">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Brief for Marketing Team */}
      <section className="py-12 px-4 bg-gray-50 text-xs leading-relaxed">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg border">
            <h3 className="text-lg font-bold mb-4 text-gray-900">INTERNAL: PROJECT BRIEF FOR COPYWRITER & GO-TO-MARKET TEAM</h3>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">PRODUCT OVERVIEW: GroupBio - Individual Bios Feature</h4>
                <p className="mb-3">The platform creates comprehensive individual profiles with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Rich Profile Data:</strong> Name, bio, contact info (email/phone), location, interests, professional links (LinkedIn, website, Twitter)</li>
                  <li><strong>Context-Aware Fields:</strong> Custom fields per group (e.g., "Child's Name" for parent groups, "Company" for professional groups, "Position" for sports teams)</li>
                  <li><strong>Privacy Controls:</strong> Granular field-level sharing - users control exactly what information each group can see</li>
                  <li><strong>Visual Presentation:</strong> Avatar display, badge indicators (admin status), organized card/list views</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">VALUE PROPOSITION BEYOND LINKTREE</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">1. Group-Centric Context</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Unlike Linktree's one-size-fits-all approach, GroupBio profiles adapt to group context</li>
                      <li>Different fields shown based on group type (parent groups see child info, professional groups see company details)</li>
                      <li>Solves the "Which Sarah?" problem specific to group communications</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium">2. Privacy & Control</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Per-group privacy settings - share your LinkedIn with work colleagues but not the school group</li>
                      <li>Required vs optional fields set by group admins</li>
                      <li>Members control their data granularly rather than all-or-nothing</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium">3. Group Infrastructure</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li><strong>Maps:</strong> Location sharing for carpools, meetups, finding nearby members</li>
                      <li><strong>Wikis:</strong> Shared documents, schedules, resources, FAQs that persist beyond chat messages</li>
                      <li><strong>Search:</strong> Find members by interests, location, custom fields, not just names</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium">4. Community Building Tools</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Member discovery and connection beyond just broadcasting links</li>
                      <li>Rich search and filtering (by interests, location, custom criteria)</li>
                      <li>Visual group directory that creates actual community feeling</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium">5. WhatsApp Integration</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Supplements rather than replaces existing communication</li>
                      <li>Solves WhatsApp's core weakness (no persistent context) without disrupting workflow</li>
                      <li>60-second setup with simple link sharing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">CORE POSITIONING INSIGHT</h4>
                <p className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <strong>Linktree optimizes for individual broadcasting, while GroupBio optimizes for group context and community building.</strong> 
                  It's positioned as "the missing toolbox for WhatsApp groups" - adding the persistent, searchable, privacy-controlled context layer that chat apps inherently lack.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">BUSINESS MODEL & MARKET FIT</h4>
                <p>The freemium model (free up to 10 members, £10/year for unlimited) targets the sweet spot between casual groups and serious communities.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">TARGET MARKETS & USE CASES</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium">Parent Groups</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>School parent organizations</li>
                      <li>Sports team parents</li>
                      <li>Carpool coordination</li>
                      <li>Playdate organization</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Professional Networks</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Startup team chats</li>
                      <li>Industry networking groups</li>
                      <li>Conference attendees</li>
                      <li>Freelancer collectives</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Community Groups</h5>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Hobby and interest groups</li>
                      <li>Neighborhood associations</li>
                      <li>Volunteer organizations</li>
                      <li>Social clubs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">KEY MESSAGING THEMES</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>"Stop being a mystery number"</strong> - Primary pain point of anonymous contacts</li>
                  <li><strong>"One profile, infinite contexts"</strong> - Adaptive profile concept</li>
                  <li><strong>"The missing toolbox for WhatsApp groups"</strong> - Supplement not replace</li>
                  <li><strong>"Context without chaos"</strong> - Organized information vs chat clutter</li>
                  <li><strong>"Privacy that actually works"</strong> - Granular control differentiator</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">COMPETITIVE ADVANTAGE</h4>
                <p>Unlike profile/bio link tools (Linktree, Bio.fm) that focus on individual content broadcasting, GroupBio is purpose-built for group context and community building. It's the only solution that:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Adapts profile information based on group context automatically</li>
                  <li>Provides granular privacy controls per group</li>
                  <li>Includes group infrastructure (maps, wikis, search)</li>
                  <li>Integrates seamlessly with existing WhatsApp workflows</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">TECHNICAL ARCHITECTURE</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Stack:</strong> Next.js 15, TypeScript, Tailwind CSS, Radix UI, Vercel KV (Redis)</li>
                  <li><strong>No App Required:</strong> Web-based, works on any device</li>
                  <li><strong>Simple Setup:</strong> Create group → share link → members join in 60 seconds</li>
                  <li><strong>Privacy-First:</strong> Members control data sharing, can leave/delete anytime</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">GO-TO-MARKET STRATEGY NOTES</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Viral Loop:</strong> Each group admin who creates a GroupBio exposes 10-50 new potential users</li>
                  <li><strong>Pain Point Marketing:</strong> Target "WhatsApp group admin" and "parent coordinator" searches</li>
                  <li><strong>Content Strategy:</strong> "How to organize your [parent/work/hobby] WhatsApp group" content</li>
                  <li><strong>Partnership Opportunities:</strong> School management systems, youth sports leagues, coworking spaces</li>
                  <li><strong>Freemium Conversion:</strong> Groups naturally grow beyond 10 members, creating upgrade pressure</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">SUCCESS METRICS TO TRACK</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Individual profile completion rates</li>
                  <li>Fields shared per group (engagement indicator)</li>
                  <li>Group member discovery/connection rates</li>
                  <li>WhatsApp → GroupBio click-through rates</li>
                  <li>Free to paid conversion by group size/type</li>
                </ul>
              </div>
            </div>
          </div>
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