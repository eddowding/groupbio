"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout/navbar"
import { 
  ArrowLeft,
  MapPin,
  Users,
  Navigation,
  Locate,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Search,
  X
} from "lucide-react"
import { getGroupById, getGroupMembers, getCurrentUser } from "@/lib/dummy-data"

export default function GroupMap() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const members = getGroupMembers(groupId)
  const currentUser = getCurrentUser()
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  if (!group) {
    return <div>Group not found</div>
  }

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          // Fallback to current user's location from profile or default NYC location
          if (currentUser.location) {
            setUserLocation({
              lat: currentUser.location.lat,
              lng: currentUser.location.lng
            })
          } else {
            setUserLocation({ lat: 40.7589, lng: -73.9851 }) // Default to NYC
          }
        }
      )
    } else {
      // Fallback for browsers without geolocation
      if (currentUser.location) {
        setUserLocation({
          lat: currentUser.location.lat,
          lng: currentUser.location.lng
        })
      } else {
        setUserLocation({ lat: 40.7589, lng: -73.9851 }) // Default to NYC
      }
    }
  }, [currentUser])

  // Filter members who have shared their location
  const allMembersWithLocation = members.filter(member => 
    member.location && member.membership.sharedFields.includes("location")
  )

  // Filter by search query
  const filteredMembers = allMembersWithLocation.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Limit to 38 users for map display
  const membersWithLocation = filteredMembers.slice(0, 38)

  // Calculate center point for map view - use user's location if available, otherwise use average of member locations
  const centerLat = userLocation ? userLocation.lat : (membersWithLocation.length > 0 ? membersWithLocation.reduce((sum, member) => sum + member.location.lat, 0) / membersWithLocation.length : 40.7589)
  const centerLng = userLocation ? userLocation.lng : (membersWithLocation.length > 0 ? membersWithLocation.reduce((sum, member) => sum + member.location.lng, 0) / membersWithLocation.length : -73.9851)

  // Simulate map view with positioned member cards
  const MapView = () => (
    <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 rounded-lg overflow-hidden" style={{height: '600px'}}>
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Street Lines */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-30">
          <line x1="0" y1="150" x2="100%" y2="150" stroke="#64748b" strokeWidth="3"/>
          <line x1="0" y1="350" x2="100%" y2="350" stroke="#64748b" strokeWidth="3"/>
          <line x1="0" y1="450" x2="100%" y2="450" stroke="#64748b" strokeWidth="3"/>
          <line x1="200" y1="0" x2="200" y2="100%" stroke="#64748b" strokeWidth="3"/>
          <line x1="400" y1="0" x2="400" y2="100%" stroke="#64748b" strokeWidth="3"/>
          <line x1="600" y1="0" x2="600" y2="100%" stroke="#64748b" strokeWidth="3"/>
        </svg>
      </div>

      {/* User Location Pin (Your Location) */}
      {userLocation && (
        <div
          className="absolute z-20"
          style={{ left: 400, top: 300 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Your Location
            </div>
          </div>
        </div>
      )}

      {/* Member Pins */}
      {membersWithLocation.map((member, index) => {
        // Position members based on their coordinates relative to center (user's location or calculated center)
        const offsetX = ((member.location.lng - centerLng) * 1000)
        const offsetY = ((centerLat - member.location.lat) * 1000)
        
        // Create a spread pattern around the center with some randomization for better visual distribution
        const angle = (index * 2.5) + (Math.random() * 0.5 - 0.25) 
        const radius = 50 + (index * 8) + (Math.random() * 30)
        const x = 400 + offsetX * 0.3 + Math.cos(angle) * radius
        const y = 300 + offsetY * 0.3 + Math.sin(angle) * radius
        
        return (
          <div
            key={member.id}
            className="absolute cursor-pointer group z-10"
            style={{ left: Math.max(20, Math.min(x, 750)), top: Math.max(20, Math.min(y, 500)) }}
            onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
          >
            {/* Pin */}
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              
              {/* Name Label */}
              {showLabels && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.name}
                </div>
              )}

              {/* Distance from center */}
              <div className="absolute -top-2 -right-2 bg-muted text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {(Math.random() * 3 + 0.5).toFixed(1)}mi
              </div>
            </div>

            {/* Member Info Popup */}
            {selectedMember?.id === member.id && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 bg-white border shadow-lg rounded-lg p-4 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.location.address}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {member.membership.sharedFields.includes("phone") && member.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                        {member.phone}
                      </a>
                    </div>
                  )}
                  {member.membership.sharedFields.includes("email") && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedMember(null)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs hover:bg-muted/80"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLabels(!showLabels)}
          className="bg-white"
        >
          {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
        <div className="text-sm font-medium mb-2">Legend</div>
        <div className="space-y-1">
          {userLocation && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              <span>Your Location</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span>Group Members ({membersWithLocation.length})</span>
          </div>
          {searchQuery && (
            <div className="text-xs text-muted-foreground mt-1">
              Filtered by: "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  )

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
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-green-100">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{group.name} Map</h1>
                  <p className="text-muted-foreground text-lg">
                    See where your group members are located
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {membersWithLocation.length} of {allMembersWithLocation.length} members shown
                    {searchQuery && ` (filtered from ${allMembersWithLocation.length})`}
                    {allMembersWithLocation.length !== members.length && ` • ${members.length - allMembersWithLocation.length} not sharing location`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  <span>Click pins for contact info</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search members by name, location, or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {filteredMembers.length > 0 
                    ? `Found ${filteredMembers.length} member${filteredMembers.length === 1 ? '' : 's'} matching "${searchQuery}"${filteredMembers.length > 38 ? ` (showing first 38)` : ''}`
                    : `No members found matching "${searchQuery}"`
                  }
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <MapView />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Members on Map
                  {searchQuery && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      (filtered)
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {membersWithLocation.length} of {allMembersWithLocation.length} members shown
                  {filteredMembers.length > 38 && (
                    <span className="text-xs block mt-1 text-amber-600">
                      Showing first 38 results
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {membersWithLocation.length === 0 && searchQuery ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No members found matching "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-primary hover:underline text-sm mt-1"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {membersWithLocation.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors ${
                          selectedMember?.id === member.id ? 'bg-muted' : ''
                        }`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-sm">
                            {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{member.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {member.location.address}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>


            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/profile`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update My Location
                  </Button>
                </Link>
                <Link href={`/groups/${group.id}/sharing`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                </Link>
                <Link href={`/groups/${group.id}`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Members
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Privacy Notice - Below Map */}
        <div className="mt-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Privacy Notice</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-blue-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Only members who chose to share their location are shown</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Locations are static - no live tracking</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You can update your location sharing in privacy settings</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Admins cannot see locations of members who haven't opted in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Not Sharing Location */}
        {members.length - membersWithLocation.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Members Not Sharing Location</CardTitle>
              <CardDescription>
                {members.length - membersWithLocation.length} members have chosen not to share their location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {members
                  .filter(member => !member.location || !member.membership.sharedFields.includes("location"))
                  .slice(0, 6)
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-sm">
                          {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">Location private</div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {members.length - membersWithLocation.length > 6 && (
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  And {members.length - membersWithLocation.length - 6} more members
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}