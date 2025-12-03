import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const projectData = JSON.parse(project.storyData);
    const props = JSON.stringify({
      scenes: projectData.scenes,
      metadata: projectData.metadata,
    });

    // Create exports directory if not exists
    const exportDir = path.join(process.cwd(), "public", "exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const outputPath = path.join(exportDir, `${projectId}.mp4`);
    const propsFile = path.join(
      process.cwd(),
      "remotion",
      `props-${projectId}.json`
    );

    // Write props to file to avoid command line length limits
    fs.writeFileSync(propsFile, props);

    try {
      // Run remotion render
      // We use npx remotion render
      await execAsync(
        `npx remotion render remotion/index.ts CartoonAnimation ${outputPath} --props=${propsFile}`
      );
    } catch (renderError) {
      console.error("Remotion render error:", renderError);
      throw renderError;
    } finally {
      // Clean up props file
      if (fs.existsSync(propsFile)) {
        fs.unlinkSync(propsFile);
      }
    }

    return NextResponse.json({
      success: true,
      url: `/exports/${projectId}.mp4`,
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to render video" },
      { status: 500 }
    );
  }
}
