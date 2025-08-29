import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Users, Shield, Settings, MapPin, FileText, Lightbulb } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "One Profile, Multiple Groups",
      description: "Create your bio once, share different information with each group"
    },
    {
      icon: Shield,
      title: "Granular Privacy Control", 
      description: "Choose exactly what information to share with each group"
    },
    {
      icon: Settings,
      title: "Custom Fields",
      description: "Admins can create custom fields specific to their group's needs"
    },
    {
      icon: MapPin,
      title: "Location Features",
      description: "Optional map views to see where group members are located"
    },
    {
      icon: FileText,
      title: "Collaborative Wiki",
      description: "Shared documentation and resources for your group"
    },
    {
      icon: Lightbulb,
      title: "Smart Features",
      description: "Intelligent suggestions and group insights to enhance collaboration"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            One Profile.{" "}
            <span className="text-primary">Multiple Groups.</span>{" "}
            Total Control.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your information selectively with different groups while maintaining your privacy. 
            Perfect for parent groups, sports teams, and professional networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8">
                Join a Group
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose GroupBio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for groups who need to share information safely and efficiently
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
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect for Any Group
            </h2>
            <p className="text-xl text-muted-foreground">
              See how different types of groups use GroupBio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dummyGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {group.name}
                  </CardTitle>
                  <CardDescription>
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Members: {group.memberCount}</div>
                    <div>Type: {group.type.charAt(0).toUpperCase() + group.type.slice(1)}</div>
                    <div>Code: {group.code}</div>
                  </div>
                  <Link href="/join" className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full">
                      Join This Group
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join an existing group or create your own in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8">
                Join a Group
              </Button>
            </Link>
            <Link href="/admin/create">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Create Group
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground">
        <div className="max-w-6xl mx-auto">
          <p>&copy; 2024 GroupBio. Built for better group coordination.</p>
        </div>
      </footer>
    </div>
  )
}
