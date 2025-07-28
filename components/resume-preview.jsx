"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar } from "lucide-react"

export default function ResumePreview({ data, template = "modern", isDarkMode = false }) {
  const { personalInfo, sections } = data

  const getTemplateStyles = (template) => {
    const styles = {
      modern: {
        headerBg: "bg-gradient-to-r from-blue-600 to-purple-600",
        accentColor: "border-blue-600",
        textColor: "text-gray-900 dark:text-white",
        sectionSpacing: "mb-8",
      },
      classic: {
        headerBg: "bg-gray-900 dark:bg-gray-800",
        accentColor: "border-gray-600",
        textColor: "text-gray-900 dark:text-white",
        sectionSpacing: "mb-6",
      },
      creative: {
        headerBg: "bg-gradient-to-r from-pink-500 to-orange-500",
        accentColor: "border-pink-500",
        textColor: "text-gray-900 dark:text-white",
        sectionSpacing: "mb-10",
      },
      minimal: {
        headerBg: "bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700",
        accentColor: "border-gray-400",
        textColor: "text-gray-900 dark:text-white",
        sectionSpacing: "mb-6",
      },
    }

    // Handle template variations (modern-1, classic-1, etc.)
    const baseTemplate = template.split("-")[0]
    return styles[baseTemplate] || styles["modern"]
  }

  const templateStyles = getTemplateStyles(template)

  const renderMarkdown = (text) => {
    if (!text) return ""
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
      .replace(/- (.*?)(?=\n|$)/g, "• $1")
  }

  const renderSection = (section) => {
    if (!section.isVisible) return null

    const visibleItems = section.items.filter((item) => item.isVisible)
    if (visibleItems.length === 0) return null

    switch (section.type) {
      case "experience":
        return (
          <div key={section.id} className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              {section.title}
            </h3>
            {visibleItems.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.company} logo`}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <div>
                        <h4 className={`text-lg font-semibold ${templateStyles.textColor}`}>{item.position}</h4>
                        <div className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{item.company}</span>
                          {section.showCompanyLocation && item.location && <span> • {item.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {section.showDates && (item.startDate || item.endDate) && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.startDate} - {item.current ? "Present" : item.endDate}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(item.description) }}
                  />
                )}
              </div>
            ))}
          </div>
        )

      case "education":
        return (
          <div key={section.id} className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              {section.title}
            </h3>
            {visibleItems.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.institution} logo`}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <div>
                        <h4 className={`text-lg font-semibold ${templateStyles.textColor}`}>{item.degree}</h4>
                        <div className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{item.institution}</span>
                          {section.showLocation && item.location && <span> • {item.location}</span>}
                        </div>
                        {section.showGPA && item.gpa && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">GPA: {item.gpa}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {(item.startDate || item.endDate) && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.startDate} - {item.endDate}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(item.description) }}
                  />
                )}
              </div>
            ))}
          </div>
        )

      case "skills":
        return (
          <div key={section.id} className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {visibleItems.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )

      case "projects":
        return (
          <div key={section.id} className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              {section.title}
            </h3>
            {visibleItems.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.name} preview`}
                          className="w-12 h-8 rounded object-cover"
                        />
                      )}
                      <div>
                        <h4 className={`text-lg font-semibold ${templateStyles.textColor} flex items-center gap-2`}>
                          {item.name}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </h4>
                        {item.technologies && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.technologies.split(",").map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {(item.startDate || item.endDate) && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.startDate} - {item.endDate}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none mb-2"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(item.description) }}
                  />
                )}
                <div className="flex gap-2">
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div key={section.id} className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              {section.title}
            </h3>
            {visibleItems.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="text-gray-700 dark:text-gray-300">{JSON.stringify(item, null, 2)}</div>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <Card
      className={`w-full max-w-4xl mx-auto shadow-2xl transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
    >
      <div className="p-8">
        {/* Header */}
        <div
          className={`text-center mb-8 pb-6 ${templateStyles.headerBg === "bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700" ? templateStyles.headerBg : `${templateStyles.headerBg} text-white rounded-lg p-6 mb-8`}`}
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            {personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
              />
            )}
            <div className={personalInfo.profileImage ? "text-left" : "text-center"}>
              <h1 className={`text-4xl font-bold ${templateStyles.textColor} mb-2`}>
                {personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.showLocation && personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {personalInfo.location}
                  </div>
                )}
              </div>
              {((personalInfo.showWebsite && personalInfo.website) ||
                (personalInfo.showLinkedIn && personalInfo.linkedin)) && (
                <div className="flex flex-wrap justify-center gap-4 text-blue-600 dark:text-blue-400 mt-2">
                  {personalInfo.showWebsite && personalInfo.website && (
                    <a
                      href={personalInfo.website}
                      className="hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  )}
                  {personalInfo.showLinkedIn && personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      className="hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className={templateStyles.sectionSpacing}>
            <h3
              className={`text-xl font-bold ${templateStyles.textColor} mb-4 border-b-2 ${templateStyles.accentColor} pb-2`}
            >
              Professional Summary
            </h3>
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(personalInfo.summary) }}
            />
          </div>
        )}

        {/* Sections */}
        {sections.map(renderSection)}
      </div>
    </Card>
  )
}
