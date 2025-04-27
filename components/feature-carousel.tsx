"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Hand, Headphones, Languages, MessageSquare, Video } from "lucide-react"

export function FeatureCarousel() {
  const features = [
    {
      title: "Sign Language Recognition",
      description: "Advanced AI models recognize hand gestures and translate them into text in real-time",
      icon: <Hand className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Speech-to-Text & Text-to-Speech",
      description: "Convert spoken words to text and text back to natural-sounding speech",
      icon: <Headphones className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Multilingual Translation",
      description: "Seamlessly translate between multiple languages, with special focus on Indian regional languages",
      icon: <Languages className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Real-time Chat Translation",
      description: "Chat across language barriers with instant translation of messages",
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Video Call Enhancement",
      description: "Add live captioning and translation to your video calls for more inclusive meetings",
      icon: <Video className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <Carousel className="w-full max-w-5xl mx-auto mt-8">
      <CarouselContent>
        {features.map((feature, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-center mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">{feature.description}</p>
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
