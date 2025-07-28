"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Bot, Sparkles, Target, Zap, Crown } from "lucide-react"

interface AIRewriteProps {
  onClose: () => void
  onApply: (rewrittenContent: any) => void
  currentResumeData: any
  isDarkMode?: boolean
}

export default function AIRewrite({ onClose, onApply, currentResumeData, isDarkMode = false }: AIRewriteProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockResults = {
      matchScore: 78,
      keywordMatches: ["React", "JavaScript", "Node.js", "AWS", "Agile"],
      missingKeywords: ["TypeScript", "Docker", "Kubernetes", "CI/CD"],
      suggestions: [
        {
          id: "summary",
          type: "Professional Summary",
          current: currentResumeData.personalInfo.summary || "Software engineer with experience in web development.",
          suggested:
            "Full-stack software engineer with 5+ years of experience building scalable web applications using React, Node.js, and AWS. Proven track record of delivering high-quality solutions in Agile environments with strong focus on performance optimization and user experience.",
          impact: "high",
          reason:
            "Better alignment with job requirements and includes key technologies mentioned in the job description.",
        },
        {
          id: "experience-1",
          type: "Work Experience",
          current: "Developed web applications using modern technologies.",
          suggested:
            "Architected and developed responsive web applications using React, TypeScript, and Node.js, serving 100K+ users with 99.9% uptime. Implemented CI/CD pipelines using Docker and Kubernetes, reducing deployment time by 60%.",
          impact: "high",
          reason: "Includes specific technologies and quantifiable achievements that match job requirements.",
        },
        {
          id: "skills",
          type: "Skills Section",
          current: "JavaScript, React, Node.js",
          suggested:
            "JavaScript, TypeScript, React, Node.js, AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, Agile/Scrum",
          impact: "medium",
          reason: "Adds missing keywords found in job description to improve ATS matching.",
        },
      ],
      atsScore: {
        before: 65,
        after: 89,
      },
    }

    setAnalysisResults(mockResults)
    setIsAnalyzing(false)
  }

  const toggleSuggestion = (suggestionId: string) => {
    setSelectedSuggestions((prev) =>
      prev.includes(suggestionId) ? prev.filter((id) => id !== suggestionId) : [...prev, suggestionId],
    )
  }

  const handleApplyChanges = () => {
    if (!analysisResults || selectedSuggestions.length === 0) return

    const updatedData = { ...currentResumeData }

    selectedSuggestions.forEach((suggestionId) => {
      const suggestion = analysisResults.suggestions.find((s: any) => s.id === suggestionId)
      if (suggestion) {
        if (suggestion.id === "summary") {
          updatedData.personalInfo.summary = suggestion.suggested
        }
        // Add more logic for other suggestion types
      }
    })

    onApply(updatedData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card
        className={`w-full max-w-4xl max-h-[90vh] overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
      >
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  AI Resume Optimizer
                </CardTitle>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Optimize your resume for specific job opportunities
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium Feature
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!analysisResults ? (
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  Job Description
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here. Our AI will analyze it and suggest improvements to your resume..."
                  rows={8}
                  className={`${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Our AI will analyze the job requirements and suggest targeted improvements
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze & Optimize
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-blue-300" : "text-blue-900"}`}>
                        AI is analyzing the job description...
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}>
                        This may take a few moments while we identify key requirements and optimization opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Analysis Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className={isDarkMode ? "bg-gray-700 border-gray-600" : "bg-green-50 border-green-200"}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      {analysisResults.matchScore}%
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Job Match Score</div>
                  </CardContent>
                </Card>

                <Card className={isDarkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-blue-200"}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                      {analysisResults.atsScore.after}
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>ATS Score (After)</div>
                  </CardContent>
                </Card>

                <Card className={isDarkMode ? "bg-gray-700 border-gray-600" : "bg-purple-50 border-purple-200"}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                      {analysisResults.suggestions.length}
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Suggestions</div>
                  </CardContent>
                </Card>
              </div>

              {/* Keyword Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>
                    Matched Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.keywordMatches.map((keyword: string, index: number) => (
                      <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.missingKeywords.map((keyword: string, index: number) => (
                      <Badge key={index} className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>AI Suggestions</h3>
                <div className="space-y-4">
                  {analysisResults.suggestions.map((suggestion: any) => (
                    <Card
                      key={suggestion.id}
                      className={`cursor-pointer transition-all ${
                        selectedSuggestions.includes(suggestion.id)
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "hover:shadow-md"
                      } ${isDarkMode ? "bg-gray-700 border-gray-600" : ""}`}
                      onClick={() => toggleSuggestion(suggestion.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {suggestion.type}
                            </span>
                            <Badge
                              variant={suggestion.impact === "high" ? "default" : "secondary"}
                              className={suggestion.impact === "high" ? "bg-red-100 text-red-800" : ""}
                            >
                              {suggestion.impact} impact
                            </Badge>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedSuggestions.includes(suggestion.id)}
                            onChange={() => toggleSuggestion(suggestion.id)}
                            className="w-4 h-4 text-blue-600"
                          />
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              Current:
                            </p>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} bg-gray-100 dark:bg-gray-800 p-2 rounded`}
                            >
                              {suggestion.current}
                            </p>
                          </div>

                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              Suggested:
                            </p>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-800"} bg-green-50 dark:bg-green-900/20 p-2 rounded`}
                            >
                              {suggestion.suggested}
                            </p>
                          </div>

                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <strong>Why:</strong> {suggestion.reason}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {selectedSuggestions.length} of {analysisResults.suggestions.length} suggestions selected
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApplyChanges}
                    disabled={selectedSuggestions.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Apply {selectedSuggestions.length} Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
