"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout/navbar"
import { GroupHeader } from "@/components/layout/group-header"
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
import dynamic from "next/dynamic"

// Dynamically import Leaflet to avoid SSR issues
const Map = dynamic(() => import("./map-component"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
})

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

  // Mock current membership for header
  const currentMembership = { role: "member" }

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


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <GroupHeader group={group} currentMembership={currentMembership} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              
              
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
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search members by name, location, or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-3 text-base bg-white w-full border-2 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
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
                <Map 
                  members={membersWithLocation}
                  userLocation={userLocation}
                  centerLat={centerLat}
                  centerLng={centerLng}
                  selectedMember={selectedMember}
                  setSelectedMember={setSelectedMember}
                  showLabels={showLabels}
                  setShowLabels={setShowLabels}
                />
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