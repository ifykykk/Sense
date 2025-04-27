import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, Hand, MessageSquare, Video, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center space-y-10">
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About SenseConnect</h1>
          <p className="text-muted-foreground">
            Our mission is to break communication barriers and make technology accessible for everyone.
          </p>
        </div>

        {/* Story Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
              <CardDescription>How SenseConnect came to be</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                SenseConnect was born from a simple observation: in a world increasingly connected by technology,
                millions of people still face communication barriers due to language differences, hearing impairments,
                or other accessibility challenges.
              </p>
              <p>
                Our team of developers, linguists, and accessibility experts came together with a shared vision: to
                create a platform that leverages the latest AI technologies to bridge these gaps and make communication
                truly universal.
              </p>
              <p>
                What started as a sign language translation project quickly evolved into a comprehensive communication
                platform that addresses multiple accessibility needs, with a special focus on supporting Indian regional
                languages to ensure inclusivity within our diverse linguistic landscape.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Problem Statement Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">The Problem We're Solving</CardTitle>
              <CardDescription>Communication barriers in the digital age</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Hand className="h-5 w-5 text-primary" />
                    Sign Language Barriers
                  </h3>
                  <p className="text-muted-foreground">
                    Over 70 million people worldwide use sign language as their primary means of communication, yet
                    digital platforms rarely support this form of expression.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" />
                    Language Divides
                  </h3>
                  <p className="text-muted-foreground">
                    India alone has 22 officially recognized languages and hundreds of dialects, creating significant
                    communication barriers even within the same country.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    Inaccessible Video Calls
                  </h3>
                  <p className="text-muted-foreground">
                    Video conferencing has become essential, yet lacks real-time translation and accessibility features
                    for those with hearing impairments.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Digital Exclusion
                  </h3>
                  <p className="text-muted-foreground">
                    Many digital platforms and services remain inaccessible to people with disabilities, creating a
                    digital divide that limits opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Impact Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Impact</CardTitle>
              <CardDescription>How SenseConnect is making a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">10,000+</h3>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="space-y-2 text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                    <Languages className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">15+</h3>
                  <p className="text-sm text-muted-foreground">Languages Supported</p>
                </div>
                <div className="space-y-2 text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">1M+</h3>
                  <p className="text-sm text-muted-foreground">Translations Completed</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p>
                  SenseConnect is being used in educational institutions to support students with hearing impairments,
                  in businesses to facilitate multilingual meetings, and by individuals to connect with friends and
                  family across language barriers.
                </p>
                <p>
                  Our focus on Indian regional languages has made digital communication more accessible to millions who
                  previously struggled with English-centric platforms.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Team</CardTitle>
              <CardDescription>The people behind SenseConnect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Priya Sharma",
                    role: "Founder & CEO",
                    bio: "AI researcher with a passion for accessibility technology.",
                  },
                  {
                    name: "Rahul Patel",
                    role: "CTO",
                    bio: "Machine learning expert specializing in computer vision and NLP.",
                  },
                  {
                    name: "Ananya Reddy",
                    role: "Head of Linguistics",
                    bio: "Linguist with expertise in Indian regional languages.",
                  },
                  {
                    name: "Vikram Singh",
                    role: "Lead Developer",
                    bio: "Full-stack developer with a focus on real-time applications.",
                  },
                  {
                    name: "Meera Iyer",
                    role: "Accessibility Specialist",
                    bio: "Advocate for inclusive design and accessibility standards.",
                  },
                  {
                    name: "Arjun Kumar",
                    role: "ML Engineer",
                    bio: "Specializes in sign language recognition algorithms.",
                  },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-2">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
              <CardDescription>Get in touch with the SenseConnect team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We're always looking to improve SenseConnect and welcome feedback, partnership inquiries, and support
                requests.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <p className="text-muted-foreground">contact@senseconnect.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Social Media</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-foreground">
                      Twitter
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">
                      LinkedIn
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
