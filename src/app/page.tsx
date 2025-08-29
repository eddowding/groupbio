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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-green-50 via-blue-50 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <Badge variant="secondary" className="text-sm px-3 py-1">
              The Missing Toolbox for WhatsApp Groups
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            The toolbox WhatsApp groups{" "}
            <span className="text-primary">should have come with</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            You have their numbers. But who ARE these people? 
            Turn 50 random phone numbers into an actual community.
          </p>

          {/* Problem Highlights */}
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 mb-8 max-w-2xl mx-auto border">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Sound familiar?</h3>
            <div className="space-y-2">
              {whatsappProblems.map((problem, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span className="text-sm">"{problem}"</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
                Try with a Demo Group
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Create Your Group
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white border-t border-b">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple setup, instant organization</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-200">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Admin creates group</h3>
              <p className="text-sm text-gray-600">60 seconds, £5/year</p>
            </div>

            <div className="hidden md:block text-center">
              <div className="w-full h-1 bg-gray-200 rounded">
                <div className="w-full h-1 bg-primary rounded"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-200">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Drop link in WhatsApp</h3>
              <p className="text-sm text-gray-600">Members add their bio once</p>
            </div>

            <div className="hidden md:block text-center">
              <div className="w-full h-1 bg-gray-200 rounded">
                <div className="w-full h-1 bg-primary rounded"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-purple-200">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Everyone knows everyone</h3>
              <p className="text-sm text-gray-600">Searchable directory, wiki, map forever</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">What you get for £5/year:</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>WHO these people are</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>HOW to find info</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>WHERE they are</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Functionality Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Toolbox - £5/year per group
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The essential functionality every WhatsApp group needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{feature.title}</CardTitle>
                  <div className="text-sm text-muted-foreground font-medium">{feature.benefit}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block bg-green-100 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 font-semibold">
                £5/year per group • Split 20 ways = 25p each • Less than a coffee, solves daily frustration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced tools to help your group thrive and stay engaged
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center relative">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Groups */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Your Group Organized
            </h2>
            <p className="text-xl text-muted-foreground">
              Try our demo groups - finally know who these people are
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dummyGroups.map((group) => (
              <Card key={group.id} className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-left">{group.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {group.type === 'parent' ? 'Parent Group' : 
                         group.type === 'sports' ? 'Sports Team' : 
                         group.type === 'professional' ? 'Work Team' : 'Social Group'}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-left">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">WhatsApp members:</span>
                      <span className="font-medium">{group.memberCount}</span>
                    </div>
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      Demo Code: <span className="font-mono font-bold">{group.code}</span>
                    </div>
                  </div>
                  <Link href="/join" className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full border-green-200 hover:bg-green-50">
                      Explore This Demo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Wondering "Which Sarah Is That?"
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Give your WhatsApp group the toolbox it should have come with. £5/year per group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8 bg-white text-gray-900 hover:bg-gray-100">
                Try a Demo Group
              </Button>
            </Link>
            <Link href="/admin/create">
              <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white/10">
                Create Your Group - £5/year
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm opacity-90">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>Bios: WHO they are</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Wiki: HOW to find info</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Maps: WHERE they are</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-green-600" />
            <span className="font-semibold">GroupBio</span>
          </div>
          <p>&copy; 2024 GroupBio. The toolbox WhatsApp groups should have come with.</p>
        </div>
      </footer>
    </div>
  )
}
