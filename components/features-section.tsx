"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Hand, Headphones, MessageSquare, Video, Languages, Globe, Braces, Brain } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <Hand className="h-8 w-8 text-primary" />,
    title: "Sign Language Translator",
    description:
      "Real-time sign language recognition and translation into text and speech, supporting multiple languages.",
    href: "/sign-language",
    details: [
      "Real-time hand gesture recognition",
      "Translation to multiple languages",
      "Text-to-speech output",
      "Video upload support",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "Speech & Text Translation",
    description: "Convert speech to text, text to speech, and translate between multiple languages seamlessly.",
    href: "/speech-text",
    details: [
      "Real-time speech recognition",
      "Multilingual translation",
      "Natural-sounding text-to-speech",
      "Support for Indian regional languages",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Multilingual Chat",
    description: "Chat across language barriers with real-time translation between Indian regional languages.",
    href: "/chat",
    details: [
      "Real-time message translation",
      "Voice input support",
      "Text-to-speech for received messages",
      "Support for multiple Indian languages",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: "Video Call Integration",
    description: "Enhance video calls with live captioning and translation for more inclusive meetings.",
    href: "/video-call",
    details: [
      "Live captioning during calls",
      "Multi-language support",
      "Transcript recording",
      "Integration with popular platforms",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

const technologies = [
  {
    icon: <Hand className="h-6 w-6" />,
    name: "Sign Language Recognition",
    description: "Advanced ML models trained on diverse sign language datasets",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    name: "Speech Recognition",
    description: "High-accuracy speech-to-text conversion in multiple languages",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    name: "Translation Engine",
    description: "Neural machine translation with support for Indian languages",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    name: "AI Processing",
    description: "Real-time processing with optimized machine learning models",
  },
  {
    icon: <Braces className="h-6 w-6" />,
    name: "API Integration",
    description: "Seamless integration with existing communication platforms",
  },
  {
    icon: <Languages className="h-6 w-6" />,
    name: "Language Support",
    description: "15+ languages including regional Indian languages",
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <section id="features" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
              <Languages className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Breaking Communication Barriers</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SenseConnect offers a comprehensive suite of tools to make communication accessible for everyone.
            </p>
          </div>

          <Tabs defaultValue="features" className="w-full max-w-4xl" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-8">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
                variants={container}
                initial="hidden"
                animate={activeTab === "features" ? "visible" : "hidden"}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full p-2 bg-primary/10">{feature.icon}</div>
                          <h3 className="text-xl font-bold">{feature.title}</h3>
                        </div>
                        <p className="mt-3 text-muted-foreground">{feature.description}</p>
                        <ul className="mt-4 space-y-2">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto p-6 pt-0">
                        <Link href={feature.href}>
                          <Button variant="outline" className="w-full">
                            Try {feature.title}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="technology" className="mt-8">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate={activeTab === "technology" ? "visible" : "hidden"}
              >
                {technologies.map((tech, index) => (
                  <motion.div key={index} variants={item}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="rounded-full p-2 bg-primary/10 text-primary">{tech.icon}</div>
                          <h3 className="font-medium">{tech.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
