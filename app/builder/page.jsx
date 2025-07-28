"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Save,
  Download,
  Plus,
  Settings,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Home,
  BookMarkedIcon as Markdown,
  Bot,
} from "lucide-react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import Link from "next/link"
import ResumePreview from "../../components/resume-preview"
import SectionEditor from "../../components/section-editor"
import TemplateSelector from "../../components/template-selector"
import AuthPrompt from "../../components/auth-prompt"
import ImageUpload from "../../components/image-upload"
import MarkdownEditor from "../../components/markdown-editor"
import { useSearchParams } from "next/navigation"
import ErrorBoundary from "../../components/error-boundary"
import DebugPanel from "../../components/debug-panel"
import { validateTemplate, getTemplateMetadata } from "../../utils/template-utils"
import AIRewrite from "../../components/ai-rewrite"

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable)
}

export default function ResumeBuilder() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
      profileImage: null,
      showLocation: true,
      showWebsite: true,
      showLinkedIn: true,
    },
    sections: [
      {
        id: "experience",
        type: "experience",
        title: "Work Experience",
        items: [],
        isVisible: true,
        showCompanyLocation: true,
        showDates: true,
      },
      {
        id: "education",
        type: "education",
        title: "Education",
        items: [],
        isVisible: true,
        showLocation: true,
        showGPA: true,
      },
      {
        id: "skills",
        type: "skills",
        title: "Skills",
        items: [],
        isVisible: true,
      },
      {
        id: "projects",
        type: "projects",
        title: "Projects",
        items: [],
        isVisible: true,
      },
    ],
  })

  const searchParams = useSearchParams()
  const templateParam = searchParams?.get("template") || null

  const [activeSection, setActiveSection] = useState("personal")
  const [selectedTemplate, setSelectedTemplate] = useState(templateParam || "modern")
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [templateError, setTemplateError] = useState(null)
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false)
  const [showAIRewrite, setShowAIRewrite] = useState(false)

  const sidebarRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    if (templateParam && templateParam !== selectedTemplate) {
      setSelectedTemplate(templateParam)
    }
  }, [templateParam, selectedTemplate])

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Initialize GSAP animations
    gsap.fromTo(sidebarRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    gsap.fromTo(
      previewRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
    )
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light")
  }

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true)
      return
    }

    setIsSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleExportPDF = () => {
    console.log("Exporting PDF...")
    // PDF export functionality would go here
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "resume-data.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const addSection = (type) => {
    const sectionTypes = {
      experience: "Work Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      awards: "Awards & Achievements",
      certifications: "Certifications",
      languages: "Languages",
      volunteer: "Volunteer Experience",
      publications: "Publications",
      custom: "Custom Section",
    }

    const newSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: sectionTypes[type] || "New Section",
      items: [],
      isVisible: true,
    }

    setResumeData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const removeSection = (sectionId) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }))
  }

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const updateSection = (sectionId, updatedSection) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? updatedSection : section)),
    }))
  }

  const toggleSectionVisibility = (sectionId) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, isVisible: !section.isVisible } : section,
      ),
    }))
  }

  const sectionIcons = {
    experience: <Briefcase className="w-4 h-4" />,
    education: <GraduationCap className="w-4 h-4" />,
    skills: <Code className="w-4 h-4" />,
    projects: <FileText className="w-4 h-4" />,
    awards: <Award className="w-4 h-4" />,
    certifications: <Award className="w-4 h-4" />,
    languages: <FileText className="w-4 h-4" />,
    volunteer: <User className="w-4 h-4" />,
    publications: <FileText className="w-4 h-4" />,
    custom: <Plus className="w-4 h-4" />,
  }

  const handleTemplateValidation = (templateId) => {
    const validation = validateTemplate(templateId)

    if (!validation.isValid) {
      setTemplateError(validation.error)
      return validation.template
    }

    setTemplateError(null)
    return validation.template
  }

  const handleTemplateSelect = (templateId) => {
    setIsLoadingTemplate(true)
    const validatedTemplate = handleTemplateValidation(templateId)

    setTimeout(() => {
      setSelectedTemplate(validatedTemplate)
      setIsLoadingTemplate(false)

      // Update URL
      const url = new URL(window.location)
      url.searchParams.set("template", validatedTemplate)
      window.history.replaceState({}, "", url)
    }, 300)
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-40 transition-colors duration-300">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Home className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Resume Builder</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {isAuthenticated ? "Pro" : "Guest"}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              {selectedTemplate && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>Template:</span>
                  <Badge variant="secondary">{getTemplateMetadata(selectedTemplate).name}</Badge>
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="p-2">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="hidden md:flex"
              >
                {previewMode ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowTemplateSelector(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Template
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIRewrite(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Optimize
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportJSON}>
                Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              {isLoadingTemplate && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>Loading template...</span>
                </div>
              )}
              {templateError && (
                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded text-sm">
                  {templateError}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar Editor */}
          {!previewMode && (
            <div
              ref={sidebarRef}
              className="w-96 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm overflow-y-auto transition-colors duration-300"
            >
              <div className="p-6">
                {/* Section Navigation */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={activeSection === "personal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSection("personal")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Personal
                    </Button>
                    {resumeData.sections.map((section) => (
                      <div key={section.id} className="flex items-center gap-1">
                        <Button
                          variant={activeSection === section.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveSection(section.id)}
                          className="flex items-center"
                        >
                          {sectionIcons[section.type]}
                          <span className="ml-2">{section.title}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSectionVisibility(section.id)}
                          className="p-1"
                        >
                          {section.isVisible ? (
                            <Eye className="w-3 h-3 text-green-600" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add Section</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: "experience", label: "Experience" },
                      { type: "education", label: "Education" },
                      { type: "skills", label: "Skills" },
                      { type: "projects", label: "Projects" },
                      { type: "awards", label: "Awards" },
                      { type: "certifications", label: "Certifications" },
                      { type: "languages", label: "Languages" },
                      { type: "volunteer", label: "Volunteer" },
                      { type: "publications", label: "Publications" },
                      { type: "custom", label: "Custom" },
                    ].map(({ type, label }) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => addSection(type)}
                        className="text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Editor Content */}
                {activeSection === "personal" ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>

                    {/* Profile Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Profile Image
                      </label>
                      <ImageUpload
                        currentImage={resumeData.personalInfo.profileImage}
                        onImageUpload={(imageData) => updatePersonalInfo("profileImage", imageData)}
                        onImageRemove={() => updatePersonalInfo("profileImage", null)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <Input
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                          placeholder="John Doe"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <Input
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          placeholder="john@example.com"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                        <Input
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={resumeData.personalInfo.showLocation}
                              onCheckedChange={(checked) => updatePersonalInfo("showLocation", checked)}
                            />
                            <span className="text-xs text-gray-500">Show</span>
                          </div>
                        </div>
                        <Input
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo("location", e.target.value)}
                          placeholder="New York, NY"
                          className="dark:bg-gray-700 dark:border-gray-600"
                          disabled={!resumeData.personalInfo.showLocation}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={resumeData.personalInfo.showWebsite}
                              onCheckedChange={(checked) => updatePersonalInfo("showWebsite", checked)}
                            />
                            <span className="text-xs text-gray-500">Show</span>
                          </div>
                        </div>
                        <Input
                          value={resumeData.personalInfo.website}
                          onChange={(e) => updatePersonalInfo("website", e.target.value)}
                          placeholder="https://johndoe.com"
                          className="dark:bg-gray-700 dark:border-gray-600"
                          disabled={!resumeData.personalInfo.showWebsite}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={resumeData.personalInfo.showLinkedIn}
                              onCheckedChange={(checked) => updatePersonalInfo("showLinkedIn", checked)}
                            />
                            <span className="text-xs text-gray-500">Show</span>
                          </div>
                        </div>
                        <Input
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/johndoe"
                          className="dark:bg-gray-700 dark:border-gray-600"
                          disabled={!resumeData.personalInfo.showLinkedIn}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Professional Summary
                          </label>
                          <Badge variant="secondary" className="text-xs">
                            <Markdown className="w-3 h-3 mr-1" />
                            Markdown
                          </Badge>
                        </div>
                        <MarkdownEditor
                          value={resumeData.personalInfo.summary}
                          onChange={(value) => updatePersonalInfo("summary", value)}
                          placeholder="Brief professional summary with **bold** and *italic* text..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <SectionEditor
                    section={resumeData.sections.find((s) => s.id === activeSection)}
                    onUpdate={(updatedSection) => updateSection(activeSection, updatedSection)}
                    onRemove={() => removeSection(activeSection)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Resume Preview */}
          <div
            ref={previewRef}
            className={`${previewMode ? "w-full" : "flex-1"} bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto transition-all duration-300`}
          >
            <div className="max-w-4xl mx-auto">
              <ResumePreview data={resumeData} template={selectedTemplate} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>

        {/* Add this before the closing </div> of the main component */}
        <DebugPanel
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
          isVisible={process.env.NODE_ENV === "development"}
        />

        {/* Template Selector Modal */}
        {showTemplateSelector && (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplateSelector(false)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Auth Prompt Modal */}
        {showAuthPrompt && (
          <AuthPrompt
            onClose={() => setShowAuthPrompt(false)}
            onAuth={() => {
              setIsAuthenticated(true)
              setShowAuthPrompt(false)
            }}
            isDarkMode={isDarkMode}
          />
        )}

        {/* AI Rewrite Modal */}
        {showAIRewrite && (
          <AIRewrite
            onClose={() => setShowAIRewrite(false)}
            onApply={(optimizedData) => {
              setResumeData(optimizedData)
              setShowAIRewrite(false)
            }}
            currentResumeData={resumeData}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
