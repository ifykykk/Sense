"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, Send, Volume2, Languages } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: string
  text: string
  language: string
  timestamp: Date
  translated?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      text: "Welcome to SenseConnect Multilingual Chat! Choose your language and start chatting.",
      language: "english",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [userLanguage, setUserLanguage] = useState("english")
  const [otherLanguage, setOtherLanguage] = useState("hindi")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulated function to start speech recognition
  const startSpeechRecognition = () => {
    setIsRecording(true)

    // Simulate Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.lang =
        userLanguage === "english"
          ? "en-US"
          : userLanguage === "hindi"
            ? "hi-IN"
            : userLanguage === "tamil"
              ? "ta-IN"
              : "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInputText(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current.start()
    } else {
      // Fallback for browsers without speech recognition
      console.log("Speech recognition not supported")
      // Simulate speech recognition with timeout
      setTimeout(() => {
        setInputText("Hello, how are you today?")
        setIsRecording(false)
      }, 2000)
    }
  }

  // Stop speech recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      stopSpeechRecognition()
    } else {
      startSpeechRecognition()
    }
  }

  // Simulate translation
  const translateMessage = (text: string, fromLang: string, toLang: string): string => {
    // Demo translations based on target language
    const translations: Record<string, Record<string, string>> = {
      english: {
        hindi: "नमस्ते, आप कैसे हैं?",
        tamil: "வணக்கம், எப்படி இருக்கிறீர்கள்?",
        telugu: "హలో, మీరు ఎలా ఉన్నారు?",
        kannada: "ಹಲೋ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
      },
      hindi: {
        english: "Hello, how are you?",
        tamil: "வணக்கம், எப்படி இருக்கிறீர்கள்?",
        telugu: "హలో, మీరు ఎలా ఉన్నారు?",
        kannada: "ಹಲೋ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
      },
      tamil: {
        english: "Hello, how are you?",
        hindi: "नमस्ते, आप कैसे हैं?",
        telugu: "హలో, మీరు ఎలా ఉన్నారు?",
        kannada: "ಹಲೋ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
      },
    }

    return translations[fromLang]?.[toLang] || "Translation not available for this language pair."
  }

  // Send message
  const sendMessage = () => {
    if (!inputText.trim()) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      language: userLanguage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate response after a short delay
    setTimeout(() => {
      // Translate user message to other language
      const translatedText = translateMessage(inputText, userLanguage, otherLanguage)

      // Create response message
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "other",
        text: translatedText,
        language: otherLanguage,
        timestamp: new Date(),
        translated: translateMessage(translatedText, otherLanguage, userLanguage),
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  // Play message as speech
  const speakMessage = (text: string, language: string) => {
    if (!text || !("speechSynthesis" in window)) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang =
      language === "english" ? "en-US" : language === "hindi" ? "hi-IN" : language === "tamil" ? "ta-IN" : "en-US"

    speechSynthesis.speak(utterance)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Multilingual Chat</h1>
          <p className="text-muted-foreground">
            Chat across language barriers with real-time translation between Indian regional languages.
          </p>
        </div>

        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Multilingual Chat
            </CardTitle>
            <CardDescription>Messages are automatically translated between your selected languages.</CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Your Language</label>
                <Select value={userLanguage} onValueChange={setUserLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Other Person's Language</label>
                <Select value={otherLanguage} onValueChange={setOtherLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {message.sender === "user" ? "U" : message.sender === "system" ? "S" : "O"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : message.sender === "system"
                                ? "bg-muted"
                                : "bg-secondary"
                          }`}
                        >
                          <p>{message.text}</p>
                          {message.translated && (
                            <p className="text-xs mt-1 opacity-80">Translation: {message.translated}</p>
                          )}
                        </div>
                        <div
                          className={`flex items-center mt-1 text-xs text-muted-foreground ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => speakMessage(message.text, message.language)}
                          >
                            <Volume2 className="h-3 w-3" />
                            <span className="sr-only">Speak</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Button variant={isRecording ? "destructive" : "outline"} size="icon" onClick={toggleSpeechRecognition}>
                <Mic className="h-4 w-4" />
                <span className="sr-only">{isRecording ? "Stop Recording" : "Start Recording"}</span>
              </Button>
              <Input
                placeholder={`Type a message in ${userLanguage}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button onClick={sendMessage} disabled={!inputText.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
