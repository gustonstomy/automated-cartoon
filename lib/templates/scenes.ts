import { SceneTemplate } from "@/types/animation";

// Simple SVG-based scene backgrounds
export const SCENE_TEMPLATES: SceneTemplate[] = [
  {
    id: "park",
    name: "Sunny Park",
    type: "outdoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky -->
      <rect width="800" height="400" fill="#87CEEB"/>
      <!-- Sun -->
      <circle cx="700" cy="80" r="50" fill="#FFD700"/>
      <!-- Clouds -->
      <ellipse cx="150" cy="100" rx="60" ry="30" fill="#FFF" opacity="0.8"/>
      <ellipse cx="180" cy="95" rx="50" ry="25" fill="#FFF" opacity="0.8"/>
      <ellipse cx="600" cy="130" rx="70" ry="35" fill="#FFF" opacity="0.8"/>
      <!-- Ground -->
      <rect y="400" width="800" height="200" fill="#90EE90"/>
      <!-- Trees -->
      <rect x="100" y="300" width="40" height="100" fill="#8B4513"/>
      <circle cx="120" cy="270" r="60" fill="#228B22"/>
      <rect x="650" y="320" width="35" height="80" fill="#8B4513"/>
      <circle cx="667" cy="295" r="50" fill="#228B22"/>
      <!-- Path -->
      <ellipse cx="400" cy="500" rx="150" ry="30" fill="#D2B48C" opacity="0.5"/>
    </svg>`,
    colors: {
      primary: "#87CEEB",
      secondary: "#90EE90",
    },
  },
  {
    id: "house",
    name: "Cozy House",
    type: "indoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Wall -->
      <rect width="800" height="600" fill="#FFE4B5"/>
      <!-- Floor -->
      <rect y="450" width="800" height="150" fill="#8B7355"/>
      <!-- Window -->
      <rect x="100" y="150" width="150" height="180" fill="#87CEEB" stroke="#654321" stroke-width="8"/>
      <line x1="175" y1="150" x2="175" y2="330" stroke="#654321" stroke-width="6"/>
      <line x1="100" y1="240" x2="250" y2="240" stroke="#654321" stroke-width="6"/>
      <!-- Another window -->
      <rect x="550" y="150" width="150" height="180" fill="#87CEEB" stroke="#654321" stroke-width="8"/>
      <line x1="625" y1="150" x2="625" y2="330" stroke="#654321" stroke-width="6"/>
      <line x1="550" y1="240" x2="700" y2="240" stroke="#654321" stroke-width="6"/>
      <!-- Picture frame -->
      <rect x="350" y="180" width="100" height="120" fill="#FFA07A" stroke="#8B4513" stroke-width="6"/>
    </svg>`,
    colors: {
      primary: "#FFE4B5",
      secondary: "#8B7355",
    },
  },
  {
    id: "playground",
    name: "Fun Playground",
    type: "outdoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky -->
      <rect width="800" height="380" fill="#87CEEB"/>
      <!-- Ground -->
      <rect y="380" width="800" height="220" fill="#F4A460"/>
      <!-- Slide -->
      <path d="M 150,250 L 150,200 L 250,200 L 350,380" fill="#FF6347" stroke="#8B0000" stroke-width="4"/>
      <!-- Swing set -->
      <rect x="500" y="200" width="15" height="180" fill="#8B4513"/>
      <rect x="650" y="200" width="15" height="180" fill="#8B4513"/>
      <rect x="500" y="200" width="165" height="15" fill="#8B4513"/>
      <!-- Swings -->
      <line x1="540" y1="215" x2="540" y2="300" stroke="#696969" stroke-width="3"/>
      <line x1="550" y1="215" x2="550" y2="300" stroke="#696969" stroke-width="3"/>
      <rect x="525" y="300" width="40" height="8" fill="#4169E1" rx="2"/>
      <line x1="610" y1="215" x2="600" y2="340" stroke="#696969" stroke-width="3"/>
      <line x1="620" y1="215" x2="610" y2="340" stroke="#696969" stroke-width="3"/>
      <rect x="590" y="340" width="40" height="8" fill="#4169E1" rx="2"/>
      <!-- Sun -->
      <circle cx="700" cy="80" r="50" fill="#FFD700"/>
    </svg>`,
    colors: {
      primary: "#87CEEB",
      secondary: "#F4A460",
    },
  },
  {
    id: "school",
    name: "School Classroom",
    type: "indoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Wall -->
      <rect width="800" height="600" fill="#FFF8DC"/>
      <!-- Floor -->
      <rect y="450" width="800" height="150" fill="#DEB887"/>
      <!-- Blackboard -->
      <rect x="250" y="100" width="300" height="200" fill="#2F4F2F" stroke="#8B4513" stroke-width="10"/>
      <!-- Chalk marks -->
      <text x="280" y="180" fill="#FFF" font-size="40" font-family="cursive">ABC</text>
      <text x="450" y="180" fill="#FFF" font-size="40" font-family="cursive">123</text>
      <!-- Desk -->
      <rect x="150" y="380" width="120" height="70" fill="#8B4513"/>
      <rect x="530" y="380" width="120" height="70" fill="#8B4513"/>
      <!-- Clock -->
      <circle cx="100" cy="150" r="40" fill="#FFF" stroke="#000" stroke-width="3"/>
      <line x1="100" y1="150" x2="100" y2="125" stroke="#000" stroke-width="3"/>
      <line x1="100" y1="150" x2="115" y2="150" stroke="#000" stroke-width="2"/>
    </svg>`,
    colors: {
      primary: "#FFF8DC",
      secondary: "#DEB887",
    },
  },
  {
    id: "beach",
    name: "Sunny Beach",
    type: "outdoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky -->
      <rect width="800" height="300" fill="#87CEEB"/>
      <!-- Sea -->
      <rect y="300" width="800" height="150" fill="#4682B4"/>
      <!-- Waves -->
      <path d="M 0,320 Q 50,310 100,320 T 200,320 T 300,320 T 400,320 T 500,320 T 600,320 T 700,320 T 800,320" fill="none" stroke="#6495ED" stroke-width="2"/>
      <path d="M 0,340 Q 60,330 120,340 T 240,340 T 360,340 T 480,340 T 600,340 T 720,340 T 800,340" fill="none" stroke="#6495ED" stroke-width="2"/>
      <!-- Sand -->
      <rect y="450" width="800" height="150" fill="#F4A460"/>
      <!-- Sun -->
      <circle cx="100" cy="80" r="60" fill="#FFD700"/>
      <!-- Palm tree -->
      <rect x="650" y="380" width="20" height="120" fill="#8B4513"/>
      <path d="M 660,360 Q 620,340 580,360" fill="#228B22"/>
      <path d="M 660,360 Q 640,320 620,300" fill="#228B22"/>
      <path d="M 660,360 Q 700,340 740,360" fill="#228B22"/>
      <path d="M 660,360 Q 680,320 700,300" fill="#228B22"/>
      <!-- Umbrella -->
      <line x1="200" y1="450" x2="200" y2="380" stroke="#8B4513" stroke-width="4"/>
      <path d="M 140,380 Q 200,350 260,380" fill="#FF6347" stroke="#8B0000" stroke-width="2"/>
    </svg>`,
    colors: {
      primary: "#87CEEB",
      secondary: "#F4A460",
    },
  },
  {
    id: "garden",
    name: "Flower Garden",
    type: "outdoor",
    svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky -->
      <rect width="800" height="350" fill="#B0E0E6"/>
      <!-- Ground -->
      <rect y="350" width="800" height="250" fill="#7CFC00"/>
      <!-- Flowers -->
      <circle cx="150" cy="420" r="15" fill="#FF69B4"/>
      <circle cx="135" cy="415" r="12" fill="#FFB6C1"/>
      <circle cx="165" cy="415" r="12" fill="#FFB6C1"/>
      <circle cx="150" cy="405" r="12" fill="#FFB6C1"/>
      <circle cx="150" cy="430" r="12" fill="#FFB6C1"/>
      <rect x="148" y="435" width="4" height="40" fill="#228B22"/>
      
      <circle cx="300" cy="400" r="15" fill="#FFD700"/>
      <circle cx="285" cy="395" r="12" fill="#FFA500"/>
      <circle cx="315" cy="395" r="12" fill="#FFA500"/>
      <circle cx="300" cy="385" r="12" fill="#FFA500"/>
      <circle cx="300" cy="410" r="12" fill="#FFA500"/>
      <rect x="298" y="415" width="4" height="45" fill="#228B22"/>
      
      <circle cx="450" cy="430" r="15" fill="#9370DB"/>
      <circle cx="435" cy="425" r="12" fill="#DA70D6"/>
      <circle cx="465" cy="425" r="12" fill="#DA70D6"/>
      <circle cx="450" cy="420" r="12" fill="#DA70D6"/>
      <circle cx="450" cy="440" r="12" fill="#DA70D6"/>
      <rect x="448" y="445" width="4" height="35" fill="#228B22"/>
      
      <!-- Fence -->
      <rect x="50" y="300" width="10" height="80" fill="#8B4513"/>
      <rect x="110" y="300" width="10" height="80" fill="#8B4513"/>
      <rect x="170" y="300" width="10" height="80" fill="#8B4513"/>
      <rect x="50" y="320" width="130" height="8" fill="#8B4513"/>
      <rect x="50" y="350" width="130" height="8" fill="#8B4513"/>
      
      <!-- Butterfly -->
      <ellipse cx="600" cy="250" rx="15" ry="20" fill="#FF1493" opacity="0.7"/>
      <ellipse cx="630" cy="250" rx="15" ry="20" fill="#FF1493" opacity="0.7"/>
    </svg>`,
    colors: {
      primary: "#B0E0E6",
      secondary: "#7CFC00",
    },
  },
];

export function getSceneTemplate(id: string): SceneTemplate | undefined {
  return SCENE_TEMPLATES.find((t) => t.id === id);
}

export function getAllSceneTemplates(): SceneTemplate[] {
  return SCENE_TEMPLATES;
}
