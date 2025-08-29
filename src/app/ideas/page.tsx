import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { 
  Lightbulb, 
  Users, 
  Calendar, 
  Shield, 
  Layers, 
  Clock, 
  Zap, 
  Brain,
  Target,
  MessageSquare,
  FileText,
  TrendingUp,
  Map,
  Bell,
  Search,
  BarChart3,
  Sparkles,
  Heart,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Ideas & Roadmap - GroupBio",
  description: "Explore upcoming features and innovative ideas that will make GroupBio the ultimate platform for group coordination and member connections.",
}

export default function Ideas() {
  // Identity Pillar - Connections
  const identityFeatures = [
    {
      icon: Users,
      title: "Smart Introductions",
      description: "The core wedge → AI-powered suggestions connecting members based on shared interests and proximity.",
      status: "planned",
      priority: "high"
    },
    {
      icon: Layers,
      title: "Cross-Group Graph",
      description: "\"Emma is in your Street group + Parents group → stronger tie.\" See overlapping group connections.",
      status: "planned",
      priority: "medium"
    },
    {
      icon: Heart,
      title: "Affinity Tags",
      description: "\"Looking for a babysitter? These 3 parents also offer swaps.\" Smart matching for specific needs.",
      status: "planned",
      priority: "medium"
    }
  ]

  // Coordination Pillar
  const coordinationFeatures = [
    {
      icon: Calendar,
      title: "Event RSVPs",
      description: "Super lightweight: \"Picnic Sat 2pm? 8 going, 3 maybe.\" Simple event coordination.",
      status: "planned",
      priority: "high"
    },
    {
      icon: Clock,
      title: "Shared Calendar",
      description: "Recurring things like \"bin day, nursery rota, football fixtures\" pinned outside the chat scroll.",
      status: "planned",
      priority: "high"
    },
    {
      icon: BarChart3,
      title: "Availability Polls",
      description: "Not doodle-style heavy, just \"Which evening works? Tue/Thu/Fri.\" Quick consensus building.",
      status: "planned",
      priority: "medium"
    }
  ]

  // Exchange Pillar - Jobs To Be Done
  const exchangeFeatures = [
    {
      icon: Target,
      title: "Task Board",
      description: "Micro-tasks inside the group (e.g. \"bring juice\", \"host next week\"). Just a 3-column board: to do / doing / done.",
      status: "planned",
      priority: "high"
    },
    {
      icon: MessageSquare,
      title: "Ask/Offer Board",
      description: "Structured version of \"Does anyone have a ladder?\" / \"Free cot available.\" Makes barter/reuse easy.",
      status: "planned",
      priority: "high"
    },
    {
      icon: FileText,
      title: "Resource Vault",
      description: "Rules, FAQs, links → a real memory for the group, not lost in WhatsApp scroll.",
      status: "live",
      priority: "high"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-100 text-green-800 border-green-200"
      case "in-development": return "bg-blue-100 text-blue-800 border-blue-200"
      case "planned": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "research": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200"
      case "low": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const FeatureGrid = ({ features, title }: { features: any[], title: string }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={`text-xs ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(feature.priority)}`}>
                    {feature.priority}
                  </Badge>
                </div>
              </div>
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
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-yellow-100">
              <Lightbulb className="h-8 w-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold">The Operating System for Groups</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Beyond "tidy directory" → GroupBio tackles real coordination jobs inside communities. 
            Three pillars turn us from bolt-on to indispensable: <strong>Identity</strong>, <strong>Coordination</strong>, and <strong>Exchange</strong>.
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 p-6 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">Live</Badge>
            <span className="text-sm">Available now</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Development</Badge>
            <span className="text-sm">Coming soon</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Planned</Badge>
            <span className="text-sm">Next quarter</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 border-gray-200">Research</Badge>
            <span className="text-sm">Exploring</span>
          </div>
        </div>

        {/* Three Pillars */}
        <FeatureGrid features={identityFeatures} title="🧑‍🤝‍🧑 Identity → Connections" />
        <FeatureGrid features={coordinationFeatures} title="📅 Coordination → Events + Tasks + Connections" />
        <FeatureGrid features={exchangeFeatures} title="🛠 Exchange → Jobs To Be Done" />

        {/* Vision Statement */}
        <Card className="mb-12 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">The Vision</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              If we nail these three pillars — <strong>Identity</strong> (Smart Introductions + Graph), 
              <strong> Coordination</strong> (Events + Calendar + Polls), and <strong>Exchange</strong> (Tasks + Ask/Offer) — 
              then GroupBio stops being a bolt-on directory and becomes <strong>the operating system for groups</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Privacy Promise */}
        <Card className="mb-12 border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-800">
              <Shield className="h-6 w-6" />
              Privacy-First Promise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-700 space-y-2">
              <p>• <strong>No tracking:</strong> We will never track your location in real-time</p>
              <p>• <strong>Explicit consent:</strong> Every piece of shared information requires your permission</p>
              <p>• <strong>Data ownership:</strong> You control your data and can delete it anytime</p>
              <p>• <strong>Minimal collection:</strong> We only collect what's necessary for group coordination</p>
            </div>
          </CardContent>
        </Card>

        {/* Feedback CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Shape the Future of GroupBio</CardTitle>
            <CardDescription className="text-lg">
              Your feedback drives our development. Tell us what features would be most valuable for your groups.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg">
                  Try Current Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}