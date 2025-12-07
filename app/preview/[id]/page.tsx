"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, ArrowLeft, Download, Edit } from "lucide-react";
import { AnimationProject } from "@/types/animation";

export default function PreviewPage() {
  const params = useParams();
  const [project, setProject] = useState<AnimationProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const handleExport = async () => {
    if (!project) return;
    setExporting(true);
    setExportUrl(null);
    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const data = await response.json();
      if (data.success) {
        setExportUrl(data.url);
      } else {
        alert("Export failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (!isPlaying || !project) return;

    const fps = project.metadata.fps;
    const totalFrames = project.metadata.totalDuration * fps;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= totalFrames - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [isPlaying, project]);

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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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

  // Calculate current scene
  const fps = project.metadata.fps;
  let currentSceneIndex = 0;
  let sceneStartFrame = 0;

  for (let i = 0; i < project.scenes.length; i++) {
    const sceneDurationInFrames = Math.floor(project.scenes[i].duration * fps);
    if (currentFrame < sceneStartFrame + sceneDurationInFrames) {
      currentSceneIndex = i;
      break;
    }
    sceneStartFrame += sceneDurationInFrames;
  }

  const currentScene = project.scenes[currentSceneIndex];
  const sceneFrame = currentFrame - sceneStartFrame;

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
            <Link href={`/editor/${project.id}`}>
              <Button variant="outline">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={exporting}
            >
              <Download className="w-4 h-4" />
              {exporting ? "Exporting..." : "Export Video"}
            </Button>
          </div>
        </div>
      </nav>

      {exportUrl && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center justify-between">
            <p className="text-green-800">Video exported successfully!</p>
            <a
              href={exportUrl}
              download
              className="flex items-center gap-2 text-green-700 font-medium hover:underline"
            >
              <Download className="w-4 h-4" />
              Download MP4
            </a>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="cartoon-shadow">
          <CardContent className="p-6">
            {/* Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-4">
              {currentScene && (
                <>
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    dangerouslySetInnerHTML={{
                      __html: currentScene.background,
                    }}
                  />

                  {/* Characters */}
                  {currentScene.characters.map((char) => {
                    const characterAnimations = currentScene.animations.filter(
                      (anim) => anim.targetId === char.id
                    );

                    let x = char.position.x;
                    let y = char.position.y;
                    let scale = char.scale;
                    let opacity = 1;

                    characterAnimations.forEach((anim) => {
                      const animStartFrame = anim.startTime * fps;
                      const animDuration = anim.duration * fps;

                      if (
                        sceneFrame >= animStartFrame &&
                        sceneFrame < animStartFrame + animDuration
                      ) {
                        const progress =
                          (sceneFrame - animStartFrame) / animDuration;

                        switch (anim.type) {
                          case "move":
                            x =
                              anim.from.x +
                              (anim.to.x - anim.from.x) * progress;
                            y =
                              anim.from.y +
                              (anim.to.y - anim.from.y) * progress;
                            break;
                          case "appear":
                            opacity = progress;
                            scale = progress;
                            break;
                        }
                      }
                    });

                    return (
                      <div
                        key={char.id}
                        className="absolute transition-all duration-100"
                        style={{
                          left: x,
                          top: y,
                          transform: `translate(-50%, -50%) scale(${scale})`,
                          opacity,
                          width: "100px",
                          height: "120px",
                          color: char.color,
                        }}
                        dangerouslySetInnerHTML={{ __html: char.sprite }}
                      />
                    );
                  })}

                  {/* Dialogue */}
                  {currentScene.dialogue.map((dialogue) => {
                    const dialogueStartFrame = dialogue.startTime * fps;
                    const dialogueDuration = dialogue.duration * fps;

                    if (
                      sceneFrame >= dialogueStartFrame &&
                      sceneFrame < dialogueStartFrame + dialogueDuration
                    ) {
                      const character = currentScene.characters.find(
                        (c) => c.id === dialogue.characterId
                      );

                      return (
                        <div
                          key={dialogue.characterId + dialogue.startTime}
                          className="absolute bottom-10 left-0 right-0 flex justify-center px-4"
                        >
                          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-4 border-purple-300 max-w-2xl">
                            <p className="text-lg font-bold text-center text-gray-800">
                              <span className="text-primary">
                                {character?.name}:
                              </span>{" "}
                              {dialogue.text}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={togglePlayPause}
                  className="cartoon-button bg-black text-white"
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentFrame(0);
                    setIsPlaying(false);
                  }}
                >
                  Reset
                </Button>
                <div className="flex-1 text-sm text-muted-foreground">
                  Frame: {currentFrame} /{" "}
                  {Math.floor(project.metadata.totalDuration * fps)} | Scene:{" "}
                  {currentSceneIndex + 1} / {project.scenes.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-y-0 left-0 bg-black transition-all"
                  style={{
                    width: `${
                      (currentFrame / (project.metadata.totalDuration * fps)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">About this animation</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong>Total Duration:</strong>{" "}
                  {project.metadata.totalDuration}s
                </div>
                <div>
                  <strong>Scenes:</strong> {project.scenes.length}
                </div>
                <div>
                  <strong>Resolution:</strong> {project.metadata.width}x
                  {project.metadata.height}
                </div>
                <div>
                  <strong>FPS:</strong> {project.metadata.fps}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
