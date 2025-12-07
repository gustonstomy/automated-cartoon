/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Film, Wand2, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-black">CartoonMaker</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost">My Projects</Button>
            </Link>
            <Link href="/create">
              <Button className="cartoon-button cartoon-shadow bg-black text-white">
                <Sparkles className="w-4 h-4" />
                Create Story
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-black">
            Create Amazing Cartoons
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
            Turn your stories into beautiful animated videos in minutes. No
            animation skills required!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/create">
              <Button
                size="lg"
                className="cartoon-button cartoon-shadow text-lg px-8 py-6 bg-black text-white"
              >
                <Wand2 className="w-5 h-5" />
                Start Creating
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="cartoon-button text-lg px-8 py-6 bg-black text-white"
              >
                <Play className="w-5 h-5" />
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="cartoon-shadow hover:scale-105 transition-transform">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>1. Write Your Story</CardTitle>
              <CardDescription>
                Type or paste your story. Our system will automatically detect
                characters and scenes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-sm text-gray-700">
                "Max the dog went to the park. He met Luna the cat..."
              </div>
            </CardContent>
          </Card>

          <Card className="cartoon-shadow hover:scale-105 transition-transform">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle>2. Customize</CardTitle>
              <CardDescription>
                Select character templates, adjust positions, and fine-tune
                animations in our easy editor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 justify-center">
                <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center text-2xl">
                  🐕
                </div>
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center text-2xl">
                  🐱
                </div>
                <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center text-2xl">
                  🐰
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cartoon-shadow hover:scale-105 transition-transform">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Film className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>3. Export Video</CardTitle>
              <CardDescription>
                Preview your animation and export it as an MP4 video to share
                anywhere.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 flex items-center justify-center">
                <Play className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features List */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "✨ Automatic story parsing",
              "🎭 Pre-designed character templates",
              "🎬 Multiple scene backgrounds",
              "🗣️ Text-to-speech narration",
              "✏️ Visual editor for customization",
              "🎥 Export to MP4 video",
              "💾 Save and load projects",
              "⚡ Fast and easy to use",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-lg cartoon-shadow hover:translate-x-2 transition-transform"
              >
                <span className="text-2xl">{feature.split(" ")[0]}</span>
                <span className="text-gray-700 font-medium">
                  {feature.split(" ").slice(1).join(" ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-black rounded-2xl p-12 cartoon-shadow text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Your First Animation?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Start telling your stories in a whole new way
          </p>
          <Link href="/create">
            <Button
              size="lg"
              variant="secondary"
              className="cartoon-button text-lg px-8 py-6 bg-black text-white"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 CartoonMaker. Create amazing animations with ease.</p>
        </div>
      </footer>
    </div>
  );
}
