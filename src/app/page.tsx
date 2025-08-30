import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Users, Shield, Settings, MapPin, FileText, MessageSquare, Zap, CheckCircle } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function Home() {
  const testimonials = [
    {
      text: "Finally! No more awkward 'Wait, which Sarah?' moments. Our parent group actually feels like a community now.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b4?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Mitchell",
      role: "Parent Group Admin",
    },
    {
      text: "Our football team went from chaos to organized in minutes. Parents know who's who, where to meet, everything.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Mike Thompson",
      role: "Youth Coach",
    },
    {
      text: "Game changer for our neighborhood group. The map feature for carpools alone is worth the £10.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Emma Rodriguez",
      role: "Community Organizer",
    },
    {
      text: "Our work WhatsApp was a mess. Now everyone has context on who does what. Simple brilliance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "David Chen",
      role: "Team Lead",
    },
    {
      text: "Set up took literally 60 seconds. Kids' playgroup parents finally know each other's names!",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Park",
      role: "Playgroup Mom",
    },
    {
      text: "Best £10 we've spent. Our hiking group wiki has all the trail info, no more repeated questions.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      name: "James Wilson",
      role: "Hiking Group Leader",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Individual Bios",
      description: "See who's in the group at a glance — names, photos, and a few key details. No more guessing which Sarah is which, or asking people to re-introduce themselves.",
      benefit: "Put faces to phone numbers.",
      image: "/bio.jpg"
    },
    {
      icon: MapPin,
      title: "Maps",
      description: "A simple group map shows where members are based (only if they choose to share). Perfect for carpools, local meetups, or finding the closest helping hand.",
      benefit: "Know who's nearby.",
      image: "/map.jpg"
    },
    {
      icon: FileText,
      title: "Documents", 
      description: "Stop repeating yourself. Group rules, schedules, links, and resources live in a shared wiki that every member can find instantly. New joiners get up to speed without bothering the group.",
      benefit: "Shared and collaborative docs.",
      image: "/docs.png"
    }
  ]

  return (
    <div className="min-h-screen hero-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <ParticlesBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900 leading-tight">
           The <span className="text-primary">missing toolbox</span> for WhatsApp groups{" "}
            
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-6 leading-relaxed">
            Turn those 87 random phone numbers into an actual community.
          </p>
          
          <p className="text-lg text-gray-700 mb-16">
            GroupBio adds profiles, maps, and wikis to any WhatsApp group in 60 seconds. <br/>
            <span className="font-bold"> Free for up to 10 members, £10/yr per group for unlimited.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-xl px-12 py-6 bg-primary hover:bg-primary/80 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Try Demo Group
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary rounded-full font-medium transition-all duration-200">
                Create Your Group
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.map((feature, index) => (
        <div key={index}>
          <section className={`py-20 px-4 ${index % 2 === 0 ? 'bg-white' : 'feature-section-alt'}`}>
            <div className="max-w-7xl mx-auto">
              <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:grid-cols-2' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-primary mb-6 font-medium">
                    {feature.benefit}
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={`relative rounded-3xl h-96 overflow-hidden shadow-2xl ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image
                    src={feature.image}
                    alt={`${feature.title} screenshot`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      ))}

      {/* Pricing */}
      <section className="py-20 px-4 feature-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">£0</div>
              <p className="text-gray-600 mb-6">Perfect for small groups</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Up to 10 members</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />All core features</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Community support</li>
              </ul>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-primary px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-4">Unlimited</h3>
              <div className="text-3xl font-bold mb-4">£10<span className="text-lg">/year</span></div>
              <p className="text-xs text-primary-200 -mt-2 mb-4">per group</p>
              <p className="text-primary-100 mb-6">For growing communities</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-white mr-2" />Unlimited members</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-white mr-2" />All core features</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-white mr-2" />Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reassuring Details */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Simple & Secure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">Members control what they share with each group</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">60 Second Setup</h3>
              <p className="text-gray-600">Create group, share link, done</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Free Start</h3>
              <p className="text-gray-600">10 people free, then £10/year per group</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 testimonial-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border border-primary/30 py-2 px-4 rounded-full mb-6">
              <span className="text-primary font-medium">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from group admins who solved their "Which Sarah?" problem
            </p>
          </div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
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

      {/* CTA */}
      <section className="py-24 px-4 text-center bg-[#111B21] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-8xl md:text-9xl font-bold mb-8 leading-tight">
            Get started free
          </h2>
          <p className="text-4xl mb-12 opacity-95">
            Every group: 10 people free, then £10/year for unlimited members.
          </p>
          <div className="flex justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-4xl px-32 py-12 bg-white text-[#111B21] hover:bg-gray-50 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-200">
                Create Free Group
              </Button>
            </Link>
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
          <p className="text-gray-600 text-sm">&copy; 2024 GroupBio. The toolbox WhatsApp groups should have come with.</p>
        </div>
      </footer>
    </div>
  )
}
