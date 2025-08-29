"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/navbar"
import { 
  ArrowLeft,
  Users,
  Settings,
  BarChart3,
  Mail,
  Copy,
  Download,
  UserMinus,
  Crown,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  UserPlus,
  FileText
} from "lucide-react"
import { getGroupById, getGroupMembers } from "@/lib/dummy-data"

export default function AdminGroupManagement() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const members = getGroupMembers(groupId)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  if (!group) {
    return <div>Group not found</div>
  }

  // Analytics data (simulated)
  const analytics = {
    totalMembers: members.length,
    activeMembers: Math.floor(members.length * 0.8),
    profileCompletion: Math.floor(Math.random() * 20 + 75),
    joinedThisWeek: Math.floor(Math.random() * 5 + 1),
    fieldStats: group.settings.customFields.map(field => ({
      name: field.name,
      completion: Math.floor(Math.random() * 30 + 60),
      required: field.required
    }))
  }

  const handleMemberSelect = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for members:`, selectedMembers)
    setSelectedMembers([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/groups/${group.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Group
              </Button>
            </Link>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Manage {group.name}</h1>
                  <p className="text-muted-foreground text-lg">
                    Admin dashboard for your group
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="text-right">
                <div className="font-medium text-lg">{group.code}</div>
                <div className="text-sm text-muted-foreground">Group Code</div>
              </div>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(group.code)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Members</p>
                        <p className="text-2xl font-bold">{analytics.totalMembers}</p>
                      </div>
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Members</p>
                        <p className="text-2xl font-bold">{analytics.activeMembers}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Completion</p>
                        <p className="text-2xl font-bold">{analytics.profileCompletion}%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">New This Week</p>
                        <p className="text-2xl font-bold">{analytics.joinedThisWeek}</p>
                      </div>
                      <UserPlus className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Field Completion Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Field Completion Rates</CardTitle>
                  <CardDescription>
                    How many members have completed each field
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.fieldStats.map((field, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{field.name}</span>
                          <div className="flex items-center gap-2">
                            {field.required && <Badge variant="default" className="text-xs">Required</Badge>}
                            <span className="text-sm text-muted-foreground">{field.completion}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              field.completion >= 80 ? 'bg-green-500' :
                              field.completion >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${field.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New member joined", user: "Alice Johnson", time: "2 hours ago", icon: UserPlus },
                      { action: "Profile updated", user: "Bob Smith", time: "5 hours ago", icon: Settings },
                      { action: "Wiki document edited", user: "Carol Davis", time: "1 day ago", icon: FileText },
                      { action: "New member joined", user: "David Wilson", time: "2 days ago", icon: UserPlus },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.user} • {activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="space-y-6">
              {/* Actions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Member Management</CardTitle>
                      <CardDescription>
                        {selectedMembers.length > 0 ? 
                          `${selectedMembers.length} member${selectedMembers.length > 1 ? 's' : ''} selected` :
                          `${members.length} total members`
                        }
                      </CardDescription>
                    </div>
                    {selectedMembers.length > 0 && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('message')}>
                          <Mail className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMembers([])}>
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Members
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Message All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Members List */}
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {members.map((member) => {
                      const isSelected = selectedMembers.includes(member.id)
                      const completionRate = Math.floor((member.membership.sharedFields.length / (group.settings.requiredFields.length + group.settings.optionalFields.length)) * 100)
                      
                      return (
                        <div
                          key={member.id}
                          className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                            isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                          }`}
                          onClick={() => handleMemberSelect(member.id)}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleMemberSelect(member.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded"
                            />
                            
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {member.name}
                                {member.membership.role === "admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                              </div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                              <div className="text-xs text-muted-foreground">
                                Joined {new Date(member.membership.joinedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className={`text-sm font-medium ${
                                completionRate >= 80 ? 'text-green-600' :
                                completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {completionRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">Complete</div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Badge variant={member.membership.role === "admin" ? "default" : "outline"} className="text-xs">
                                {member.membership.role}
                              </Badge>
                              {member.membership.sharedFields.length < group.settings.requiredFields.length && (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Fields Tab */}
          <TabsContent value="fields">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Field Configuration</CardTitle>
                  <CardDescription>
                    Manage what information members can share
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Standard Fields</h4>
                      <div className="grid gap-3">
                        {["name", "email", "phone", "bio", "location"].map((field) => (
                          <div key={field} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium capitalize">{field}</div>
                              <div className="text-sm text-muted-foreground">Standard profile field</div>
                            </div>
                            <Badge variant="outline">Standard</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Custom Fields</h4>
                        <Button size="sm">Add Field</Button>
                      </div>
                      <div className="grid gap-3">
                        {group.settings.customFields.map((field, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{field.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {field.type} • {field.required ? 'Required' : 'Optional'}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={field.required ? "default" : "outline"}>
                                {field.required ? "Required" : "Optional"}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Settings</CardTitle>
                  <CardDescription>
                    Configure your group's basic information and features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Group Name</label>
                      <Input value={group.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Group Code</label>
                      <div className="flex gap-2">
                        <Input value={group.code} readOnly />
                        <Button variant="outline" onClick={() => navigator.clipboard.writeText(group.code)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Input value={group.description} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Map View</div>
                      <div className="text-sm text-muted-foreground">
                        Allow members to see each other's locations
                      </div>
                    </div>
                    <input type="checkbox" checked={group.settings.allowMap} className="rounded" />
                  </div>
                  
                  <div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-900">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <div className="font-medium text-red-900">Delete Group</div>
                        <div className="text-sm text-red-700">
                          Permanently delete this group and all member data
                        </div>
                      </div>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete Group
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}