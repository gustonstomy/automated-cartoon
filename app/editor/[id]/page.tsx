"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Film, ArrowLeft, Save, Play, Download, Volume2 } from "lucide-react";
import { AnimationProject, Scene, Character } from "@/types/animation";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<AnimationProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedScene, setSelectedScene] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string);
    }
  }, [params.id]);

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    if (!project) return;

    setSaving(true);
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const updateCharacterPosition = (
    characterId: string,
    x: number,
    y: number
  ) => {
    if (!project) return;

    const updatedScenes = [...project.scenes];
    const scene = updatedScenes[selectedScene];
    const charIndex = scene.characters.findIndex((c) => c.id === characterId);

    if (charIndex !== -1) {
      scene.characters[charIndex].position = { x, y };
      setProject({ ...project, scenes: updatedScenes });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-xl mb-4">Project not found</p>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentScene = project.scenes[selectedScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Film className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-800">
              {project.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/preview/${project.id}`}>
              <Button variant="outline">
                <Play className="w-4 h-4" />
                Preview
              </Button>
            </Link>
            <Button
              onClick={saveProject}
              disabled={saving}
              className="cartoon-button"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="cartoon-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scene {selectedScene + 1}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedScene(Math.max(0, selectedScene - 1))
                      }
                      disabled={selectedScene === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedScene(
                          Math.min(project.scenes.length - 1, selectedScene + 1)
                        )
                      }
                      disabled={selectedScene === project.scenes.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Duration: {currentScene.duration}s | Characters:{" "}
                  {currentScene.characters.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Canvas Preview */}
                <div className="relative aspect-video bg-white rounded-lg overflow-hidden border-4 border-primary/20">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: currentScene.background,
                    }}
                  />
                  {currentScene.characters.map((char) => (
                    <div
                      key={char.id}
                      className={`absolute cursor-move hover:ring-2 hover:ring-primary transition-all ${
                        selectedCharacter === char.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      style={{
                        left: `${(char.position.x / 1920) * 100}%`,
                        top: `${(char.position.y / 1080) * 100}%`,
                        transform: `translate(-50%, -50%) scale(${
                          char.scale * 0.5
                        })`,
                        width: "100px",
                        height: "120px",
                        color: char.color,
                      }}
                      onClick={() => setSelectedCharacter(char.id)}
                      dangerouslySetInnerHTML={{ __html: char.sprite }}
                    />
                  ))}
                </div>

                {/* Dialogue */}
                <div className="mt-4 space-y-2">
                  <Label>Dialogue</Label>
                  {currentScene.dialogue.map((d, idx) => (
                    <div
                      key={idx}
                      className="bg-purple-50 p-3 rounded-lg text-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {
                            currentScene.characters.find(
                              (c) => c.id === d.characterId
                            )?.name
                          }
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const u = new SpeechSynthesisUtterance(d.text);
                            window.speechSynthesis.speak(u);
                          }}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={d.text}
                        onChange={(e) => {
                          if (!project) return;
                          const updatedScenes = [...project.scenes];
                          updatedScenes[selectedScene].dialogue[idx].text =
                            e.target.value;
                          setProject({ ...project, scenes: updatedScenes });
                        }}
                        className="bg-white"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <div className="space-y-4">
            <Card className="cartoon-shadow">
              <CardHeader>
                <CardTitle>Characters</CardTitle>
                <CardDescription>
                  Click a character to adjust properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentScene.characters.map((char) => (
                  <div
                    key={char.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCharacter === char.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCharacter(char.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-14"
                        style={{ color: char.color }}
                        dangerouslySetInnerHTML={{ __html: char.sprite }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{char.name}</p>
                        <p className="text-xs text-muted-foreground">
                          x: {Math.round(char.position.x)}, y:{" "}
                          {Math.round(char.position.y)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedCharacter && (
              <Card className="cartoon-shadow">
                <CardHeader>
                  <CardTitle>Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const char = currentScene.characters.find(
                      (c) => c.id === selectedCharacter
                    );
                    if (!char) return null;

                    return (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="pos-x">Position X</Label>
                          <Input
                            id="pos-x"
                            type="number"
                            value={Math.round(char.position.x)}
                            onChange={(e) =>
                              updateCharacterPosition(
                                char.id,
                                parseInt(e.target.value),
                                char.position.y
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pos-y">Position Y</Label>
                          <Input
                            id="pos-y"
                            type="number"
                            value={Math.round(char.position.y)}
                            onChange={(e) =>
                              updateCharacterPosition(
                                char.id,
                                char.position.x,
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Card className="cartoon-shadow">
              <CardHeader>
                <CardTitle>Scenes</CardTitle>
                <CardDescription>
                  {project.scenes.length} total scenes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {project.scenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(idx)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedScene === idx
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">Scene {idx + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      {scene.duration}s • {scene.characters.length} characters
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
