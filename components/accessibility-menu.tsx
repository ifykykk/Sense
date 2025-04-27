"use client"

import { useState, useEffect } from "react"
import { Eye, Type, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState<string>("medium")
  const [colorMode, setColorMode] = useState<string>("normal")

  // Apply font size to document root
  useEffect(() => {
    const root = document.documentElement
    switch (fontSize) {
      case "small":
        root.style.fontSize = "14px"
        break
      case "medium":
        root.style.fontSize = "16px"
        break
      case "large":
        root.style.fontSize = "18px"
        break
      case "x-large":
        root.style.fontSize = "20px"
        break
      default:
        root.style.fontSize = "16px"
    }
  }, [fontSize])

  // Apply color mode to document root
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("protanopia", "deuteranopia", "tritanopia", "achromatopsia")

    if (colorMode !== "normal") {
      root.classList.add(colorMode)
    }
  }, [colorMode])

  // Reset all accessibility settings
  const resetSettings = () => {
    setFontSize("medium")
    setColorMode("normal")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Eye className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Accessibility options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Type className="mr-2 h-4 w-4" />
            <span className="flex-1">Text Size</span>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="x-large">X-Large</SelectItem>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            <span className="flex-1">Color Mode</span>
            <Select value={colorMode} onValueChange={setColorMode}>
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="protanopia">Red-Blind</SelectItem>
                <SelectItem value="deuteranopia">Green-Blind</SelectItem>
                <SelectItem value="tritanopia">Blue-Blind</SelectItem>
                <SelectItem value="achromatopsia">Monochrome</SelectItem>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={resetSettings}>
          <RotateCcw className="mr-2 h-4 w-4" />
          <span>Reset Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
