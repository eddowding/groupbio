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
        <div className="grid gap-4">
          {userGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">
                      {getGroupTypeIcon(group.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <Badge variant={group.membership.role === "admin" ? "default" : "secondary"} className="text-xs">
                          {group.membership.role}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{group.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Group Details - Compact */}
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{group.memberCount} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>Joined {new Date(group.membership.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Your Sharing Status - Compact */}
                    <div className="text-sm space-y-1">
                      <div className="text-muted-foreground font-medium">Your Sharing Status</div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Fields shared:</span>
                        <Badge variant="outline" className="text-xs">
                          {group.membership.sharedFields.length}/{group.settings.requiredFields.length + group.settings.optionalFields.length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Required fields:</span>
                        <Badge 
                          variant={
                            group.settings.requiredFields.every(field => 
                              group.membership.sharedFields.includes(field)
                            ) ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {group.settings.requiredFields.filter(field => 
                            group.membership.sharedFields.includes(field)
                          ).length}/{group.settings.requiredFields.length}
                        </Badge>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all" 
                          style={{
                            width: `${(group.membership.sharedFields.length / (group.settings.requiredFields.length + group.settings.optionalFields.length)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
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
                            Map
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
                      <Link href={`/groups/${group.id}`}>
                        <Button size="sm" className="bg-black text-white hover:bg-gray-800">View</Button>
                      </Link>
                    </div>
                  </div>
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