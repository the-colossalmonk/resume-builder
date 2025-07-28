"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X, Star, Shield, Zap, Users, Crown, Sparkles, FileText, Bot } from "lucide-react"
import Link from "next/link"

interface PricingTier {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  popular: boolean
  features: {
    name: string
    included: boolean
    description?: string
  }[]
  cta: string
  highlight?: string
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const tiers: PricingTier[] = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started with basic resume building",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        { name: "3 Resume Templates", included: true },
        { name: "Basic Resume Builder", included: true },
        { name: "PDF Download", included: true },
        { name: "Basic Customization", included: true },
        { name: "Email Support", included: true },
        { name: "Premium Templates", included: false },
        { name: "AI Content Suggestions", included: false },
        { name: "Cover Letter Builder", included: false },
        { name: "Multiple Resume Versions", included: false },
        { name: "Advanced Analytics", included: false },
        { name: "Priority Support", included: false },
        { name: "Team Collaboration", included: false },
      ],
      cta: "Get Started Free",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for job seekers who want professional results",
      monthlyPrice: 19,
      yearlyPrice: 190,
      popular: true,
      highlight: "Most Popular",
      features: [
        { name: "15+ Premium Templates", included: true },
        { name: "Advanced Resume Builder", included: true },
        { name: "Unlimited PDF Downloads", included: true },
        { name: "Full Customization", included: true },
        {
          name: "AI Content Suggestions",
          included: true,
          description: "Get AI-powered suggestions for better content",
        },
        { name: "Cover Letter Builder", included: true },
        { name: "Multiple Resume Versions", included: true },
        { name: "ATS Optimization", included: true },
        { name: "Priority Email Support", included: true },
        { name: "Advanced Analytics", included: false },
        { name: "Team Collaboration", included: false },
        { name: "White-label Export", included: false },
      ],
      cta: "Start Pro Trial",
    },
    {
      id: "premium",
      name: "Premium",
      description: "For professionals who demand the best tools and support",
      monthlyPrice: 39,
      yearlyPrice: 390,
      popular: false,
      features: [
        { name: "All Premium Templates", included: true },
        { name: "Advanced Resume Builder", included: true },
        { name: "Unlimited Everything", included: true },
        { name: "Full Customization", included: true },
        { name: "AI Content Suggestions", included: true },
        {
          name: "AI Resume Rewriting",
          included: true,
          description: "Automatically optimize your resume for specific jobs",
        },
        { name: "Cover Letter Builder", included: true },
        { name: "Multiple Resume Versions", included: true },
        { name: "Advanced Analytics", included: true, description: "Track resume performance and views" },
        { name: "Priority Phone Support", included: true },
        { name: "LinkedIn Integration", included: true },
        { name: "White-label Export", included: true },
      ],
      cta: "Start Premium Trial",
    },
    {
      id: "team",
      name: "Team",
      description: "Perfect for HR teams, career centers, and organizations",
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: false,
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Admin Dashboard", included: true },
        { name: "User Management", included: true },
        { name: "Brand Customization", included: true },
        { name: "API Access", included: true },
        { name: "Custom Templates", included: true },
        { name: "Dedicated Support", included: true },
        { name: "Training & Onboarding", included: true },
        { name: "Usage Analytics", included: true },
        { name: "SSO Integration", included: true },
        { name: "Custom Integrations", included: true },
      ],
      cta: "Contact Sales",
    },
  ]

  const getPrice = (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) return "Free"
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
    const period = isYearly ? "year" : "month"
    return `$${price}/${period}`
  }

  const getSavings = (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) return null
    const yearlyTotal = tier.monthlyPrice * 12
    const savings = yearlyTotal - tier.yearlyPrice
    return savings > 0 ? `Save $${savings}/year` : null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan to accelerate your job search and land your dream role
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white rounded-lg p-1 shadow-sm">
            <span className={`px-4 py-2 text-sm font-medium ${!isYearly ? "text-blue-600" : "text-gray-500"}`}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`px-4 py-2 text-sm font-medium ${isYearly ? "text-blue-600" : "text-gray-500"}`}>
              Yearly
            </span>
            {isYearly && <Badge className="bg-green-100 text-green-800 ml-2">Save up to 20%</Badge>}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative ${tier.popular ? "ring-2 ring-blue-500 shadow-xl scale-105" : "shadow-lg"} transition-all duration-300 hover:shadow-xl`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {tier.highlight}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  {tier.id === "free" && <FileText className="w-8 h-8 text-gray-600" />}
                  {tier.id === "pro" && <Zap className="w-8 h-8 text-blue-600" />}
                  {tier.id === "premium" && <Crown className="w-8 h-8 text-purple-600" />}
                  {tier.id === "team" && <Users className="w-8 h-8 text-green-600" />}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{tier.name}</CardTitle>
                <p className="text-gray-600 text-sm mt-2">{tier.description}</p>

                <div className="mt-6">
                  <div className="text-4xl font-bold text-gray-900">{getPrice(tier)}</div>
                  {isYearly && getSavings(tier) && (
                    <div className="text-green-600 text-sm font-medium mt-1">{getSavings(tier)}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${feature.included ? "text-gray-900" : "text-gray-400"}`}>
                          {feature.name}
                        </span>
                        {feature.description && <p className="text-xs text-gray-500 mt-1">{feature.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${tier.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ResumeBuilder?</h2>
            <p className="text-xl text-gray-600">Trusted by over 50,000 professionals worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Our AI analyzes job descriptions and optimizes your resume content for maximum impact and ATS
                compatibility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS-Optimized</h3>
              <p className="text-gray-600">
                All templates are designed to pass through Applicant Tracking Systems while maintaining visual appeal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Results</h3>
              <p className="text-gray-600">
                95% of our users report getting more interview callbacks within 30 days of using our platform.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your
                billing period.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm mb-4">
                We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">What's included in the free plan?</h3>
              <p className="text-gray-600 text-sm">
                The free plan includes access to 3 basic templates, PDF download, and basic customization options.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does the AI rewriting work?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our AI analyzes job descriptions and automatically adjusts your resume content to match the requirements
                and keywords.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Can I use multiple templates?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Pro and Premium users can create multiple resume versions with different templates for different job
                applications.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we use enterprise-grade security and encryption to protect your personal information and resume
                data.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of professionals who have transformed their careers with ResumeBuilder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
