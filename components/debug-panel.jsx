"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, ChevronDown, ChevronUp } from "lucide-react"

export default function DebugPanel({ resumeData, selectedTemplate, isVisible = false }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isVisible && process.env.NODE_ENV !== "development") {
    return null
  }

  const debugInfo = {
    template: selectedTemplate,
    personalInfoFields: Object.keys(resumeData.personalInfo).length,
    sectionsCount: resumeData.sections.length,
    visibleSections: resumeData.sections.filter((s) => s.isVisible).length,
    totalItems: resumeData.sections.reduce((acc, section) => acc + section.items.length, 0),
    visibleItems: resumeData.sections.reduce(
      (acc, section) => acc + section.items.filter((item) => item.isVisible).length,
      0,
    ),
    hasProfileImage: !!resumeData.personalInfo.profileImage,
    timestamp: new Date().toISOString(),
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <Bug className="w-4 h-4 mr-2" />
            Debug Panel
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Template:</span>
              <Badge variant="outline" className="text-xs">
                {debugInfo.template}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span>Personal Info Fields:</span>
              <span>{debugInfo.personalInfoFields}</span>
            </div>

            <div className="flex justify-between">
              <span>Sections:</span>
              <span>
                {debugInfo.visibleSections}/{debugInfo.sectionsCount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Items:</span>
              <span>
                {debugInfo.visibleItems}/{debugInfo.totalItems}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Profile Image:</span>
              <span>{debugInfo.hasProfileImage ? "✅" : "❌"}</span>
            </div>

            <div className="pt-2 border-t border-yellow-200 dark:border-yellow-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Resume Data:", resumeData)
                  console.log("Debug Info:", debugInfo)
                }}
                className="w-full text-xs bg-transparent"
              >
                Log to Console
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
