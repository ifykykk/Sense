import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiIntegrationGuide } from "@/components/api-integration-guide"
import { FileCode, Braces } from "lucide-react"

export default function ApiIntegrationPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">API Integration Guide</h1>
          <p className="text-muted-foreground">
            Learn how to connect the SenseConnect frontend to your Node.js + Express backend
          </p>
        </div>

        <div className="w-full max-w-5xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Overview
              </CardTitle>
              <CardDescription>
                The SenseConnect frontend is designed to work with a Node.js + Express backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The SenseConnect frontend includes placeholder code that simulates the functionality of the various
                features. To make the application fully functional, you need to replace these placeholders with actual
                API calls to your backend.
              </p>
              <p>The backend should implement the following key APIs:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code>/api/sign-language</code> - For sign language recognition and translation
                </li>
                <li>
                  <code>/api/speech-to-text</code> - For converting speech to text
                </li>
                <li>
                  <code>/api/translate</code> - For translating text between languages
                </li>
                <li>
                  <code>/api/chat</code> - For handling multilingual chat messages
                </li>
                <li>
                  <code>/api/captions</code> - For generating live captions for video calls
                </li>
              </ul>
            </CardContent>
          </Card>

          <ApiIntegrationGuide />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Braces className="h-5 w-5" />
                AI/ML Integration
              </CardTitle>
              <CardDescription>Connecting to AI and ML services for advanced features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                SenseConnect relies on several AI and ML services to power its features. Here are the key integrations
                you'll need to implement:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Sign Language Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    Use TensorFlow/Keras/MediaPipe for hand gesture recognition. The models should be trained on sign
                    language datasets and deployed as an API endpoint.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Speech-to-Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with Google Speech-to-Text API or a similar service for high-quality speech recognition
                    across multiple languages.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Text-to-Speech</h3>
                  <p className="text-sm text-muted-foreground">
                    Use Google Cloud TTS, AWS Polly, or a similar service to convert text to natural-sounding speech in
                    multiple languages.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Translation</h3>
                  <p className="text-sm text-muted-foreground">
                    Implement Google Translate API or IndicTrans for Indian languages to provide accurate translations
                    between multiple languages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
