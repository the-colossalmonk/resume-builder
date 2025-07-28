"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Eye, EyeOff, BookMarkedIcon as Markdown } from "lucide-react"
import MarkdownEditor from "./markdown-editor"
import ImageUpload from "./image-upload"

export default function SectionEditor({ section, onUpdate, onRemove }) {
  if (!section) return null

  const addItem = () => {
    const newItem = getEmptyItem(section.type)
    const updatedSection = {
      ...section,
      items: [...section.items, { ...newItem, isVisible: true }],
    }
    onUpdate(updatedSection)
  }

  const updateItem = (index, field, value) => {
    const updatedItems = section.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    onUpdate({ ...section, items: updatedItems })
  }

  const removeItem = (index) => {
    const updatedItems = section.items.filter((_, i) => i !== index)
    onUpdate({ ...section, items: updatedItems })
  }

  const toggleItemVisibility = (index) => {
    const updatedItems = section.items.map((item, i) => (i === index ? { ...item, isVisible: !item.isVisible } : item))
    onUpdate({ ...section, items: updatedItems })
  }

  const updateSectionSettings = (field, value) => {
    onUpdate({ ...section, [field]: value })
  }

  const getEmptyItem = (type) => {
    switch (type) {
      case "experience":
        return {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [],
          image: null,
          isVisible: true,
        }
      case "education":
        return {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
          image: null,
          isVisible: true,
        }
      case "skills":
        return {
          name: "",
          level: "Intermediate",
          category: "",
          isVisible: true,
        }
      case "projects":
        return {
          name: "",
          description: "",
          technologies: "",
          startDate: "",
          endDate: "",
          url: "",
          github: "",
          image: null,
          isVisible: true,
        }
      case "awards":
        return {
          title: "",
          issuer: "",
          date: "",
          description: "",
          isVisible: true,
        }
      case "certifications":
        return {
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
          url: "",
          isVisible: true,
        }
      case "languages":
        return {
          language: "",
          proficiency: "Conversational",
          isVisible: true,
        }
      case "volunteer":
        return {
          organization: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          isVisible: true,
        }
      case "publications":
        return {
          title: "",
          publisher: "",
          date: "",
          url: "",
          description: "",
          isVisible: true,
        }
      case "custom":
        return {
          title: "",
          subtitle: "",
          date: "",
          description: "",
          isVisible: true,
        }
      default:
        return { isVisible: true }
    }
  }

  const renderItemEditor = (item, index) => {
    const commonProps = {
      className: "dark:bg-gray-700 dark:border-gray-600",
    }

    switch (section.type) {
      case "experience":
        return (
          <Card key={index} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  Experience {index + 1}
                  <Button variant="ghost" size="sm" onClick={() => toggleItemVisibility(index)} className="ml-2 p-1">
                    {item.isVisible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Logo</label>
                <ImageUpload
                  currentImage={item.image}
                  onImageUpload={(imageData) => updateItem(index, "image", imageData)}
                  onImageRemove={() => updateItem(index, "image", null)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                <Input
                  value={item.position}
                  onChange={(e) => updateItem(index, "position", e.target.value)}
                  placeholder="Software Engineer"
                  {...commonProps}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <Input
                  value={item.company}
                  onChange={(e) => updateItem(index, "company", e.target.value)}
                  placeholder="Tech Corp"
                  {...commonProps}
                />
              </div>

              {section.showCompanyLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <Input
                    value={item.location}
                    onChange={(e) => updateItem(index, "location", e.target.value)}
                    placeholder="San Francisco, CA"
                    {...commonProps}
                  />
                </div>
              )}

              {section.showDates && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <Input
                      value={item.startDate}
                      onChange={(e) => updateItem(index, "startDate", e.target.value)}
                      placeholder="Jan 2023"
                      {...commonProps}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <Input
                      value={item.endDate}
                      onChange={(e) => updateItem(index, "endDate", e.target.value)}
                      placeholder="Present"
                      disabled={item.current}
                      {...commonProps}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch checked={item.current} onCheckedChange={(checked) => updateItem(index, "current", checked)} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Currently working here</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <Badge variant="secondary" className="text-xs">
                    <Markdown className="w-3 h-3 mr-1" />
                    Markdown
                  </Badge>
                </div>
                <MarkdownEditor
                  value={item.description}
                  onChange={(value) => updateItem(index, "description", value)}
                  placeholder="Describe your responsibilities and achievements using **bold** and *italic* text..."
                />
              </div>
            </CardContent>
          </Card>
        )

      case "education":
        return (
          <Card key={index} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  Education {index + 1}
                  <Button variant="ghost" size="sm" onClick={() => toggleItemVisibility(index)} className="ml-2 p-1">
                    {item.isVisible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Institution Logo
                </label>
                <ImageUpload
                  currentImage={item.image}
                  onImageUpload={(imageData) => updateItem(index, "image", imageData)}
                  onImageRemove={() => updateItem(index, "image", null)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree</label>
                <Input
                  value={item.degree}
                  onChange={(e) => updateItem(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  {...commonProps}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
                <Input
                  value={item.institution}
                  onChange={(e) => updateItem(index, "institution", e.target.value)}
                  placeholder="University of Technology"
                  {...commonProps}
                />
              </div>

              {section.showLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <Input
                    value={item.location}
                    onChange={(e) => updateItem(index, "location", e.target.value)}
                    placeholder="Boston, MA"
                    {...commonProps}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <Input
                    value={item.startDate}
                    onChange={(e) => updateItem(index, "startDate", e.target.value)}
                    placeholder="Sep 2019"
                    {...commonProps}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <Input
                    value={item.endDate}
                    onChange={(e) => updateItem(index, "endDate", e.target.value)}
                    placeholder="May 2023"
                    {...commonProps}
                  />
                </div>
              </div>

              {section.showGPA && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    GPA (Optional)
                  </label>
                  <Input
                    value={item.gpa}
                    onChange={(e) => updateItem(index, "gpa", e.target.value)}
                    placeholder="3.8"
                    {...commonProps}
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description (Optional)
                  </label>
                  <Badge variant="secondary" className="text-xs">
                    <Markdown className="w-3 h-3 mr-1" />
                    Markdown
                  </Badge>
                </div>
                <MarkdownEditor
                  value={item.description}
                  onChange={(value) => updateItem(index, "description", value)}
                  placeholder="Relevant coursework, achievements, or activities..."
                />
              </div>
            </CardContent>
          </Card>
        )

      case "skills":
        return (
          <Card key={index} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  Skill {index + 1}
                  <Button variant="ghost" size="sm" onClick={() => toggleItemVisibility(index)} className="ml-2 p-1">
                    {item.isVisible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  placeholder="JavaScript"
                  {...commonProps}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category (Optional)
                </label>
                <Input
                  value={item.category}
                  onChange={(e) => updateItem(index, "category", e.target.value)}
                  placeholder="Programming Languages"
                  {...commonProps}
                />
              </div>
            </CardContent>
          </Card>
        )

      case "projects":
        return (
          <Card key={index} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  Project {index + 1}
                  <Button variant="ghost" size="sm" onClick={() => toggleItemVisibility(index)} className="ml-2 p-1">
                    {item.isVisible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
                <ImageUpload
                  currentImage={item.image}
                  onImageUpload={(imageData) => updateItem(index, "image", imageData)}
                  onImageRemove={() => updateItem(index, "image", null)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  placeholder="E-commerce Platform"
                  {...commonProps}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <Badge variant="secondary" className="text-xs">
                    <Markdown className="w-3 h-3 mr-1" />
                    Markdown
                  </Badge>
                </div>
                <MarkdownEditor
                  value={item.description}
                  onChange={(value) => updateItem(index, "description", value)}
                  placeholder="Describe the project and your role..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies</label>
                <Input
                  value={item.technologies}
                  onChange={(e) => updateItem(index, "technologies", e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                  {...commonProps}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <Input
                    value={item.startDate}
                    onChange={(e) => updateItem(index, "startDate", e.target.value)}
                    placeholder="Jan 2023"
                    {...commonProps}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <Input
                    value={item.endDate}
                    onChange={(e) => updateItem(index, "endDate", e.target.value)}
                    placeholder="Mar 2023"
                    {...commonProps}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Live URL (Optional)
                  </label>
                  <Input
                    value={item.url}
                    onChange={(e) => updateItem(index, "url", e.target.value)}
                    placeholder="https://project.com"
                    {...commonProps}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    GitHub (Optional)
                  </label>
                  <Input
                    value={item.github}
                    onChange={(e) => updateItem(index, "github", e.target.value)}
                    placeholder="https://github.com/..."
                    {...commonProps}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card key={index} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  Item {index + 1}
                  <Button variant="ghost" size="sm" onClick={() => toggleItemVisibility(index)} className="ml-2 p-1">
                    {item.isVisible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Custom section editor for {section.type}</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 bg-transparent"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove Section
        </Button>
      </div>

      {/* Section Settings */}
      <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Section Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Show section</span>
            <Switch
              checked={section.isVisible}
              onCheckedChange={(checked) => updateSectionSettings("isVisible", checked)}
            />
          </div>

          {section.type === "experience" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show company location</span>
                <Switch
                  checked={section.showCompanyLocation}
                  onCheckedChange={(checked) => updateSectionSettings("showCompanyLocation", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show dates</span>
                <Switch
                  checked={section.showDates}
                  onCheckedChange={(checked) => updateSectionSettings("showDates", checked)}
                />
              </div>
            </>
          )}

          {section.type === "education" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show location</span>
                <Switch
                  checked={section.showLocation}
                  onCheckedChange={(checked) => updateSectionSettings("showLocation", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show GPA</span>
                <Switch
                  checked={section.showGPA}
                  onCheckedChange={(checked) => updateSectionSettings("showGPA", checked)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Section Items */}
      {section.items.map((item, index) => renderItemEditor(item, index))}

      <Button variant="outline" onClick={addItem} className="w-full bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        Add{" "}
        {section.type === "experience"
          ? "Experience"
          : section.type === "education"
            ? "Education"
            : section.type === "skills"
              ? "Skill"
              : section.type === "projects"
                ? "Project"
                : "Item"}
      </Button>
    </div>
  )
}
