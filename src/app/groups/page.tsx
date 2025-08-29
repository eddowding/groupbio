import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout/navbar"
import { 
  Users, 
  MapPin, 
  Calendar, 
  Plus, 
  Search, 
  Settings,
  Clock,
  FileText
} from "lucide-react"
import { getUserGroups } from "@/lib/dummy-data"

// Simulate logged in user (John Doe - id: "1")
const currentUserId = "1"
const userGroups = getUserGroups(currentUserId)

export default function Groups() {
  const getGroupTypeIcon = (type: string) => {
    switch (type) {
      case "parent": return "👨‍👩‍👧‍👦"
      case "sports": return "⚽"
      case "professional": return "💼"
      case "social": return "🎉"
      default: return "👥"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Groups</h1>
              <p className="text-muted-foreground">
                Manage your group memberships and privacy settings
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

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your groups..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid gap-6">
          {userGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {getGroupTypeIcon(group.type)}
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {group.name}
                        <Badge variant={group.membership.role === "admin" ? "default" : "secondary"}>
                          {group.membership.role}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {group.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {group.membership.role === "admin" && (
                      <Link href={`/admin/groups/${group.id}`}>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </Link>
                    )}
                    <Link href={`/groups/${group.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Group Stats */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Group Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{group.memberCount} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Joined {new Date(group.membership.joinedAt).toLocaleDateString()}</span>
                      </div>
                      {group.settings.allowMap && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>Map view enabled</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Your Sharing Status */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Your Sharing Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Fields shared:</span>
                        <Badge variant="outline">
                          {group.membership.sharedFields.length}/{group.settings.requiredFields.length + group.settings.optionalFields.length}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Required fields:</span>
                        <Badge variant={
                          group.settings.requiredFields.every(field => 
                            group.membership.sharedFields.includes(field)
                          ) ? "default" : "destructive"
                        }>
                          {group.settings.requiredFields.filter(field => 
                            group.membership.sharedFields.includes(field)
                          ).length}/{group.settings.requiredFields.length}
                        </Badge>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{
                            width: `${(group.membership.sharedFields.length / (group.settings.requiredFields.length + group.settings.optionalFields.length)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
                  <Link href={`/groups/${group.id}`}>
                    <Button variant="ghost" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View Members
                    </Button>
                  </Link>
                  {group.settings.allowMap && (
                    <Link href={`/groups/${group.id}/map`}>
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Map View
                      </Button>
                    </Link>
                  )}
                  <Link href={`/groups/${group.id}/wiki`}>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Wiki
                    </Button>
                  </Link>
                  <Link href={`/groups/${group.id}/sharing`}>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {userGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-semibold mb-2">No Groups Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't joined any groups yet. Get started by joining an existing group or creating your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Join a Group
                </Button>
              </Link>
              <Link href="/admin/create">
                <Button variant="outline" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Tips for Managing Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800 space-y-2 text-sm">
              <p>• <strong>Complete required fields</strong> to unlock all group features</p>
              <p>• <strong>Adjust privacy settings</strong> for each group individually</p>
              <p>• <strong>Use the map view</strong> to see where other members are located</p>
              <p>• <strong>Check the group wiki</strong> for important information and updates</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}