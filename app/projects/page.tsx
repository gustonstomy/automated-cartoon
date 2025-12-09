"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Film, Plus, Trash2, Edit, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold  text-black ">
              CartoonMaker
            </span>
          </Link>
          <Link href="/create">
            <Button className="cartoon-button hover:bg-black hover:text-white bg-black text-white">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black">My Projects</h1>
          <p className="text-gray-600 text-lg">
            Manage and edit your animation projects
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-16 cartoon-shadow">
            <CardContent>
              <Film className="w-20 h-20 mx-auto mb-4 text-gray-300" />
              <h3 className="text-2xl font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first animation to get started!
              </p>
              <Link href="/create">
                <Button className="cartoon-button  hover:bg-black hover:text-white bg-black text-white">
                  <Plus className="w-4 h-4" />
                  Create Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cartoon-shadow hover:scale-105 transition-transform group"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                  <CardDescription>
                    Updated{" "}
                    {formatDistanceToNow(new Date(project.updatedAt), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                    <Film className="w-16 h-16 text-black" />
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/editor/${project.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${project.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4" />
                        Preview
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
