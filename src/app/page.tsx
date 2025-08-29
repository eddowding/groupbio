import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Users, Shield, Settings, MapPin, FileText, MessageSquare, Zap, CheckCircle } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"

export default function Home() {
  const whatsappProblems = [
    "Wait, which Sarah is that?",
    "Who's the treasurer again?", 
    "Where did we put the group rules?",
    "Anyone live near me for carpools?",
    "I don't know anyone here..."
  ]

  const coreFeatures = [
    {
      icon: Users,
      title: "BIOS",
      description: "Put faces and context to phone numbers. Finally know which Sarah is which.",
      benefit: "WHO these people are"
    },
    {
      icon: FileText,
      title: "WIKI",
      description: "Stop explaining the same things to new members. Rules, schedules, resources in one place.",
      benefit: "HOW to find info"
    },
    {
      icon: MapPin,
      title: "MAPS",
      description: "Know who's nearby for carpools and meetups. You have their number, now know their location.",
      benefit: "WHERE they are"
    }
  ]

  const additionalFeatures = [
    {
      icon: CheckCircle,
      title: "EVENTS",
      description: "Proper planning with RSVPs, not buried in chat. Make group activities visible and organized.",
      status: "Coming Soon"
    },
    {
      icon: MessageSquare,
      title: "INTRODUCTIONS",
      description: "Get shy members talking and build group confidence. Turn lurkers into participants.",
      status: "Coming Soon"
    },
    {
      icon: Settings,
      title: "ROLES & TASKS",
      description: "Clear responsibilities so work gets spread. Same 3 people don't do everything.",
      status: "Coming Soon"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-gray-100 text-gray-700">
                The Missing Toolbox for WhatsApp Groups
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-gray-900 leading-tight">
              The toolbox WhatsApp groups{" "}
              <span className="font-medium text-[#25D366]">should have come with</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              You have their numbers. But who ARE these people? 
              Turn 50 random phone numbers into an actual community.
            </p>

            {/* Problem Highlights */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 mb-12 max-w-3xl mx-auto">
              <h3 className="text-xl font-medium mb-6 text-gray-800">Sound familiar?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whatsappProblems.map((problem, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-lg">"{problem}"</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button size="lg" className="text-lg px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Try with a Demo Group
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-[#25D366] text-gray-700 hover:text-[#25D366] rounded-full font-medium transition-all duration-200">
                  Create Your Group
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 font-light">Simple setup, instant organization</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#25D366] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-medium text-white">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Admin creates group</h3>
              <p className="text-gray-600">60 seconds, £5/year</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#128C7E] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-medium text-white">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Drop link in WhatsApp</h3>
              <p className="text-gray-600">Members add their bio once</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#075E54] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Everyone knows everyone</h3>
              <p className="text-gray-600">Searchable directory, wiki, map forever</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <h4 className="text-xl font-medium text-gray-900 mb-6">What you get for £5/year:</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">WHO these people are</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">HOW to find info</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">WHERE they are</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Functionality Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
              Core Toolbox - £5/year per group
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              The essential functionality every WhatsApp group needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <div className="text-sm text-[#25D366] font-medium mb-4 uppercase tracking-wide">{feature.benefit}</div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-6">
              <p className="text-[#075E54] font-medium text-lg">
                £5/year per group • Split 20 ways = 25p each • Less than a coffee, solves daily frustration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
              Additional Features
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Advanced tools to help your group thrive and stay engaged
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center relative">
                <div className="absolute top-6 right-6">
                  <Badge variant="outline" className="text-xs px-3 py-1 bg-amber-50 border-amber-200 text-amber-700">
                    {feature.status}
                  </Badge>
                </div>
                <div className="mx-auto w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-gray-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Groups */}
      <section className="py-20 px-4 bg-[#25D366]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
              See Your Group Organized
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Try our demo groups - finally know who these people are
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dummyGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900 text-lg">{group.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-1 bg-gray-100 text-gray-600">
                        {group.type === 'parent' ? 'Parent Group' : 
                         group.type === 'sports' ? 'Sports Team' : 
                         group.type === 'professional' ? 'Work Team' : 'Social Group'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-left">
                    {group.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">WhatsApp members:</span>
                      <span className="font-medium text-gray-900">{group.memberCount}</span>
                    </div>
                    <div className="bg-[#25D366]/10 border border-[#25D366]/20 p-4 rounded-2xl">
                      <div className="text-xs text-[#075E54] font-medium">
                        Demo Code: <span className="font-mono font-bold text-lg">{group.code}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <Link href="/join" className="block">
                    <Button variant="outline" size="sm" className="w-full border-[#25D366]/30 hover:bg-[#25D366]/10 hover:border-[#25D366] text-[#075E54] rounded-full font-medium">
                      Explore This Demo
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
            Stop Wondering "Which Sarah Is That?"
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 font-light max-w-3xl mx-auto leading-relaxed">
            Give your WhatsApp group the toolbox it should have come with. £5/year per group.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/join">
              <Button size="lg" className="text-lg px-10 py-4 bg-white text-[#075E54] hover:bg-gray-50 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Try a Demo Group
              </Button>
            </Link>
            <Link href="/admin/create">
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white rounded-full font-medium transition-all duration-200">
                Create Your Group - £5/year
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 opacity-95">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-lg font-light">Bios: WHO they are</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-lg font-light">Wiki: HOW to find info</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-lg font-light">Maps: WHERE they are</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-900 text-lg">GroupBio</span>
          </div>
          <p className="text-gray-600">&copy; 2024 GroupBio. The toolbox WhatsApp groups should have come with.</p>
        </div>
      </footer>
    </div>
  )
}
