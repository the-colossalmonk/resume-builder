"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Bold, Italic, List, Link } from "lucide-react"

export default function MarkdownEditor({ value, onChange, placeholder }) {
  const [isPreview, setIsPreview] = useState(false)

  const insertMarkdown = (before, after = "") => {
    const textarea = document.querySelector(`textarea[value="${value}"]`)
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end)
      onChange(newValue)

      // Reset cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      }, 0)
    }
  }

  const renderMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
      .replace(/- (.*?)(?=\n|$)/g, "• $1")
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} className="p-1 h-8 w-8">
            <Bold className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} className="p-1 h-8 w-8">
            <Italic className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ")} className="p-1 h-8 w-8">
            <List className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](url)")} className="p-1 h-8 w-8">
            <Link className="w-3 h-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center space-x-1"
        >
          {isPreview ? <Edit className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          <span className="text-xs">{isPreview ? "Edit" : "Preview"}</span>
        </Button>
      </div>

      {isPreview ? (
        <div
          className="min-h-[100px] p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 text-sm"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value || "Nothing to preview...") }}
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
        />
      )}
    </div>
  )
}
