import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Users, Shield, Settings, MapPin, FileText, MessageSquare, Zap, CheckCircle } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"
import { TestimonialsColumn, testimonials } from "@/components/ui/testimonials-columns-1"

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "BIOS",
      description: "Put faces and context to phone numbers. Finally know which Sarah is which.",
      benefit: "Know WHO these people are"
    },
    {
      icon: MapPin,
      title: "MAPS",
      description: "Know who's nearby for carpools and meetups. You have their number, now know their location.",
      benefit: "See WHERE people are located"
    },
    {
      icon: FileText,
      title: "WIKI", 
      description: "Stop explaining the same things to new members. Rules, schedules, resources in one place.",
      benefit: "Find HOW information is organized"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FCF5EB]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 leading-tight">
            WhatsApp groups{" "}
            <span className="text-[#25D366]">missing toolbox</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-16 font-light leading-relaxed">
            Turn 50 random phone numbers into an actual community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-xl px-12 py-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Try Demo Group
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 border-gray-300 hover:border-[#25D366] text-gray-700 hover:text-[#25D366] rounded-full font-medium transition-all duration-200">
                Create Your Group
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.map((feature, index) => (
        <section key={index} className={`py-20 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F6FDF8]'}`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:grid-cols-2' : ''}`}>
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  {feature.title}
                </h2>
                <p className="text-xl md:text-2xl text-[#25D366] mb-6 font-medium">
                  {feature.benefit}
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className={`bg-gray-200 rounded-3xl h-96 flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="text-gray-500 text-lg font-medium">Feature Screenshot</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Reassuring Details */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Simple & Secure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">Members control what they share with each group</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">60 Second Setup</h3>
              <p className="text-gray-600">Create group, share link, done</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Free Start</h3>
              <p className="text-gray-600">10 people free, then £5/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#F6FDF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border border-[#25D366]/30 py-2 px-4 rounded-full mb-6">
              <span className="text-[#25D366] font-medium">Testimonials</span>
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
      <section className="py-24 px-4 text-center bg-[#25D366] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Get started free
          </h2>
          <p className="text-xl mb-12 opacity-95">
            Every group can have 10 people for free. Upgrade to £5/year for unlimited members.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-xl px-12 py-6 bg-white text-[#25D366] hover:bg-gray-50 rounded-full font-medium shadow-lg">
                Try Demo Group
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white/10 rounded-full font-medium">
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
            <div className="w-6 h-6 bg-[#25D366] rounded-lg flex items-center justify-center">
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
