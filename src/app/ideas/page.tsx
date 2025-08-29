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

export default function Ideas() {
  const coreFeatures = [
    {
      icon: Users,
      title: "Smart Introductions",
      description: "AI-powered suggestions for connecting members based on shared interests and proximity.",
      status: "planned",
      priority: "high"
    },
    {
      icon: Calendar,
      title: "Group Activity Feed", 
      description: "Real-time updates when members update profiles, join groups, or share new information.",
      status: "in-development",
      priority: "high"
    },
    {
      icon: Layers,
      title: "Subgroups & Circles",
      description: "Create smaller groups within main groups (like 'Defenders' within 'Soccer Team').",
      status: "planned",
      priority: "medium"
    },
    {
      icon: Clock,
      title: "Time-Bound Sharing",
      description: "Share information temporarily (phone number for 48 hours during events).",
      status: "research",
      priority: "medium"
    }
  ]

  const engagementFeatures = [
    {
      icon: Zap,
      title: "Quick Actions",
      description: "One-tap creation of WhatsApp groups, contact exports, and availability polls.",
      status: "planned",
      priority: "high"
    },
    {
      icon: TrendingUp,
      title: "Profile Completeness Gamification",
      description: "Progress tracking and gentle nudges to help members complete their profiles.",
      status: "in-development", 
      priority: "medium"
    },
    {
      icon: Search,
      title: "Discovery Mode",
      description: "Find common interests and suggest connections within your groups.",
      status: "research",
      priority: "medium"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligent alerts about relevant group activity and member updates.",
      status: "planned",
      priority: "low"
    }
  ]

  const adminTools = [
    {
      icon: BarChart3,
      title: "Group Insights Dashboard",
      description: "Analytics on member engagement, field completion rates, and group health metrics.",
      status: "planned",
      priority: "high"
    },
    {
      icon: Target,
      title: "Bulk Operations",
      description: "Message members with incomplete profiles, export data, and manage permissions at scale.",
      status: "research",
      priority: "medium"
    },
    {
      icon: Sparkles,
      title: "Field Templates",
      description: "Pre-built field sets for different group types with smart suggestions.",
      status: "in-development",
      priority: "high"
    },
    {
      icon: Shield,
      title: "Advanced Safety Features", 
      description: "Member verification, reporting tools, and audit logs for secure group management.",
      status: "planned",
      priority: "high"
    }
  ]

  const innovativeFeatures = [
    {
      icon: FileText,
      title: "Collaborative Group Wiki",
      description: "Shared documentation, meeting notes, and resources with version control.",
      status: "live",
      priority: "high"
    },
    {
      icon: Map,
      title: "Enhanced Location Features",
      description: "Neighborhood clustering, distance calculations, and event-based location sharing.",
      status: "in-development",
      priority: "medium"
    },
    {
      icon: Brain,
      title: "AI Field Suggestions",
      description: "Smart recommendations for what information to share based on group context.",
      status: "research", 
      priority: "low"
    },
    {
      icon: Heart,
      title: "Network Map",
      description: "Interactive visualization showing member connections based on shared groups and common interests.",
      status: "in-development",
      priority: "medium"
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
            <h1 className="text-4xl font-bold">Ideas & Roadmap</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore upcoming features and innovative ideas that will make GroupBio the ultimate platform for group coordination and member connections.
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

        {/* Feature Categories */}
        <FeatureGrid features={coreFeatures} title="🎯 Core Features" />
        <FeatureGrid features={engagementFeatures} title="⚡ Engagement & Discovery" />
        <FeatureGrid features={adminTools} title="🛠️ Admin Tools" />
        <FeatureGrid features={innovativeFeatures} title="🚀 Innovation Lab" />

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