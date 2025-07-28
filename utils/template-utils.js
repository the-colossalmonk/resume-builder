// Template validation and compatibility utilities

export const AVAILABLE_TEMPLATES = [
  "modern",
  "classic",
  "minimal",
  "creative",
  "executive",
  "technical",
  "academic",
  "startup",
  "consultant",
  "modern-1",
  "classic-1",
  "creative-1",
  "minimal-1",
  "modern-2",
  "classic-2",
  "creative-2",
  "minimal-2",
  "modern-3",
]

export const TEMPLATE_CATEGORIES = {
  modern: ["modern", "modern-1", "modern-2", "modern-3", "technical", "startup"],
  classic: ["classic", "classic-1", "classic-2", "executive", "academic"],
  creative: ["creative", "creative-1", "creative-2"],
  minimal: ["minimal", "minimal-1", "minimal-2", "consultant"],
}

export const validateTemplate = (templateId) => {
  if (!templateId || typeof templateId !== "string") {
    return { isValid: false, template: "modern", error: "Invalid template ID" }
  }

  if (!AVAILABLE_TEMPLATES.includes(templateId)) {
    return {
      isValid: false,
      template: "modern",
      error: `Template "${templateId}" not found. Available templates: ${AVAILABLE_TEMPLATES.join(", ")}`,
    }
  }

  return { isValid: true, template: templateId, error: null }
}

export const getTemplateCategory = (templateId) => {
  for (const [category, templates] of Object.entries(TEMPLATE_CATEGORIES)) {
    if (templates.includes(templateId)) {
      return category
    }
  }
  return "modern" // default category
}

export const getTemplateMetadata = (templateId) => {
  const metadata = {
    modern: {
      name: "Modern",
      description: "Clean and contemporary design",
      features: ["ATS-Friendly", "Two-Column Layout"],
    },
    classic: {
      name: "Classic",
      description: "Traditional professional layout",
      features: ["Single Column", "Professional Typography"],
    },
    minimal: {
      name: "Minimal",
      description: "Simple and elegant design",
      features: ["Minimalist Design", "Maximum Readability"],
    },
    creative: {
      name: "Creative",
      description: "Bold and eye-catching layout",
      features: ["Visual Elements", "Custom Graphics"],
    },
    "modern-1": {
      name: "Modern Professional",
      description: "Clean, contemporary design perfect for tech professionals",
      features: ["ATS-Friendly", "Skills Visualization"],
    },
    "classic-1": {
      name: "Executive Classic",
      description: "Traditional format ideal for senior positions",
      features: ["Executive Format", "Leadership Focus"],
    },
    "creative-1": {
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      features: ["Portfolio Section", "Visual Elements"],
    },
    "minimal-1": {
      name: "Minimal Clean",
      description: "Simple, elegant design focusing on content",
      features: ["Clean Typography", "Print Optimized"],
    },
    "modern-2": {
      name: "Tech Innovator",
      description: "Modern template designed for tech professionals",
      features: ["Skills Visualization", "Project Showcase"],
    },
    "classic-2": {
      name: "Academic Scholar",
      description: "Perfect for academic positions and research roles",
      features: ["Publications Section", "Research Focus"],
    },
    "creative-2": {
      name: "Marketing Pro",
      description: "Dynamic design for marketing professionals",
      features: ["Achievement Highlights", "Visual Metrics"],
    },
    "minimal-2": {
      name: "Simple Elegance",
      description: "Understated elegance for any professional field",
      features: ["Clean Typography", "Subtle Accents"],
    },
    "modern-3": {
      name: "Startup Founder",
      description: "Bold, innovative design for entrepreneurs",
      features: ["Leadership Focus", "Venture Highlights"],
    },
  }

  return metadata[templateId] || metadata["modern"]
}
