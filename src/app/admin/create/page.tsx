"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { 
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Users,
  Settings,
  FileText,
  MapPin,
  CheckCircle,
  Copy,
  ExternalLink
} from "lucide-react"

interface FieldDefinition {
  id: string
  name: string
  type: "text" | "textarea" | "select" | "checkbox" | "number"
  required: boolean
  options?: string[]
}

export default function CreateGroup() {
  const [step, setStep] = useState(1)
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    type: "",
    allowMap: false,
    terms: ""
  })
  const [customFields, setCustomFields] = useState<FieldDefinition[]>([])
  const [newField, setNewField] = useState({
    name: "",
    type: "text" as const,
    required: false,
    options: ""
  })
  const [groupCode, setGroupCode] = useState("")

  const groupTypes = [
    { id: "parent", name: "Parent Group", emoji: "👨‍👩‍👧‍👦", description: "For families and parents" },
    { id: "sports", name: "Sports Team", emoji: "⚽", description: "For athletic teams and clubs" },
    { id: "professional", name: "Professional", emoji: "💼", description: "For work teams and networking" },
    { id: "social", name: "Social Group", emoji: "🎉", description: "For friends and communities" }
  ]

  const fieldTemplates = {
    parent: [
      { id: "childName", name: "Child's Name", type: "text", required: true },
      { id: "childAge", name: "Child's Age", type: "number", required: false },
      { id: "allergies", name: "Allergies", type: "textarea", required: false },
      { id: "emergencyContact", name: "Emergency Contact", type: "text", required: false }
    ],
    sports: [
      { id: "position", name: "Position", type: "select", required: true, options: ["Goalkeeper", "Defender", "Midfielder", "Forward"] },
      { id: "jerseyNumber", name: "Jersey Number", type: "number", required: false },
      { id: "emergencyContact", name: "Emergency Contact", type: "text", required: true }
    ],
    professional: [
      { id: "role", name: "Job Title", type: "text", required: true },
      { id: "department", name: "Department", type: "text", required: false },
      { id: "skillsets", name: "Skills", type: "textarea", required: false }
    ],
    social: [
      { id: "interests", name: "Interests", type: "textarea", required: false },
      { id: "availability", name: "Availability", type: "text", required: false }
    ]
  }

  const handleAddField = () => {
    if (!newField.name) return
    
    const field: FieldDefinition = {
      id: newField.name.toLowerCase().replace(/\s+/g, ''),
      name: newField.name,
      type: newField.type,
      required: newField.required,
      options: newField.type === "select" ? newField.options.split(',').map(o => o.trim()) : undefined
    }
    
    setCustomFields([...customFields, field])
    setNewField({ name: "", type: "text", required: false, options: "" })
  }

  const removeField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index))
  }

  const loadTemplate = () => {
    if (!groupData.type || !fieldTemplates[groupData.type as keyof typeof fieldTemplates]) return
    
    const template = fieldTemplates[groupData.type as keyof typeof fieldTemplates]
    setCustomFields(template as FieldDefinition[])
  }

  const generateGroupCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGroupCode(code)
  }

  const handleCreateGroup = () => {
    generateGroupCode()
    setStep(4)
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Group Created Successfully!</CardTitle>
              <CardDescription>
                Your group "{groupData.name}" is now ready for members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Share this code with your members:</h3>
                <div className="flex items-center justify-center gap-3">
                  <div className="font-mono text-2xl bg-muted px-4 py-3 rounded-lg">
                    {groupCode}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(groupCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <a href={`/groups/1`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Your Group
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/dashboard">
                    Go to Dashboard
                  </a>
                </Button>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Members can join using the code at /join</p>
                <p>• You can manage the group from your dashboard</p>
                <p>• Invite links and QR codes coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    i < step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              {step === 1 && "Group Basics"}
              {step === 2 && "Custom Fields"}
              {step === 3 && "Review & Create"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 && "Tell us about your group"}
              {step === 2 && "Configure what information members can share"}
              {step === 3 && "Review your settings and create the group"}
            </p>
          </div>
        </div>

        {/* Step 1: Group Basics */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Group Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Group Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sunshine Nursery Parents"
                    value={groupData.name}
                    onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Group Type *</Label>
                  <Select onValueChange={(value) => setGroupData({ ...groupData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{type.emoji}</span>
                            <div>
                              <div>{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your group..."
                  value={groupData.description}
                  onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Enable Map View</div>
                  <div className="text-sm text-muted-foreground">
                    Allow members to see each other's locations on a map
                  </div>
                </div>
                <Switch
                  checked={groupData.allowMap}
                  onCheckedChange={(checked) => setGroupData({ ...groupData, allowMap: checked })}
                />
              </div>

              <div>
                <Label htmlFor="terms">Group Guidelines (Optional)</Label>
                <Textarea
                  id="terms"
                  placeholder="Any rules or guidelines for group members..."
                  value={groupData.terms}
                  onChange={(e) => setGroupData({ ...groupData, terms: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!groupData.name || !groupData.type}
                >
                  Next: Configure Fields
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Custom Fields */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Field Configuration
                </CardTitle>
                <CardDescription>
                  Configure what information members can share in this group
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Template Suggestion */}
                {groupData.type && fieldTemplates[groupData.type as keyof typeof fieldTemplates] && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Use {groupTypes.find(t => t.id === groupData.type)?.name} Template
                        </h4>
                        <p className="text-sm text-blue-800">
                          Pre-configured fields for {groupData.type} groups
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={loadTemplate}>
                        Load Template
                      </Button>
                    </div>
                  </div>
                )}

                {/* Add Custom Field */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Add Custom Field</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fieldName">Field Name</Label>
                      <Input
                        id="fieldName"
                        placeholder="e.g., Child's Age"
                        value={newField.name}
                        onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldType">Field Type</Label>
                      <Select onValueChange={(value) => setNewField({ ...newField, type: value as any })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="textarea">Long Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {newField.type === "select" && (
                    <div className="mt-4">
                      <Label htmlFor="options">Options (comma-separated)</Label>
                      <Input
                        id="options"
                        placeholder="Option 1, Option 2, Option 3"
                        value={newField.options}
                        onChange={(e) => setNewField({ ...newField, options: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="required"
                        checked={newField.required}
                        onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                      />
                      <Label htmlFor="required">Required field</Label>
                    </div>
                    <Button onClick={handleAddField} disabled={!newField.name}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Field
                    </Button>
                  </div>
                </div>

                {/* Current Fields */}
                <div>
                  <h4 className="font-medium mb-4">
                    Configured Fields ({customFields.length})
                  </h4>
                  {customFields.length > 0 ? (
                    <div className="space-y-3">
                      {customFields.map((field, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium">{field.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {field.type} • {field.required ? 'Required' : 'Optional'}
                                {field.options && ` • Options: ${field.options.join(', ')}`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={field.required ? "default" : "outline"}>
                              {field.required ? "Required" : "Optional"}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeField(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No custom fields configured yet. Add some fields above.
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Next: Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Review Your Group
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Group Info */}
                <div>
                  <h4 className="font-medium mb-3">Group Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <div className="font-medium">{groupData.name}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <div className="font-medium flex items-center gap-2">
                        {groupTypes.find(t => t.id === groupData.type)?.emoji}
                        {groupTypes.find(t => t.id === groupData.type)?.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Map Enabled:</span>
                      <div className="font-medium">{groupData.allowMap ? "Yes" : "No"}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Custom Fields:</span>
                      <div className="font-medium">{customFields.length}</div>
                    </div>
                  </div>
                  {groupData.description && (
                    <div className="mt-4">
                      <span className="text-sm text-muted-foreground">Description:</span>
                      <div className="font-medium">{groupData.description}</div>
                    </div>
                  )}
                </div>

                {/* Fields */}
                <div>
                  <h4 className="font-medium mb-3">Member Fields</h4>
                  <div className="space-y-2">
                    {["name", "email", "phone", "bio", "location"].map((field) => (
                      <div key={field} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="capitalize">{field}</span>
                        <Badge variant="outline">Standard</Badge>
                      </div>
                    ))}
                    {customFields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span>{field.name}</span>
                        <Badge variant={field.required ? "default" : "outline"}>
                          {field.required ? "Required" : "Optional"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleCreateGroup}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}