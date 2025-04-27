"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Headphones, Languages, MessageSquare, Video, Hand, Home, Info, Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { AccessibilityMenu } from "@/components/accessibility-menu"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      name: "Sign Language",
      href: "/sign-language",
      icon: <Hand className="mr-2 h-4 w-4" />,
    },
    {
      name: "Speech & Text",
      href: "/speech-text",
      icon: <Headphones className="mr-2 h-4 w-4" />,
    },
    {
      name: "Multilingual Chat",
      href: "/chat",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      name: "Video Call",
      href: "/video-call",
      icon: <Video className="mr-2 h-4 w-4" />,
    },
    {
      name: "About",
      href: "/about",
      icon: <Info className="mr-2 h-4 w-4" />,
    },
    {
      name: "API Integration",
      href: "/api-integration",
      icon: <Languages className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Languages className="h-6 w-6" />
            <span className="font-bold">SenseConnect</span>
          </Link>
        </div>
        <div className="flex justify-end px-7 mt-4 space-x-2">
          <AccessibilityMenu />
          <ModeToggle />
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center px-7 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
