"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/layout/navbar"
import { Shield, Download, RefreshCw } from "lucide-react"

interface Signup {
  timestamp: string
  email: string
  phone: string
  groupName: string
  groupType: string
  memberCount: string
}

export default function SignupsAdmin() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [signups, setSignups] = useState<Signup[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAuth = () => {
    if (password === "aurora2023") {
      setIsAuthenticated(true)
      setError("")
      fetchSignups()
    } else {
      setError("Incorrect password")
    }
  }

  const fetchSignups = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/signups', {
        headers: {
          'Authorization': 'aurora2023'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSignups(data.signups)
      } else {
        setError("Failed to fetch signups")
      }
    } catch (error) {
      setError("Error fetching data")
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCSV = () => {
    const headers = ['Timestamp', 'Email', 'Phone', 'Group Name', 'Group Type', 'Member Count']
    const csvContent = [
      headers.join(','),
      ...signups.map(signup => [
        signup.timestamp,
        signup.email,
        signup.phone,
        `"${signup.groupName}"`,
        signup.groupType,
        signup.memberCount
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `groupbio-signups-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                Enter the access code to view signup data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">Access Code</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                />
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>
              
              <Button onClick={handleAuth} className="w-full">
                Access Signups
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Signup Data</h1>
              <p className="text-muted-foreground">
                {signups.length} total signups
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchSignups} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={downloadCSV} disabled={signups.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </div>

        {signups.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground text-lg">No signups yet</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Phone</th>
                      <th className="text-left p-4 font-medium">Group Name</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signups.map((signup, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-4">
                          {new Date(signup.timestamp).toLocaleDateString()} {new Date(signup.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-4 font-mono text-sm">{signup.email}</td>
                        <td className="p-4 font-mono text-sm">{signup.phone}</td>
                        <td className="p-4 font-medium">{signup.groupName}</td>
                        <td className="p-4">
                          <span className="capitalize">{signup.groupType}</span>
                        </td>
                        <td className="p-4">{signup.memberCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}