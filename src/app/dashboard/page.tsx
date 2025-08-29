"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/layout/navbar"
import { 
  Users, 
  MapPin, 
  Calendar, 
  Plus, 
  TrendingUp, 
  Clock,
  UserPlus,
  MessageSquare,
  FileText
} from "lucide-react"
import { getUserGroups, dummyUsers } from "@/lib/dummy-data"

// Simulate logged in user (John Doe - id: "1")
const currentUserId = "1"
const currentUser = dummyUsers.find(u => u.id === currentUserId)!
const userGroups = getUserGroups(currentUserId)

export default function Dashboard() {
  const stats = [
    {
      label: "Groups",
      value: userGroups.length,
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Connections",
      value: 24,
      icon: UserPlus,
      color: "text-green-600"
    },
    {
      label: "Profile Views",
      value: 12,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  const recentActivity = [
    {
      type: "new_member",
      message: "3 new members joined Sunshine Nursery Parents",
      time: "2 hours ago",
      icon: UserPlus
    },
    {
      type: "profile_view",
      message: "Sarah Wilson viewed your profile",
      time: "5 hours ago", 
      icon: TrendingUp
    },
    {
      type: "wiki_update",
      message: "Team rules updated in FC Thunder Squad",
      time: "1 day ago",
      icon: FileText
    },
    {
      type: "message",
      message: "New discussion in TechCo Remote Team",
      time: "2 days ago",
      icon: MessageSquare
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your groups
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/join">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Join Group
                </Button>
              </Link>
              <Link href="/admin/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full bg-gray-100 mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Groups */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Your Groups</h2>
                <Link href="/groups">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              
              <div className="grid gap-4">
                {userGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <CardDescription>{group.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {group.membership.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {group.memberCount} members
                          </div>
                          {group.settings.allowMap && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Map enabled
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Joined {new Date(group.membership.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/groups/${group.id}`}>
                            <Button size="sm">View</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={`p-4 ${index !== recentActivity.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <activity.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Bio completion:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-xs">85%</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-muted-foreground">Shared with:</span>
                    <div className="text-sm mt-1 space-y-1">
                      {userGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between">
                          <span>{group.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {group.membership.sharedFields.length} fields
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Link href="/profile" className="mt-4 block">
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/groups/1/wiki">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Group Wiki
                  </Button>
                </Link>
                <Link href="/groups/1/map">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    See Member Map
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Update Privacy Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">💡 Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800">
                  Complete your profile to unlock all features. Add your location to see the member map!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}