import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Users, Shield, Settings, MapPin, FileText, MessageSquare, Zap, CheckCircle } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"

export default function Home() {
  const whatsappProblems = [
    "Who has everyone's contact info?",
    "Where did we put that important document?",
    "What's the coach's phone number again?",
    "Can someone share the group rules?",
    "Where does everyone live for carpools?"
  ]

  const features = [
    {
      icon: Users,
      title: "Smart Member Directory",
      description: "Everyone's info in one place - contacts, roles, and custom details your group needs"
    },
    {
      icon: Shield,
      title: "Privacy That Actually Works", 
      description: "Share your phone with the soccer team, but not your work colleagues. You control what each group sees."
    },
    {
      icon: FileText,
      title: "Group Knowledge Base",
      description: "Rules, schedules, resources - keep everything organized and easy to find"
    },
    {
      icon: MapPin,
      title: "Find Each Other",
      description: "Optional location sharing for meetups and carpools (privacy-first, no tracking)"
    },
    {
      icon: Settings,
      title: "Fits Your Group",
      description: "Soccer teams need jersey numbers, parent groups need emergency contacts - customize what matters"
    },
    {
      icon: Zap,
      title: "Works With WhatsApp",
      description: "Keep using WhatsApp for chat, use GroupBio for everything else that groups need"
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
            WhatsApp is for chatting.{" "}
            <span className="text-primary">GroupBio is for everything else.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Tired of asking "Who has the coach's number?" in your WhatsApp group? 
            GroupBio gives your group the member directory, document storage, and organization tools WhatsApp is missing.
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Keep WhatsApp. Add GroupBio.</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Keep Using WhatsApp</h3>
              <p className="text-sm text-gray-600">Your group chats stay exactly the same</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Create Your GroupBio</h3>
              <p className="text-sm text-gray-600">Add the info your group needs to stay organized</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Never Ask Again</h3>
              <p className="text-sm text-gray-600">Everyone has the contacts, docs, and info they need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything WhatsApp Groups Are Missing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The tools your group actually needs to stay organized and connected
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
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
              Works for Every WhatsApp Group
            </h2>
            <p className="text-xl text-muted-foreground">
              Try our demo groups - see what your group could look like
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
            Stop Asking for Phone Numbers in Your WhatsApp Group
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Give your group the organization it deserves. Try GroupBio free with any WhatsApp group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8 bg-white text-gray-900 hover:bg-gray-100">
                Try a Demo Group
              </Button>
            </Link>
            <Link href="/admin/create">
              <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white/10">
                Set Up My Group
              </Button>
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Free to try • Works with any WhatsApp group • No app download required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-green-600" />
            <span className="font-semibold">GroupBio</span>
          </div>
          <p>&copy; 2024 GroupBio. The missing toolbox for WhatsApp groups.</p>
        </div>
      </footer>
    </div>
  )
}
