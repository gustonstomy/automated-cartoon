/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { getAllCharacterTemplates } from "@/lib/templates/characters";
import { getAllSceneTemplates } from "@/lib/templates/scenes";

export default function CreatePage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const characterTemplates = getAllCharacterTemplates();
  const sceneTemplates = getAllSceneTemplates();

  const handleGenerate = async () => {
    if (!projectName.trim() || !story.trim()) {
      alert("Please enter both a project name and story");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          story,
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      const data = await response.json();
      router.push(`/editor/${data.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillExampleStory = () => {
    setProjectName("Max and Luna's Adventure");
    setStory(
      "Max the dog was excited to go to the park. When he arrived, he saw Luna the cat sitting under a tree. " +
        '"Hello Luna!" said Max happily. Luna smiled and said "Hi Max! Want to play?" ' +
        "They ran and played together all afternoon. It was the best day ever!"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">CartoonMaker</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black">
            Create Your Animation
          </h1>
          <p className="text-gray-600 text-lg">
            Write your story and we'll bring it to life!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Story Input */}
          <div className="space-y-6">
            <Card className="cartoon-shadow">
              <CardHeader>
                <CardTitle>Story Details</CardTitle>
                <CardDescription>
                  Give your project a name and write your story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="My Awesome Animation"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Your Story</Label>
                  <Textarea
                    id="story"
                    placeholder="Once upon a time..."
                    className="min-h-[300px] font-mono"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Mention character names (capitalized) and actions. Our
                    system will automatically create scenes!
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={fillExampleStory}
                    variant="outline"
                    className="flex-1"
                  >
                    Load Example
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    className="flex-1 cartoon-button hover:bg-black hover:text-white bg-black text-white"
                    disabled={loading}
                  >
                    {loading ? <>Generating...</> : <>Generate Animation</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Templates Preview */}
          <div className="space-y-6">
            <Card className="cartoon-shadow">
              <CardHeader>
                <CardTitle>Character Templates</CardTitle>
                <CardDescription>
                  These characters will be automatically assigned based on your
                  story
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {characterTemplates.map((char) => (
                    <div
                      key={char.id}
                      className="border-2 rounded-lg p-4 hover:border-primary hover:bg-accent transition-all cursor-pointer text-center"
                      onClick={() => {
                        // Visual feedback - template is clickable
                      }}
                    >
                      <div
                        className="w-20 h-24 mx-auto mb-2"
                        style={{ color: char.baseColor }}
                        dangerouslySetInnerHTML={{ __html: char.svg }}
                      />
                      <p className="font-medium text-sm">{char.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {char.type}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="cartoon-shadow">
              <CardHeader>
                <CardTitle>Scene Backgrounds</CardTitle>
                <CardDescription>
                  Scenes will be automatically selected or you can choose later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {sceneTemplates.slice(0, 4).map((scene) => (
                    <div
                      key={scene.id}
                      className="border-2 rounded-lg overflow-hidden hover:border-primary hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                      onClick={() => {
                        // Visual feedback - template is clickable
                      }}
                    >
                      <div
                        className="w-full h-24"
                        dangerouslySetInnerHTML={{ __html: scene.svg }}
                      />
                      <p className="text-xs text-center py-2 bg-accent">
                        {scene.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
