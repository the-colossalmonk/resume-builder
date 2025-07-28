"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Lock } from "lucide-react"

export default function AuthPrompt({ onClose, onAuth, isDarkMode = false }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onAuth()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {isLogin ? "Sign In to Save" : "Create Account"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {isLogin
              ? "Sign in to save your resume and access it from anywhere."
              : "Create an account to save multiple resumes and access advanced features."}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Full Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={`text-sm text-blue-600 hover:text-blue-700 ${isDarkMode ? "text-blue-400 hover:text-blue-300" : ""}`}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className={`mt-4 pt-4 border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Continue as Guest
            </Button>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-2`}>
              Your resume won't be saved
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
