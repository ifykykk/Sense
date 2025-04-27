"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Headphones, Languages, MessageSquare, Video, Hand, Home, Info } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Sign Language",
      href: "/sign-language",
      icon: <Hand className="h-4 w-4" />,
    },
    {
      name: "Speech & Text",
      href: "/speech-text",
      icon: <Headphones className="h-4 w-4" />,
    },
    {
      name: "Multilingual Chat",
      href: "/chat",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: "Video Call",
      href: "/video-call",
      icon: <Video className="h-4 w-4" />,
    },
    {
      name: "About",
      href: "/about",
      icon: <Info className="h-4 w-4" />,
    },
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Languages className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">SenseConnect</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
