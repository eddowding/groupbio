"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/layout/navbar"
import { GroupHeader } from "@/components/layout/group-header"
import { 
  Users, 
  MapPin, 
  Calendar, 
  Search, 
  Settings,
  Mail,
  Phone,
  Globe,
  Linkedin,
  FileText,
  User,
  Heart,
  Crown,
  Grid3X3,
  List
} from "lucide-react"
import { getGroupById, getGroupMembers, getUserById, dummyUsers } from "@/lib/dummy-data"

// Simulate current user (John Doe - id: "1")
const currentUserId = "1"

export default function GroupDetail() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const members = getGroupMembers(groupId)
  const currentUser = getUserById(currentUserId)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (!group) {
    return <div>Group not found</div>
  }

  const currentMembership = members.find(m => m.id === currentUserId)?.membership
  const isAdmin = currentMembership?.role === "admin"

  const filteredMembers = members.filter(member => {
    const query = searchQuery.toLowerCase()
    
    // Search in basic fields
    if (member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        (member.phone && member.phone.toLowerCase().includes(query)) ||
        (member.bio && member.bio.toLowerCase().includes(query)) ||
        (member.location?.address && member.location.address.toLowerCase().includes(query))) {
      return true
    }
    
    // Search in interests
    if (member.interests && member.interests.some((interest: string) => 
      interest.toLowerCase().includes(query))) {
      return true
    }
    
    // Search in custom fields
    if (member.customFields) {
      for (const [key, value] of Object.entries(member.customFields)) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(query)) {
          return true
        }
      }
    }
    
    return false
  })

  const getSharedFieldValue = (member: any, fieldName: string) => {
    if (!member.membership.sharedFields.includes(fieldName)) {
      return null
    }
    
    switch (fieldName) {
      case "childName":
      case "childAge":
      case "allergies":
      case "emergencyContact":
      case "position":
      case "jerseyNumber":
      case "company":
      case "role":
      case "skillsets":
        return member.customFields?.[fieldName]
      default:
        return member[fieldName]
    }
  }

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "email": return Mail
      case "phone": return Phone
      case "website": return Globe
      case "linkedin": return Linkedin
      case "location": return MapPin
      case "interests": return Heart
      default: return User
    }
  }

  const MemberCard = ({ member, isCurrentUser }: { member: any, isCurrentUser: boolean }) => {
    const Icon = getFieldIcon("user")
    
    return (
      <Card className={`hover:shadow-md transition-shadow ${isCurrentUser ? 'ring-2 ring-primary/20' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-lg">
                  {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {getSharedFieldValue(member, "name") || "Private"}
                  {isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                  {member.membership.role === "admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                </CardTitle>
                <CardDescription>
                  {member.membership.role === "admin" ? "Group Admin" : "Member"}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Contact Info */}
            <div className="grid gap-2">
              {getSharedFieldValue(member, "email") && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                    {member.email}
                  </a>
                </div>
              )}
              {getSharedFieldValue(member, "phone") && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                    {member.phone}
                  </a>
                </div>
              )}
              {getSharedFieldValue(member, "location") && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.location?.address}</span>
                </div>
              )}
            </div>

            {/* Custom Fields */}
            {group.settings.customFields.map((field) => {
              const value = getSharedFieldValue(member, field.id)
              if (!value) return null
              
              return (
                <div key={field.id} className="text-sm">
                  <span className="text-muted-foreground font-medium">{field.name}: </span>
                  <span>{value}</span>
                </div>
              )
            })}

            {/* Bio */}
            {getSharedFieldValue(member, "bio") && (
              <div className="text-sm text-muted-foreground">
                {member.bio}
              </div>
            )}

            {/* Interests */}
            {getSharedFieldValue(member, "interests") && member.interests && (
              <div className="flex flex-wrap gap-1">
                {member.interests.slice(0, 3).map((interest: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {member.interests.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{member.interests.length - 3} more
                  </Badge>
                )}
              </div>
            )}

          </div>
        </CardContent>
      </Card>
    )
  }

  const MemberRow = ({ member, isCurrentUser }: { member: any, isCurrentUser: boolean }) => (
    <Card className={`${isCurrentUser ? 'ring-2 ring-primary/20' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback>
                {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center gap-2">
                {getSharedFieldValue(member, "name") || "Private"}
                {isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                {member.membership.role === "admin" && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <div className="text-sm text-muted-foreground">
                {getSharedFieldValue(member, "email") || "Email private"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getSharedFieldValue(member, "phone") && (
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
            )}
            {getSharedFieldValue(member, "email") && (
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            )}
            <Badge variant="outline" className="text-xs">
              {member.membership.sharedFields.length} fields
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <GroupHeader group={group} currentMembership={currentMembership} />

      {/* Members Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div>
            <div className="space-y-6">
              {/* Search and View Controls */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div className="w-full lg:flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 text-base bg-white w-full border-2 focus:border-primary"
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {filteredMembers.length} of {members.length} members
                  </div>
                </div>
                
                <div className="flex items-center gap-2 lg:flex-shrink-0">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Members Display */}
              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <MemberCard 
                      key={member.id} 
                      member={member} 
                      isCurrentUser={member.id === currentUserId}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <MemberRow 
                      key={member.id} 
                      member={member}
                      isCurrentUser={member.id === currentUserId}
                    />
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}