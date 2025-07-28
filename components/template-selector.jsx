"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

export default function TemplateSelector({ selectedTemplate, onSelect, onClose }) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
      preview: "/placeholder.svg?height=300&width=200&text=Modern+Template",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional professional layout",
      preview: "/placeholder.svg?height=300&width=200&text=Classic+Template",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design",
      preview: "/placeholder.svg?height=300&width=200&text=Minimal+Template",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and eye-catching layout",
      preview: "/placeholder.svg?height=300&width=200&text=Creative+Template",
    },
    {
      id: "modern-1",
      name: "Modern Professional",
      description: "Clean, contemporary design perfect for tech and business professionals",
      preview: "/placeholder.svg?height=300&width=200&text=Modern+Professional",
    },
    {
      id: "classic-1",
      name: "Executive Classic",
      description: "Traditional format ideal for senior positions",
      preview: "/placeholder.svg?height=300&width=200&text=Executive+Classic",
    },
    {
      id: "creative-1",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      preview: "/placeholder.svg?height=300&width=200&text=Creative+Designer",
    },
    {
      id: "minimal-1",
      name: "Minimal Clean",
      description: "Simple, elegant design focusing on content",
      preview: "/placeholder.svg?height=300&width=200&text=Minimal+Clean",
    },
    {
      id: "modern-2",
      name: "Tech Innovator",
      description: "Modern template designed for tech professionals",
      preview: "/placeholder.svg?height=300&width=200&text=Tech+Innovator",
    },
    {
      id: "classic-2",
      name: "Academic Scholar",
      description: "Perfect for academic positions and research roles",
      preview: "/placeholder.svg?height=300&width=200&text=Academic+Scholar",
    },
    {
      id: "creative-2",
      name: "Marketing Pro",
      description: "Dynamic design for marketing professionals",
      preview: "/placeholder.svg?height=300&width=200&text=Marketing+Pro",
    },
    {
      id: "minimal-2",
      name: "Simple Elegance",
      description: "Understated elegance for any professional field",
      preview: "/placeholder.svg?height=300&width=200&text=Simple+Elegance",
    },
    {
      id: "modern-3",
      name: "Startup Founder",
      description: "Bold, innovative design for entrepreneurs",
      preview: "/placeholder.svg?height=300&width=200&text=Startup+Founder",
    },
  ]

  const templateCategories = {
    modern: templates.filter((t) => t.id.includes("modern") || t.id === "modern"),
    classic: templates.filter((t) => t.id.includes("classic") || t.id === "classic"),
    creative: templates.filter((t) => t.id.includes("creative") || t.id === "creative"),
    minimal: templates.filter((t) => t.id.includes("minimal") || t.id === "minimal"),
    other: templates.filter(
      (t) => !["modern", "classic", "creative", "minimal"].some((cat) => t.id.includes(cat) || t.id === cat),
    ),
  }

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredTemplates(templates)
    } else {
      setFilteredTemplates(templateCategories[selectedCategory] || [])
    }
  }, [selectedCategory])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 p-6">
          {["all", "modern", "classic", "creative", "minimal", "other"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {category !== "all" && (
                <span className="ml-1 text-xs opacity-75">({templateCategories[category]?.length || 0})</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => onSelect(template.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={`${template.name} template preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Selected
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Apply Template</Button>
        </div>
      </div>
    </div>
  )
}
