"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/navbar"
import { 
  Eye, 
  EyeOff, 
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Users,
  Shield
} from "lucide-react"
import { getCurrentUser, getUserGroups } from "@/lib/dummy-data"

export default function ProfilePreview() {
  const currentUser = getCurrentUser()
  const userGroups = getUserGroups(currentUser.id)
  const [selectedGroup, setSelectedGroup] = useState(userGroups[0]?.id || "")
  
  const selectedGroupData = userGroups.find(g => g.id === selectedGroup)
  const membership = selectedGroupData?.membership

  if (!currentUser) {
    return <div>User not found</div>
  }

  // Helper function to check if field is shared with selected group
  const isFieldShared = (fieldName: string) => {
    return membership?.sharedFields.includes(fieldName) || false
  }

  // Helper function to get field value if shared
  const getSharedFieldValue = (fieldName: string, value: any) => {
    return isFieldShared(fieldName) ? value : null
  }

  const profileFields = [
    { 
      key: "name", 
      label: "Name", 
      value: currentUser.name, 
      icon: User,
      always: true // Name is always shared
    },
    { 
      key: "email", 
      label: "Email", 
      value: currentUser.email, 
      icon: Mail 
    },
    { 
      key: "phone", 
      label: "Phone", 
      value: currentUser.phone, 
      icon: Phone 
    },
    { 
      key: "location", 
      label: "Location", 
      value: currentUser.location?.address, 
      icon: MapPin 
    },
    { 
      key: "bio", 
      label: "Bio", 
      value: currentUser.bio, 
      icon: User 
    },
    { 
      key: "company", 
      label: "Company", 
      value: currentUser.customFields?.company, 
      icon: Briefcase 
    },
    { 
      key: "website", 
      label: "Website", 
      value: currentUser.customFields?.website, 
      icon: Globe 
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">How Others See You</h1>
              <p className="text-muted-foreground text-lg">
                Preview your profile as it appears to different groups
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Group Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Group
                </CardTitle>
                <CardDescription>
                  Choose a group to see how your profile appears to its members
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {userGroups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroup(group.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors ${
                        selectedGroup === group.id ? 'bg-muted' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {group.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{group.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {group.membership.sharedFields.length} fields shared
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy Summary */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-blue-800 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Fields visible:</span>
                    <Badge variant="secondary">
                      {membership?.sharedFields.length || 0} / {profileFields.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fields hidden:</span>
                    <Badge variant="outline">
                      {profileFields.length - (membership?.sharedFields.length || 0)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <Link href={`/groups/${selectedGroup}/sharing`}>
                    <Button size="sm" variant="outline" className="w-full">
                      Adjust Privacy Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Preview */}
          <div className="lg:col-span-2">
            {selectedGroupData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile Preview for {selectedGroupData.name}</span>
                    <Badge variant="outline">
                      {selectedGroupData.membership.role}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    This is exactly how your profile appears to other members of {selectedGroupData.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg">
                        {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                      {getSharedFieldValue("bio", currentUser.bio) && (
                        <p className="text-muted-foreground mt-1">
                          {currentUser.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {selectedGroupData.membership.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Joined {new Date(selectedGroupData.membership.joinedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Fields */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">Contact Information</h4>
                    <div className="grid gap-3">
                      {profileFields.map((field) => {
                        const Icon = field.icon
                        const isVisible = field.always || isFieldShared(field.key)
                        const value = field.always ? field.value : getSharedFieldValue(field.key, field.value)
                        
                        return (
                          <div
                            key={field.key}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              isVisible 
                                ? 'bg-white border-gray-200' 
                                : 'bg-gray-50 border-gray-100 opacity-60'
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${
                              isVisible ? 'text-muted-foreground' : 'text-gray-400'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{field.label}</span>
                                {isVisible ? (
                                  <Eye className="h-4 w-4 text-green-600" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              {isVisible && value ? (
                                <div className="text-muted-foreground">
                                  {field.key === "email" && (
                                    <a href={`mailto:${value}`} className="text-primary hover:underline">
                                      {value}
                                    </a>
                                  )}
                                  {field.key === "phone" && (
                                    <a href={`tel:${value}`} className="text-primary hover:underline">
                                      {value}
                                    </a>
                                  )}
                                  {field.key === "website" && (
                                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      {value}
                                    </a>
                                  )}
                                  {!["email", "phone", "website"].includes(field.key) && (
                                    <span>{value}</span>
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-400 text-sm">
                                  {isVisible ? "Not provided" : "Hidden from this group"}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Custom Fields if any are shared */}
                  {membership?.sharedFields.some(field => 
                    currentUser.customFields && Object.keys(currentUser.customFields).includes(field)
                  ) && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium text-lg mb-3">Additional Information</h4>
                      <div className="grid gap-3">
                        {Object.entries(currentUser.customFields || {}).map(([key, value]) => (
                          isFieldShared(key) && (
                            <div key={key} className="flex items-center gap-3 p-3 rounded-lg border bg-white">
                              <div className="flex-1">
                                <div className="font-medium text-sm capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="text-muted-foreground">{value as string}</div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <Link href="/profile">
                      <Button variant="outline">
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href={`/groups/${selectedGroup}/sharing`}>
                      <Button>
                        Adjust Privacy Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Groups Found</h3>
                  <p className="text-muted-foreground mb-6">
                    You need to join a group to see how your profile appears to others.
                  </p>
                  <Link href="/groups">
                    <Button>Browse Groups</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}