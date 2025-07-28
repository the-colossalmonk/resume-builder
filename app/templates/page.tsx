"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Palette } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  category: "modern" | "classic" | "creative" | "minimal"
  preview: string
  description: string
  features: string[]
  isPremium: boolean
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const templates: Template[] = [
    {
      id: "modern-1",
      name: "Modern Professional",
      category: "modern",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Clean, contemporary design perfect for tech and business professionals",
      features: ["ATS-Friendly", "Two-Column Layout", "Color Customization"],
      isPremium: false,
    },
    {
      id: "classic-1",
      name: "Executive Classic",
      category: "classic",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Traditional format ideal for senior positions and conservative industries",
      features: ["Single Column", "Professional Typography", "Industry Standard"],
      isPremium: false,
    },
    {
      id: "creative-1",
      name: "Creative Designer",
      category: "creative",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Eye-catching design for creative professionals and designers",
      features: ["Visual Elements", "Portfolio Section", "Custom Graphics"],
      isPremium: true,
    },
    {
      id: "minimal-1",
      name: "Minimal Clean",
      category: "minimal",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Simple, elegant design focusing on content over decoration",
      features: ["Minimalist Design", "Maximum Readability", "Print Optimized"],
      isPremium: false,
    },
    {
      id: "modern-2",
      name: "Tech Innovator",
      category: "modern",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Modern template designed specifically for tech professionals",
      features: ["Skills Visualization", "Project Showcase", "GitHub Integration"],
      isPremium: true,
    },
    {
      id: "classic-2",
      name: "Academic Scholar",
      category: "classic",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Perfect for academic positions and research roles",
      features: ["Publications Section", "Research Focus", "Academic Format"],
      isPremium: false,
    },
    {
      id: "creative-2",
      name: "Marketing Pro",
      category: "creative",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Dynamic design for marketing and sales professionals",
      features: ["Achievement Highlights", "Visual Metrics", "Brand Colors"],
      isPremium: true,
    },
    {
      id: "minimal-2",
      name: "Simple Elegance",
      category: "minimal",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Understated elegance for any professional field",
      features: ["Clean Typography", "Subtle Accents", "Universal Appeal"],
      isPremium: false,
    },
    {
      id: "modern-3",
      name: "Startup Founder",
      category: "modern",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Bold, innovative design for entrepreneurs and startup professionals",
      features: ["Leadership Focus", "Venture Highlights", "Growth Metrics"],
      isPremium: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "modern", name: "Modern", count: templates.filter((t) => t.category === "modern").length },
    { id: "classic", name: "Classic", count: templates.filter((t) => t.category === "classic").length },
    { id: "creative", name: "Creative", count: templates.filter((t) => t.category === "creative").length },
    { id: "minimal", name: "Minimal", count: templates.filter((t) => t.category === "minimal").length },
  ]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((t) => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Templates</h1>
              <p className="text-gray-600 mt-2">
                Choose from our collection of professionally designed, ATS-friendly templates
              </p>
            </div>
            <Link href="/builder">
              <Button size="lg">Start Building</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                {template.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">Premium</Badge>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Link href={`/builder?template=${template.id}`}>
                      <Button size="sm">Use Template</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
                  <Badge variant="outline" className="capitalize">
                    {template.category}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Link href={`/builder?template=${template.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Features */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Templates?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every template is carefully crafted to help you stand out while maintaining professional standards that
              recruiters expect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS-Optimized</h3>
              <p className="text-gray-600">
                All templates are designed to pass through Applicant Tracking Systems while maintaining visual appeal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Customizable</h3>
              <p className="text-gray-600">
                Customize colors, fonts, and layouts to match your personal brand and industry requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Print-Ready</h3>
              <p className="text-gray-600">
                Export high-quality PDFs that look perfect both on screen and when printed for interviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
