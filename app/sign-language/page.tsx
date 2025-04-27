"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hand, Volume2, Languages } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignLanguagePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState("english")
  const [translatedText, setTranslatedText] = useState("")
  const [activeTab, setActiveTab] = useState("webcam")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulated function to start webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing webcam:", error)
    }
  }

  // Simulated function to stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  // Toggle recording state
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      // Simulate translation result after stopping
      const demoTexts = ["Hello, how are you?", "My name is John", "Nice to meet you", "Thank you for your help"]
      setTranslatedText(demoTexts[Math.floor(Math.random() * demoTexts.length)])
    } else {
      setIsRecording(true)
      setTranslatedText("")
    }
  }

  // Play translated text as speech
  const playTranslatedSpeech = () => {
    if (translatedText && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang =
        targetLanguage === "english"
          ? "en-US"
          : targetLanguage === "hindi"
            ? "hi-IN"
            : targetLanguage === "tamil"
              ? "ta-IN"
              : "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  // Initialize webcam when component mounts
  useEffect(() => {
    if (activeTab === "webcam") {
      startWebcam()
    }

    return () => {
      stopWebcam()
    }
  }, [activeTab])

  // Simulated hand tracking visualization
  useEffect(() => {
    if (isRecording && videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      const drawHandPoints = () => {
        if (!videoRef.current || !canvasRef.current || !ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        // Simulate hand tracking points (random circles)
        if (isRecording) {
          ctx.fillStyle = "#10b981"
          ctx.strokeStyle = "#10b981"

          // Draw 21 points to simulate hand landmarks
          for (let i = 0; i < 21; i++) {
            const x = Math.random() * canvasRef.current.width * 0.6 + canvasRef.current.width * 0.2
            const y = Math.random() * canvasRef.current.height * 0.6 + canvasRef.current.height * 0.2

            ctx.beginPath()
            ctx.arc(x, y, 5, 0, 2 * Math.PI)
            ctx.fill()

            // Connect some points with lines to simulate hand structure
            if (i > 0 && i % 4 !== 0) {
              const prevX = Math.random() * canvasRef.current.width * 0.6 + canvasRef.current.width * 0.2
              const prevY = Math.random() * canvasRef.current.height * 0.6 + canvasRef.current.height * 0.2

              ctx.beginPath()
              ctx.moveTo(prevX, prevY)
              ctx.lineTo(x, y)
              ctx.lineWidth = 2
              ctx.stroke()
            }
          }
        }

        if (isRecording) {
          requestAnimationFrame(drawHandPoints)
        }
      }

      const animationId = requestAnimationFrame(drawHandPoints)
      return () => cancelAnimationFrame(animationId)
    }
  }, [isRecording])

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sign Language Translator</h1>
          <p className="text-muted-foreground">
            Use your webcam to translate sign language gestures into text and speech in real-time.
          </p>
        </div>

        <Tabs defaultValue="webcam" className="w-full max-w-4xl" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="webcam">Live Webcam</TabsTrigger>
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
          </TabsList>
          <TabsContent value="webcam" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hand className="h-5 w-5" />
                  Live Sign Language Recognition
                </CardTitle>
                <CardDescription>
                  Position your hands in the frame and use sign language gestures. The AI will translate them in
                  real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`absolute inset-0 h-full w-full object-cover ${isRecording ? "hidden" : "block"}`}
                  />
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={360}
                    className={`absolute inset-0 h-full w-full object-cover ${isRecording ? "block" : "hidden"}`}
                  />

                  {!isRecording && !videoRef.current?.srcObject && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Camera access required</p>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm">
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

                    <Button
                      onClick={toggleRecording}
                      variant={isRecording ? "destructive" : "default"}
                      className="gap-2"
                    >
                      <Hand className="h-4 w-4" />
                      {isRecording ? "Stop Recognition" : "Start Recognition"}
                    </Button>
                  </div>
                </div>

                {translatedText && (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Translated Text:</h3>
                        <Button variant="ghost" size="sm" onClick={playTranslatedSpeech} className="gap-1">
                          <Volume2 className="h-4 w-4" />
                          Speak
                        </Button>
                      </div>
                      <p className="text-lg">{translatedText}</p>
                    </div>

                    <Alert>
                      <Languages className="h-4 w-4" />
                      <AlertTitle>Translation Complete</AlertTitle>
                      <AlertDescription>
                        The sign language has been translated to {targetLanguage}. You can play the audio or start a new
                        translation.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hand className="h-5 w-5" />
                  Upload Sign Language Video
                </CardTitle>
                <CardDescription>Upload a video containing sign language for translation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                  <div className="text-center space-y-2">
                    <Hand className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div className="text-sm">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-primary text-primary-foreground font-medium py-2 px-4 inline-flex items-center hover:bg-primary/90"
                      >
                        Upload Video
                        <input id="file-upload" name="file-upload" type="file" accept="video/*" className="sr-only" />
                      </label>
                      <p className="mt-2 text-muted-foreground">Drag and drop a video file, or click to select</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
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

                  <Button className="gap-2" disabled>
                    <Hand className="h-4 w-4" />
                    Translate Video
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
