"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Languages, Headphones, Hand, MessageSquare, Video } from "lucide-react"

const features = [
  {
    icon: <Hand className="h-6 w-6" />,
    title: "Sign Language",
    description: "Real-time sign language translation",
    href: "/sign-language",
    color: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Speech & Text",
    description: "Seamless speech-to-text conversion",
    href: "/speech-text",
    color: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Multilingual Chat",
    description: "Chat across language barriers",
    href: "/chat",
    color: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: "Video Calls",
    description: "Enhanced video calls with live captions",
    href: "/video-call",
    color: "bg-amber-100 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.div
                className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Breaking Communication Barriers
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Connect Beyond <span className="text-primary">Language</span> Barriers
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                SenseConnect uses AI to bridge communication gaps, making interaction accessible for everyone through
                sign language translation, speech-to-text, and multilingual support.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link href="/sign-language">
                <Button size="lg" className="w-full">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full">
                  Explore Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/20 z-10 rounded-xl" />
              <img
                alt="SenseConnect Platform"
                className="object-cover w-full h-full"
                src="/placeholder.svg?height=620&width=1100"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Languages className="h-20 w-20 text-primary/70" />
              </div>
            </div>
            {/* Floating feature cards */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`absolute hidden md:flex items-center gap-2 p-3 rounded-lg shadow-lg ${feature.color} border border-background/20`}
                style={{
                  top: `${20 + index * 20}%`,
                  right: index % 2 === 0 ? "auto" : "-5%",
                  left: index % 2 === 0 ? "-5%" : "auto",
                  zIndex: 20,
                }}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className={`p-2 rounded-full ${feature.color} ${feature.iconColor}`}>{feature.icon}</div>
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
