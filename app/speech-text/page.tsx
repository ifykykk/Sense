"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Volume2, Languages, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SpeechTextPage() {
  const [isListening, setIsListening] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [sourceLanguage, setSourceLanguage] = useState("english")
  const [targetLanguage, setTargetLanguage] = useState("hindi")
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [activeTab, setActiveTab] = useState("speech-to-text")

  const recognitionRef = useRef<any>(null)

  // Simulated function to start speech recognition
  const startListening = () => {
    setIsListening(true)

    // Simulate Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.lang =
        sourceLanguage === "english"
          ? "en-US"
          : sourceLanguage === "hindi"
            ? "hi-IN"
            : sourceLanguage === "tamil"
              ? "ta-IN"
              : "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        setSourceText(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }

      recognitionRef.current.start()
    } else {
      // Fallback for browsers without speech recognition
      console.log("Speech recognition not supported")
      // Simulate speech recognition with timeout
      setTimeout(() => {
        setSourceText("This is a simulated speech recognition result.")
        setIsListening(false)
      }, 3000)
    }
  }

  // Stop speech recognition
  const stopListening = () => {
    setIsListening(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  // Toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Simulate translation
  const translateText = () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Demo translations based on target language
      const translations: Record<string, string> = {
        hindi: "यह एक अनुवादित पाठ है। अनुवाद सेवा का उपयोग करने के लिए धन्यवाद।",
        tamil: "இது மொழிபெயர்க்கப்பட்ட உரை. மொழிபெயர்ப்பு சேவையைப் பயன்படுத்தியதற்கு நன்றி.",
        telugu: "ఇది అనువదించబడిన వచనం. అనువాద సేవను ఉపయోగించినందుకు ధన్యవాదాలు.",
        kannada: "ಇದು ಅನುವಾದಿತ ಪಠ್ಯ. ಅನುವಾದ ಸೇವೆಯನ್ನು ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.",
        english: "This is a translated text. Thank you for using the translation service.",
      }

      setTranslatedText(translations[targetLanguage] || "Translation not available for this language.")
      setIsTranslating(false)
    }, 1500)
  }

  // Play translated text as speech
  const speakTranslatedText = () => {
    if (!translatedText || isSpeaking) return

    if ("speechSynthesis" in window) {
      setIsSpeaking(true)

      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang =
        targetLanguage === "english"
          ? "en-US"
          : targetLanguage === "hindi"
            ? "hi-IN"
            : targetLanguage === "tamil"
              ? "ta-IN"
              : "en-US"

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    } else {
      console.log("Text-to-speech not supported")
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Speech & Text Translation</h1>
          <p className="text-muted-foreground">
            Convert speech to text, text to speech, and translate between multiple languages seamlessly.
          </p>
        </div>

        <Tabs defaultValue="speech-to-text" className="w-full max-w-4xl" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="speech-to-text">Speech to Text</TabsTrigger>
            <TabsTrigger value="text-to-text">Text Translation</TabsTrigger>
          </TabsList>

          <TabsContent value="speech-to-text" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Speech to Text Translation
                </CardTitle>
                <CardDescription>
                  Speak into your microphone and see your speech converted to text and translated in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Source Language</h3>
                      <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Source Language" />
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

                    <div className="relative">
                      <Textarea
                        placeholder="Your speech will appear here..."
                        className="min-h-[200px] resize-none"
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        readOnly={isListening}
                      />
                      <Button
                        size="icon"
                        variant={isListening ? "destructive" : "default"}
                        className="absolute bottom-4 right-4"
                        onClick={toggleListening}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" size="lg" className="gap-2" onClick={toggleListening}>
                        {isListening ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Stop Listening
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4" />
                            Start Listening
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Target Language</h3>
                      <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Target Language" />
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

                    <div className="relative">
                      <Textarea
                        placeholder="Translation will appear here..."
                        className="min-h-[200px] resize-none"
                        value={translatedText}
                        readOnly
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute bottom-4 right-4"
                        onClick={speakTranslatedText}
                        disabled={!translatedText || isSpeaking}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        className="gap-2"
                        onClick={translateText}
                        disabled={!sourceText.trim() || isTranslating}
                      >
                        {isTranslating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages className="h-4 w-4" />
                            Translate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {translatedText && (
                  <Alert>
                    <Languages className="h-4 w-4" />
                    <AlertTitle>Translation Complete</AlertTitle>
                    <AlertDescription>
                      Your speech has been translated from {sourceLanguage} to {targetLanguage}. Click the speaker icon
                      to hear the translation.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text-to-text" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Text to Text Translation
                </CardTitle>
                <CardDescription>Enter text in one language and translate it to another language.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Source Language</h3>
                      <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Source Language" />
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

                    <Textarea
                      placeholder="Enter text to translate..."
                      className="min-h-[200px] resize-none"
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Target Language</h3>
                      <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Target Language" />
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

                    <div className="relative">
                      <Textarea
                        placeholder="Translation will appear here..."
                        className="min-h-[200px] resize-none"
                        value={translatedText}
                        readOnly
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute bottom-4 right-4"
                        onClick={speakTranslatedText}
                        disabled={!translatedText || isSpeaking}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={translateText}
                    disabled={!sourceText.trim() || isTranslating}
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4" />
                        Translate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
