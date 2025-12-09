import { Scene, DialogueLine, Animation, Character } from "@/types/animation";
import { getAllCharacterTemplates } from "./templates/characters";
import { getAllSceneTemplates } from "./templates/scenes";

export interface ParsedStory {
  scenes: Scene[];
  characters: Character[];
}

/**
 * Parse a story text and convert it into animation scenes
 */
export function parseStoryToScenes(storyText: string): ParsedStory {
  // Simple story parsing logic
  // Split story into sentences
  const sentences = storyText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Extract character names (simple approach: look for capitalized words)
  const characterNames = extractCharacterNames(storyText);

  // Create characters from templates
  const characterTemplates = getAllCharacterTemplates();
  const characters: Character[] = characterNames
    .slice(0, 4)
    .map((name, index) => {
      const template = characterTemplates[index % characterTemplates.length];
      return {
        id: `char-${index}`,
        name: name,
        sprite: template.svg,
        position: { x: 200 + index * 150, y: 350 },
        scale: 1,
        color: template.baseColor,
        expressions: template.expressions,
      };
    });

  // Create scenes from sentences (group 2-3 sentences per scene)
  const sceneTemplates = getAllSceneTemplates();
  const scenes: Scene[] = [];

  for (let i = 0; i < sentences.length; i += 2) {
    const sceneText = sentences
      .slice(i, Math.min(i + 2, sentences.length))
      .join(". ");
    const sceneTemplate = sceneTemplates[scenes.length % sceneTemplates.length];

    // Determine which characters appear in this scene
    const sceneCharacters = characters.filter((char) =>
      sceneText.toLowerCase().includes(char.name.toLowerCase())
    );

    // Create dialogue
    const dialogue: DialogueLine[] = sceneCharacters.map((char, idx) => ({
      characterId: char.id,
      text: sentences[i + idx] || sceneText,
      startTime: idx * 3,
      duration: 3,
    }));

    // Create basic animations
    const animations: Animation[] = sceneCharacters.flatMap((char, idx) => [
      // Appear animation
      {
        targetId: char.id,
        type: "appear" as const,
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1 },
        startTime: 0.5 + idx * 0.2,
        duration: 0.5,
        easing: "easeOut",
      },
      // Movement when talking or just idle movement
      {
        targetId: char.id,
        type: "move" as const,
        from: { x: char.position.x, y: char.position.y },
        to: {
          x: char.position.x + (idx % 2 === 0 ? 20 : -20),
          y: char.position.y,
        },
        startTime: idx * 3 + 1,
        duration: 1,
        easing: "easeInOut",
      },
      // Return to original position
      {
        targetId: char.id,
        type: "move" as const,
        from: {
          x: char.position.x + (idx % 2 === 0 ? 20 : -20),
          y: char.position.y,
        },
        to: {
          x: char.position.x,
          y: char.position.y,
        },
        startTime: idx * 3 + 2.5,
        duration: 1,
        easing: "easeInOut",
      },
    ]);

    scenes.push({
      id: `scene-${scenes.length}`,
      background: sceneTemplate.svg,
      characters: sceneCharacters,
      dialogue,
      duration: Math.max(6, dialogue.length * 3),
      animations,
    });
  }

  return { scenes, characters };
}

/**
 * Extract character names from story text
 */
function extractCharacterNames(text: string): string[] {
  // Look for capitalized words that might be names
  const words = text.split(/\s+/);
  const potentialNames = words.filter((word) => {
    // Must start with capital letter and not be at start of sentence
    return (
      /^[A-Z][a-z]+$/.test(word) &&
      !["The", "A", "An", "In", "On", "At", "To"].includes(word)
    );
  });

  // Get unique names
  return [...new Set(potentialNames)];
}

/**
 * Calculate total duration of all scenes
 */
export function calculateTotalDuration(scenes: Scene[]): number {
  return scenes.reduce((total, scene) => total + scene.duration, 0);
}

/**
 * Generate animation timeline for a character
 */
export function generateCharacterTimeline(
  character: Character,
  dialogue: DialogueLine[]
): Animation[] {
  const animations: Animation[] = [];

  // Add talking expression during dialogue
  dialogue.forEach((line) => {
    if (line.characterId === character.id) {
      animations.push({
        targetId: character.id,
        type: "expression",
        from: "neutral",
        to: "talking",
        startTime: line.startTime,
        duration: line.duration,
        easing: "linear",
      });
    }
  });

  return animations;
}
