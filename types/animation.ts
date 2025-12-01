// Character definition
export interface Character {
  id: string;
  name: string;
  sprite: string; // URL or base64
  position: { x: number; y: number };
  scale: number;
  color: string;
  expressions: Record<string, string>; // emotion -> sprite variant
}

// Animation action
export interface Animation {
  targetId: string; // character id
  type: "move" | "expression" | "scale" | "rotate" | "appear" | "disappear";
  from: any;
  to: any;
  startTime: number;
  duration: number;
  easing?: string;
}

// Dialogue line
export interface DialogueLine {
  characterId: string;
  text: string;
  audioUrl?: string;
  startTime: number;
  duration: number;
}

// Scene definition
export interface Scene {
  id: string;
  background: string;
  characters: Character[];
  dialogue: DialogueLine[];
  duration: number;
  animations: Animation[];
}

// Project structure
export interface AnimationProject {
  id: string;
  name: string;
  story: string;
  scenes: Scene[];
  metadata: {
    fps: number;
    width: number;
    height: number;
    totalDuration: number;
  };
}

// Character template (predefined)
export interface CharacterTemplate {
  id: string;
  name: string;
  type: "animal" | "person" | "object";
  baseColor: string;
  svg: string;
  expressions: {
    neutral: string;
    happy: string;
    sad: string;
    surprised: string;
    talking: string;
  };
}

// Scene background template
export interface SceneTemplate {
  id: string;
  name: string;
  type: "indoor" | "outdoor" | "abstract";
  svg: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

// Mouth shape for lip-sync
export type MouthShape = "closed" | "open" | "wide" | "smile";

// Audio data
export interface AudioData {
  url: string;
  duration: number;
  lipSyncData?: {
    timestamp: number;
    shape: MouthShape;
  }[];
}
