"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/layout/navbar"
import { Users, ArrowRight, CheckCircle } from "lucide-react"
import { dummyGroups } from "@/lib/dummy-data"

export default function JoinGroup() {
  const [groupCode, setGroupCode] = useState("")
  const [foundGroup, setFoundGroup] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCodeChange = (value: string) => {
    setGroupCode(value.toUpperCase())
    
    if (value.length === 6) {
      checkGroupCode(value.toUpperCase())
    } else {
      setFoundGroup(null)
    }
  }

  const checkGroupCode = (code: string) => {
    setIsChecking(true)
    setTimeout(() => {
      const group = dummyGroups.find(g => g.code === code)
      setFoundGroup(group || null)
      setIsChecking(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupCode.length === 6) {
      checkGroupCode(groupCode)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && groupCode.length === 6) {
      checkGroupCode(groupCode)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Join a Group
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your 6-character group code to get started
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Code
            </CardTitle>
            <CardDescription>
              Your group admin should have provided you with a unique 6-character code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupCode">Enter Group Code</Label>
                  <Input
                    id="groupCode"
                    placeholder="ABC123"
                    value={groupCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-center text-2xl font-mono tracking-widest uppercase"
                    maxLength={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={groupCode.length !== 6 || isChecking}
                >
                  {isChecking ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Checking Code...
                    </>
                  ) : (
                    <>
                      Check Group Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>


            {foundGroup && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Group found!</span>
                </div>
                
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">{foundGroup.name}</CardTitle>
                    <CardDescription className="text-green-700">
                      {foundGroup.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-green-700">
                      <div><strong>Type:</strong> {foundGroup.type.charAt(0).toUpperCase() + foundGroup.type.slice(1)}</div>
                      <div><strong>Members:</strong> {foundGroup.memberCount}</div>
                      <div><strong>Created:</strong> {new Date(foundGroup.createdAt).toLocaleDateString()}</div>
                    </div>
                    
                    {foundGroup.settings.terms && (
                      <div className="mt-4 p-4 bg-white rounded border">
                        <h4 className="font-medium mb-2">Group Guidelines:</h4>
                        <p className="text-sm text-gray-600">{foundGroup.settings.terms}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Link href={`/auth?groupId=${foundGroup.id}`} className="flex-1">
                    <Button className="w-full" size="lg">
                      Continue to Join
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => {
                    setGroupCode("")
                    setFoundGroup(null)
                  }}>
                    Try Another Code
                  </Button>
                </div>
              </div>
            )}

            {groupCode.length === 6 && !foundGroup && !isChecking && (
              <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="font-medium text-red-700 mb-2">Group not found</h3>
                <p className="text-red-600 text-sm mb-4">
                  The code "{groupCode}" doesn't match any active groups.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Double-check the code with your group admin</p>
                  <p>• Make sure you're using the most recent code</p>
                  <p>• Try typing it again carefully</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Don't have a group code?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/create">
              <Button variant="outline">
                Create Your Own Group
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-secondary/50 rounded-lg">
          <h3 className="font-medium mb-3">Try these demo codes:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dummyGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleCodeChange(group.code)}
                className="text-left p-3 bg-white rounded border hover:border-primary transition-colors"
              >
                <div className="font-mono font-bold text-primary">{group.code}</div>
                <div className="text-sm text-muted-foreground">{group.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}