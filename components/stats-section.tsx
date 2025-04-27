"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, Languages, MessageSquare, Video } from "lucide-react"

const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "10,000+",
    label: "Active Users",
    description: "People using SenseConnect daily",
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    value: "15+",
    label: "Languages",
    description: "Including Indian regional languages",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    value: "1M+",
    label: "Translations",
    description: "Messages translated every month",
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    value: "5,000+",
    label: "Video Calls",
    description: "Enhanced with live captioning",
  },
]

export function StatsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Impact</h2>
          <p className="mt-2 text-muted-foreground md:text-xl">
            SenseConnect is making communication accessible for everyone
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
            >
              <div className="rounded-full p-3 bg-primary/10 mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-lg font-medium text-primary">{stat.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
