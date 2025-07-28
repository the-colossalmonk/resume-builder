"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star, Briefcase, GraduationCap, Code, Palette, Users, Award } from "lucide-react"
import Link from "next/link"

interface ResumeExample {
  id: string
  name: string
  profession: string
  industry: string
  template: string
  experience: string
  preview: string
  description: string
  highlights: string[]
  rating: number
  downloads: number
  tags: string[]
}

export default function ExamplesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const [selectedExperience, setSelectedExperience] = useState<string>("all")

  const examples: ResumeExample[] = [
    {
      id: "sarah-tech",
      name: "Sarah Johnson",
      profession: "Senior Software Engineer",
      industry: "Technology",
      template: "modern-1",
      experience: "senior",
      preview: "/placeholder.svg?height=400&width=300&text=Sarah+Johnson+Resume",
      description:
        "A comprehensive resume showcasing 8+ years of full-stack development experience with leadership roles.",
      highlights: [
        "Led team of 12 developers",
        "Increased system performance by 40%",
        "Architected microservices platform",
      ],
      rating: 4.9,
      downloads: 2847,
      tags: ["React", "Node.js", "AWS", "Team Leadership"],
    },
    {
      id: "michael-marketing",
      name: "Michael Chen",
      profession: "Marketing Director",
      industry: "Marketing",
      template: "creative-2",
      experience: "senior",
      preview: "/placeholder.svg?height=400&width=300&text=Michael+Chen+Resume",
      description:
        "Creative marketing professional with proven track record in digital campaigns and brand management.",
      highlights: ["Grew brand awareness by 150%", "Managed $2M marketing budget", "Led rebranding initiative"],
      rating: 4.8,
      downloads: 1923,
      tags: ["Digital Marketing", "Brand Strategy", "Analytics", "Team Management"],
    },
    {
      id: "emily-designer",
      name: "Emily Rodriguez",
      profession: "UX/UI Designer",
      industry: "Design",
      template: "creative-1",
      experience: "mid",
      preview: "/placeholder.svg?height=400&width=300&text=Emily+Rodriguez+Resume",
      description: "User-centered designer with expertise in mobile and web applications across various industries.",
      highlights: [
        "Improved user engagement by 60%",
        "Designed award-winning mobile app",
        "Led design system creation",
      ],
      rating: 4.9,
      downloads: 3156,
      tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      id: "david-finance",
      name: "David Park",
      profession: "Financial Analyst",
      industry: "Finance",
      template: "classic-1",
      experience: "entry",
      preview: "/placeholder.svg?height=400&width=300&text=David+Park+Resume",
      description: "Recent finance graduate with internship experience and strong analytical skills.",
      highlights: ["CFA Level 1 candidate", "Internship at Goldman Sachs", "Valuation model expertise"],
      rating: 4.7,
      downloads: 1654,
      tags: ["Financial Modeling", "Excel", "Bloomberg", "Valuation"],
    },
    {
      id: "lisa-healthcare",
      name: "Dr. Lisa Thompson",
      profession: "Physician",
      industry: "Healthcare",
      template: "classic-2",
      experience: "senior",
      preview: "/placeholder.svg?height=400&width=300&text=Dr+Lisa+Thompson+Resume",
      description: "Board-certified physician with specialization in internal medicine and research experience.",
      highlights: ["Published 15 peer-reviewed papers", "Chief Resident 2019-2020", "Fluent in 3 languages"],
      rating: 4.8,
      downloads: 987,
      tags: ["Internal Medicine", "Research", "Patient Care", "Medical Education"],
    },
    {
      id: "james-sales",
      name: "James Wilson",
      profession: "Sales Manager",
      industry: "Sales",
      template: "modern-2",
      experience: "mid",
      preview: "/placeholder.svg?height=400&width=300&text=James+Wilson+Resume",
      description: "Results-driven sales professional with consistent track record of exceeding targets.",
      highlights: ["Exceeded quota by 125% for 3 years", "Built territory from $0 to $2M", "Trained 20+ sales reps"],
      rating: 4.6,
      downloads: 2341,
      tags: ["B2B Sales", "CRM", "Territory Management", "Team Training"],
    },
    {
      id: "anna-education",
      name: "Anna Martinez",
      profession: "High School Teacher",
      industry: "Education",
      template: "minimal-1",
      experience: "mid",
      preview: "/placeholder.svg?height=400&width=300&text=Anna+Martinez+Resume",
      description: "Dedicated educator with innovative teaching methods and strong student engagement results.",
      highlights: ["Improved test scores by 30%", "Teacher of the Year 2022", "Developed new curriculum"],
      rating: 4.9,
      downloads: 1456,
      tags: ["Curriculum Development", "Student Engagement", "Educational Technology", "Assessment"],
    },
    {
      id: "robert-consulting",
      name: "Robert Kim",
      profession: "Management Consultant",
      industry: "Consulting",
      template: "minimal-2",
      experience: "senior",
      preview: "/placeholder.svg?height=400&width=300&text=Robert+Kim+Resume",
      description: "Strategic consultant with expertise in operational efficiency and digital transformation.",
      highlights: ["Led $50M cost reduction project", "Consulted for Fortune 500 companies", "MBA from Wharton"],
      rating: 4.8,
      downloads: 1789,
      tags: ["Strategy", "Operations", "Digital Transformation", "Project Management"],
    },
    {
      id: "maria-startup",
      name: "Maria Garcia",
      profession: "Startup Founder",
      industry: "Entrepreneurship",
      template: "modern-3",
      experience: "senior",
      preview: "/placeholder.svg?height=400&width=300&text=Maria+Garcia+Resume",
      description: "Serial entrepreneur with two successful exits and expertise in fintech and AI.",
      highlights: ["Founded 3 startups", "Raised $25M in funding", "Successful exit to Microsoft"],
      rating: 4.9,
      downloads: 2156,
      tags: ["Entrepreneurship", "Fundraising", "Product Strategy", "AI/ML"],
    },
  ]

  const industries = [
    { id: "all", name: "All Industries", icon: <Users className="w-4 h-4" /> },
    { id: "Technology", name: "Technology", icon: <Code className="w-4 h-4" /> },
    { id: "Marketing", name: "Marketing", icon: <Palette className="w-4 h-4" /> },
    { id: "Design", name: "Design", icon: <Palette className="w-4 h-4" /> },
    { id: "Finance", name: "Finance", icon: <Briefcase className="w-4 h-4" /> },
    { id: "Healthcare", name: "Healthcare", icon: <Award className="w-4 h-4" /> },
    { id: "Sales", name: "Sales", icon: <Briefcase className="w-4 h-4" /> },
    { id: "Education", name: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "Consulting", name: "Consulting", icon: <Users className="w-4 h-4" /> },
    { id: "Entrepreneurship", name: "Entrepreneurship", icon: <Award className="w-4 h-4" /> },
  ]

  const experienceLevels = [
    { id: "all", name: "All Levels" },
    { id: "entry", name: "Entry Level (0-2 years)" },
    { id: "mid", name: "Mid Level (3-7 years)" },
    { id: "senior", name: "Senior Level (8+ years)" },
  ]

  const filteredExamples = examples.filter((example) => {
    const industryMatch = selectedIndustry === "all" || example.industry === selectedIndustry
    const experienceMatch = selectedExperience === "all" || example.experience === selectedExperience
    return industryMatch && experienceMatch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Examples</h1>
              <p className="text-gray-600 mt-2">
                Get inspired by real resumes from professionals who landed their dream jobs
              </p>
            </div>
            <Link href="/builder">
              <Button size="lg">Create Your Resume</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Industry Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Industry</h3>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((industry) => (
                  <Button
                    key={industry.id}
                    variant={selectedIndustry === industry.id ? "default" : "outline"}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className="justify-start"
                    size="sm"
                  >
                    {industry.icon}
                    <span className="ml-2">{industry.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Experience</h3>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedExperience === level.id ? "default" : "outline"}
                    onClick={() => setSelectedExperience(level.id)}
                    className="w-full justify-start"
                    size="sm"
                  >
                    {level.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredExamples.length} resume{filteredExamples.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((example) => (
            <Card key={example.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={example.preview || "/placeholder.svg"}
                  alt={`${example.name} resume`}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Link href={`/builder?template=${example.template}`}>
                      <Button size="sm">Use Template</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{example.name}</h3>
                    <p className="text-blue-600 font-medium">{example.profession}</p>
                    <p className="text-gray-500 text-sm">{example.industry}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {example.experience}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{example.description}</p>

                {/* Key Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {example.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {example.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {example.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{example.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{example.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{example.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Link href={`/builder?template=${example.template}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real professionals who used our templates to land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">95% Success Rate</h3>
              <p className="text-gray-600">
                Users who customize our templates report a 95% interview callback rate within 30 days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">50,000+ Hired</h3>
              <p className="text-gray-600">
                Over 50,000 professionals have successfully landed jobs using our resume templates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Companies</h3>
              <p className="text-gray-600">
                Our users have been hired by Google, Microsoft, Apple, Amazon, and other Fortune 500 companies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of professionals who have transformed their careers with our resume builder.
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Start Building Your Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
