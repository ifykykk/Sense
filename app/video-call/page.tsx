"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Users, Volume2 } from "lucide-react"

export default function VideoCallPage() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showCaptions, setShowCaptions] = useState(true)
  const [captionLanguage, setCaptionLanguage] = useState("english")
  const [roomId, setRoomId] = useState("")
  const [captions, setCaptions] = useState<{ text: string; timestamp: Date }[]>([])
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Simulated function to start local video
  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !isVideoOff,
        audio: !isMicMuted,
      })

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      return stream
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  // Start or join a call
  const startCall = async () => {
    await startLocalVideo()
    setIsCallActive(true)

    // Simulate remote video after a delay
    setTimeout(() => {
      if (remoteVideoRef.current) {
        // This is just a simulation - in a real app, this would be a WebRTC connection
        remoteVideoRef.current.src = "/placeholder.svg?height=720&width=1280"
        remoteVideoRef.current.poster = "/placeholder.svg?height=720&width=1280"
      }

      // Start generating captions
      startGeneratingCaptions()
    }, 2000)
  }

  // End the call
  const endCall = () => {
    setIsCallActive(false)

    // Stop local video
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      localVideoRef.current.srcObject = null
    }

    // Clear remote video
    if (remoteVideoRef.current) {
      remoteVideoRef.current.src = ""
      remoteVideoRef.current.srcObject = null
    }

    // Clear captions
    setCaptions([])
  }

  // Toggle microphone
  const toggleMic = async () => {
    setIsMicMuted(!isMicMuted)

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMicMuted // We're toggling, so use the current state before it updates
      })
    } else if (isCallActive) {
      // If call is active but we don't have a stream, restart it
      await startLocalVideo()
    }
  }

  // Toggle video
  const toggleVideo = async () => {
    setIsVideoOff(!isVideoOff)

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff // We're toggling, so use the current state before it updates
      })
    } else if (isCallActive) {
      // If call is active but we don't have a stream, restart it
      await startLocalVideo()
    }
  }

  // Simulate generating captions
  const startGeneratingCaptions = () => {
    if (!showCaptions) return

    const captionTexts = [
      "Hello, can you hear me?",
      "Yes, I can hear you clearly.",
      "Great! Let's discuss the project timeline.",
      "I think we should focus on the accessibility features first.",
      "The sign language translation module needs more testing.",
      "We should integrate the speech-to-text API by next week.",
      "What about the multilingual support?",
      "We've added support for five Indian languages so far.",
      "That sounds good. Let's schedule another call next week.",
      "Perfect! I'll send you the meeting invite.",
    ]

    let index = 0

    // Add a new caption every few seconds
    const intervalId = setInterval(() => {
      if (index < captionTexts.length && isCallActive) {
        setCaptions((prev) => [
          ...prev,
          {
            text: captionTexts[index],
            timestamp: new Date(),
          },
        ])
        index++
      } else {
        clearInterval(intervalId)
      }
    }, 3000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }

  // Join a specific room
  const joinRoom = () => {
    if (!roomId.trim()) return
    startCall()
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Video Call Integration</h1>
          <p className="text-muted-foreground">
            Enhanced video calls with live captioning and translation for more inclusive meetings.
          </p>
        </div>

        <Tabs defaultValue="new-call" className="w-full max-w-5xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-call">Start New Call</TabsTrigger>
            <TabsTrigger value="join-call">Join Existing Call</TabsTrigger>
          </TabsList>

          <TabsContent value="new-call" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Start a New Video Call
                </CardTitle>
                <CardDescription>Start a new video call with live captioning and translation support.</CardDescription>
              </CardHeader>
              <CardContent>
                {!isCallActive ? (
                  <div className="space-y-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">Your video will appear here</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Caption Language</label>
                        <Select value={captionLanguage} onValueChange={setCaptionLanguage}>
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

                      <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Enable Captions</label>
                        <div className="flex items-center space-x-2">
                          <Switch checked={showCaptions} onCheckedChange={setShowCaptions} id="captions-mode" />
                          <label htmlFor="captions-mode">
                            {showCaptions ? "Captions Enabled" : "Captions Disabled"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button size="lg" onClick={startCall} className="gap-2">
                        <Video className="h-4 w-4" />
                        Start Video Call
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                          <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                            poster="/placeholder.svg?height=720&width=1280"
                          />

                          {showCaptions && (
                            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-center">
                              {captions.length > 0 ? (
                                <p>{captions[captions.length - 1].text}</p>
                              ) : (
                                <p className="text-muted-foreground">Waiting for captions...</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                          <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 h-full w-full object-cover"
                          />

                          {isVideoOff && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <VideoOff className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        {showCaptions && (
                          <div className="mt-4">
                            <h3 className="text-sm font-medium mb-2">Conversation Transcript</h3>
                            <ScrollArea className="h-[200px] rounded-md border p-2">
                              <div className="space-y-2">
                                {captions.map((caption, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="text-muted-foreground text-xs">
                                      {caption.timestamp.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      })}
                                    </span>
                                    <p>{caption.text}</p>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center gap-2">
                      <Button variant={isMicMuted ? "outline" : "default"} size="icon" onClick={toggleMic}>
                        {isMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        <span className="sr-only">{isMicMuted ? "Unmute" : "Mute"}</span>
                      </Button>

                      <Button variant={isVideoOff ? "outline" : "default"} size="icon" onClick={toggleVideo}>
                        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                        <span className="sr-only">{isVideoOff ? "Turn Video On" : "Turn Video Off"}</span>
                      </Button>

                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Chat</span>
                      </Button>

                      <Button variant="outline" size="icon">
                        <Users className="h-4 w-4" />
                        <span className="sr-only">Participants</span>
                      </Button>

                      <Button variant="outline" size="icon" onClick={() => setShowCaptions(!showCaptions)}>
                        <Volume2 className="h-4 w-4" />
                        <span className="sr-only">{showCaptions ? "Hide Captions" : "Show Captions"}</span>
                      </Button>

                      <Button variant="destructive" size="icon" onClick={endCall}>
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">End Call</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join-call" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Join an Existing Call
                </CardTitle>
                <CardDescription>Enter a room ID to join an existing video call.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Room ID</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                    <Button onClick={joinRoom} disabled={!roomId.trim()}>
                      Join
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium">Caption Language</label>
                    <Select value={captionLanguage} onValueChange={setCaptionLanguage}>
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

                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium">Enable Captions</label>
                    <div className="flex items-center space-x-2">
                      <Switch checked={showCaptions} onCheckedChange={setShowCaptions} id="captions-mode-join" />
                      <label htmlFor="captions-mode-join">
                        {showCaptions ? "Captions Enabled" : "Captions Disabled"}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Enter a room ID to join a call</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
