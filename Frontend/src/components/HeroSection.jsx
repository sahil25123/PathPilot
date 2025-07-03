import React from 'react'
import { useState , useEffect } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ArrowRight , Play } from 'lucide-react'

const HeroSection = () => {
    const [currentText, setCurrentText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false);

     const texts = [
    "One tool to prepare, apply, and succeed.",
    "AI-powered career acceleration.",
    "Your path to dream jobs starts here.",
  ]

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (!isDeleting) {
          setCurrentText(current.substring(0, currentText.length + 1))

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(current.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
            🚀 AI-Powered Career Assistant
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {currentText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Combine resume analysis, AI-generated cover letters, mock interviews, and career planning tools into a
            single seamless experience that accelerates your job search.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-indigo-500/25 px-8 py-4 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              <Play className="mr-2 w-5 h-5" />
              See Demo
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-3xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
              <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-indigo-500/50 to-transparent rounded"></div>
                  <div className="h-4 bg-gradient-to-r from-blue-500/50 to-transparent rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-violet-500/50 to-transparent rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection
