"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Braces, FileCode, Server, ArrowRight } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export function ApiIntegrationGuide() {
  const [activeTab, setActiveTab] = useState("sign-language")

  const apiEndpoints = {
    "sign-language": {
      endpoint: "/api/sign-language",
      method: "POST",
      description: "Translate sign language from video input to text",
      requestExample: `// In app/sign-language/page.tsx
// Replace the simulated translation with actual API call

const translateSignLanguage = async (videoData) => {
  setIsTranslating(true);
  
  try {
    const response = await fetch('/api/sign-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoData,
        targetLanguage,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }
    
    const data = await response.json();
    setTranslatedText(data.translatedText);
  } catch (error) {
    console.error('Error translating sign language:', error);
  } finally {
    setIsTranslating(false);
  }
};`,
      backendExample: `// In app/api/sign-language/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { videoData, targetLanguage } = await request.json();
    
    // Process the video data using your ML model
    // This is where you would call your sign language recognition service
    
    // Example integration with a hypothetical ML service
    const response = await fetch('https://your-ml-service.com/sign-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.ML_API_KEY}\`,
      },
      body: JSON.stringify({
        videoData,
        targetLanguage,
      }),
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      translatedText: data.text,
      confidence: data.confidence,
    });
  } catch (error) {
    console.error('Error processing sign language:', error);
    return NextResponse.json(
      { error: 'Failed to process sign language' },
      { status: 500 }
    );
  }
}`,
    },
    "speech-text": {
      endpoint: "/api/speech-to-text",
      method: "POST",
      description: "Convert speech to text and translate between languages",
      requestExample: `// In app/speech-text/page.tsx
// Replace the simulated translation with actual API call

const translateText = async () => {
  if (!sourceText.trim()) return;
  
  setIsTranslating(true);
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: sourceText,
        sourceLanguage,
        targetLanguage,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }
    
    const data = await response.json();
    setTranslatedText(data.translatedText);
  } catch (error) {
    console.error('Error translating text:', error);
  } finally {
    setIsTranslating(false);
  }
};`,
      backendExample: `// In app/api/translate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();
    
    // Call your translation service
    // This is where you would integrate with Google Translate API, IndicTrans, etc.
    
    // Example integration with a translation API
    const response = await fetch('https://translation-api.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.TRANSLATION_API_KEY}\`,
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
      }),
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      translatedText: data.translatedText,
    });
  } catch (error) {
    console.error('Error translating text:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
}`,
    },
    chat: {
      endpoint: "/api/chat",
      method: "POST",
      description: "Send and translate chat messages",
      requestExample: `// In app/chat/page.tsx
// Replace the simulated message translation with actual API call

const sendMessage = async () => {
  if (!inputText.trim()) return;

  // Create user message
  const userMessage = {
    id: Date.now().toString(),
    sender: "user",
    text: inputText,
    language: userLanguage,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputText("");

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputText,
        sourceLanguage: userLanguage,
        targetLanguage: otherLanguage,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Message translation failed');
    }
    
    const data = await response.json();
    
    // Create response message with the translated text
    const responseMessage = {
      id: (Date.now() + 1).toString(),
      sender: "other",
      text: data.translatedText,
      language: otherLanguage,
      timestamp: new Date(),
      translated: data.originalTranslation, // Translation back to user's language
    };

    setMessages((prev) => [...prev, responseMessage]);
  } catch (error) {
    console.error('Error translating message:', error);
  }
};`,
      backendExample: `// In app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();
    
    // Call your translation service for the message
    const translationResponse = await fetch('https://translation-api.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.TRANSLATION_API_KEY}\`,
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
      }),
    });
    
    const translationData = await translationResponse.json();
    
    // Also translate back to original language for verification
    const reverseTranslationResponse = await fetch('https://translation-api.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.TRANSLATION_API_KEY}\`,
      },
      body: JSON.stringify({
        q: translationData.translatedText,
        source: targetLanguage,
        target: sourceLanguage,
      }),
    });
    
    const reverseTranslationData = await reverseTranslationResponse.json();
    
    // Save the message to your database if needed
    // await saveMessageToDatabase({ ... });
    
    return NextResponse.json({
      translatedText: translationData.translatedText,
      originalTranslation: reverseTranslationData.translatedText,
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}`,
    },
    "video-call": {
      endpoint: "/api/captions",
      method: "POST",
      description: "Generate live captions for video calls",
      requestExample: `// In app/video-call/page.tsx
// Replace the simulated captions with actual API call

const processSpeechForCaptions = async (audioData) => {
  try {
    const response = await fetch('/api/captions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audioData,
        language: captionLanguage,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Caption generation failed');
    }
    
    const data = await response.json();
    
    // Add the new caption to the list
    setCaptions((prev) => [
      ...prev,
      {
        text: data.captionText,
        timestamp: new Date(),
      },
    ]);
  } catch (error) {
    console.error('Error generating captions:', error);
  }
};`,
      backendExample: `// In app/api/captions/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { audioData, language } = await request.json();
    
    // Process the audio data using your speech-to-text service
    // This is where you would call your speech recognition API
    
    // Example integration with a speech-to-text API
    const response = await fetch('https://speech-to-text-api.com/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.SPEECH_API_KEY}\`,
      },
      body: JSON.stringify({
        audio: audioData,
        language,
      }),
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      captionText: data.text,
      confidence: data.confidence,
    });
  } catch (error) {
    console.error('Error generating captions:', error);
    return NextResponse.json(
      { error: 'Failed to generate captions' },
      { status: 500 }
    );
  }
}`,
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Backend API Integration Guide
        </CardTitle>
        <CardDescription>
          Learn how to connect the SenseConnect frontend to your Node.js + Express backend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sign-language" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sign-language">Sign Language</TabsTrigger>
            <TabsTrigger value="speech-text">Speech & Text</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="video-call">Video Call</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                <h3 className="font-medium">API Endpoint: {apiEndpoints[activeTab].endpoint}</h3>
              </div>
              <p className="text-muted-foreground">{apiEndpoints[activeTab].description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Frontend Integration</h4>
                </div>
                <div className="rounded-md overflow-hidden">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, borderRadius: "0.375rem" }}
                  >
                    {apiEndpoints[activeTab].requestExample}
                  </SyntaxHighlighter>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Braces className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Backend Implementation</h4>
                </div>
                <div className="rounded-md overflow-hidden">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, borderRadius: "0.375rem" }}
                  >
                    {apiEndpoints[activeTab].backendExample}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Integration Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create the API route in your backend using the example above</li>
                <li>Replace the simulated functions in the frontend with actual API calls</li>
                <li>Set up environment variables for your API keys and endpoints</li>
                <li>Test the integration with sample data before deploying</li>
              </ol>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="gap-1">
                View Full Documentation
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
