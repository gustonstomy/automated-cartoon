import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseStoryToScenes, calculateTotalDuration } from "@/lib/story-parser";
import { AnimationProject } from "@/types/animation";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        assets: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, story } = await request.json();

    if (!name || !story) {
      return NextResponse.json(
        { error: "Name and story are required" },
        { status: 400 }
      );
    }

    // Parse story into scenes
    const { scenes } = parseStoryToScenes(story);
    const totalDuration = calculateTotalDuration(scenes);

    // Create project data
    const projectData: AnimationProject = {
      id: "", // Will be set by database
      name,
      story,
      scenes,
      metadata: {
        fps: 30,
        width: 1920,
        height: 1080,
        totalDuration,
      },
    };

    // Save to database
    const project = await prisma.project.create({
      data: {
        name,
        storyData: JSON.stringify(projectData),
      },
    });

    // Return project with ID
    projectData.id = project.id;

    return NextResponse.json({
      ...projectData,
      id: project.id,
      name: project.name,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
