import { CharacterTemplate } from "@/types/animation";

// Simple SVG-based character templates inspired by Peppa Pig style
export const CHARACTER_TEMPLATES: CharacterTemplate[] = [
  {
    id: "dog",
    name: "Max the Dog",
    type: "animal",
    baseColor: "#F4A460",
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="70" rx="25" ry="30" fill="currentColor"/>
      <!-- Head -->
      <circle cx="50" cy="35" r="20" fill="currentColor"/>
      <!-- Ears -->
      <ellipse cx="35" cy="25" rx="8" ry="15" fill="currentColor"/>
      <ellipse cx="65" cy="25" rx="8" ry="15" fill="currentColor"/>
      <!-- Snout -->
      <ellipse cx="50" cy="42" rx="10" ry="8" fill="#FFE4C4"/>
      <!-- Nose -->
      <circle cx="50" cy="42" r="3" fill="#000"/>
      <!-- Eyes -->
      <circle cx="43" cy="32" r="3" fill="#000"/>
      <circle cx="57" cy="32" r="3" fill="#000"/>
      <!-- Legs -->
      <rect x="35" y="95" width="8" height="20" rx="4" fill="currentColor"/>
      <rect x="57" y="95" width="8" height="20" rx="4" fill="currentColor"/>
      <!-- Tail -->
      <path d="M 75 75 Q 85 70, 85 60" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>`,
    expressions: {
      neutral:
        "M43,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6",
      happy:
        "M43,30 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,30 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M40,48 Q50,52 60,48",
      sad: "M43,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M40,52 Q50,48 60,52",
      surprised:
        "M43,32 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M57,32 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M45,48 h10",
      talking:
        "M43,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,32 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M45,48 a5,3 0 1,0 10,0",
    },
  },
  {
    id: "cat",
    name: "Luna the Cat",
    type: "animal",
    baseColor: "#FFA07A",
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="75" rx="22" ry="28" fill="currentColor"/>
      <!-- Head -->
      <circle cx="50" cy="40" r="18" fill="currentColor"/>
      <!-- Ears (triangular) -->
      <path d="M 35,30 L 30,15 L 40,25 Z" fill="currentColor"/>
      <path d="M 65,30 L 70,15 L 60,25 Z" fill="currentColor"/>
      <!-- Snout -->
      <ellipse cx="50" cy="45" rx="8" ry="6" fill="#FFE4C4"/>
      <!-- Nose -->
      <path d="M 50,43 L 47,46 L 53,46 Z" fill="#FF69B4"/>
      <!-- Eyes -->
      <ellipse cx="43" cy="37" rx="3" ry="4" fill="#000"/>
      <ellipse cx="57" cy="37" rx="3" ry="4" fill="#000"/>
      <!-- Whiskers -->
      <line x1="30" y1="42" x2="42" y2="42" stroke="#000" stroke-width="1"/>
      <line x1="70" y1="42" x2="58" y2="42" stroke="#000" stroke-width="1"/>
      <!-- Legs -->
      <rect x="38" y="98" width="7" height="18" rx="3" fill="currentColor"/>
      <rect x="55" y="98" width="7" height="18" rx="3" fill="currentColor"/>
      <!-- Tail -->
      <path d="M 72 80 Q 85 75, 90 65" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
    expressions: {
      neutral:
        "M43,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M57,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8",
      happy:
        "M43,35 m0,5 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M57,35 m0,5 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M42,52 Q50,55 58,52",
      sad: "M43,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M57,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M42,54 Q50,51 58,54",
      surprised:
        "M43,37 m0,5 a4,5 0 1,0 0,-10 a4,5 0 1,0 0,10 M57,37 m0,5 a4,5 0 1,0 0,-10 a4,5 0 1,0 0,10 M46,52 h8",
      talking:
        "M43,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M57,37 m0,4 a3,4 0 1,0 0,-8 a3,4 0 1,0 0,8 M46,52 a4,3 0 1,0 8,0",
    },
  },
  {
    id: "bear",
    name: "Bruno the Bear",
    type: "animal",
    baseColor: "#8B4513",
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="75" rx="28" ry="32" fill="currentColor"/>
      <!-- Head -->
      <circle cx="50" cy="38" r="22" fill="currentColor"/>
      <!-- Ears (circular) -->
      <circle cx="32" cy="22" r="10" fill="currentColor"/>
      <circle cx="68" cy="22" r="10" fill="currentColor"/>
      <!-- Snout -->
      <ellipse cx="50" cy="48" rx="12" ry="10" fill="#D2691E"/>
      <!-- Nose -->
      <ellipse cx="50" cy="48" rx="5" ry="4" fill="#000"/>
      <!-- Eyes -->
      <circle cx="42" cy="35" r="3" fill="#000"/>
      <circle cx="58" cy="35" r="3" fill="#000"/>
      <!-- Legs -->
      <rect x="32" y="100" width="10" height="18" rx="5" fill="currentColor"/>
      <rect x="58" y="100" width="10" height="18" rx="5" fill="currentColor"/>
    </svg>`,
    expressions: {
      neutral:
        "M42,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M58,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6",
      happy:
        "M42,33 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M58,33 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M40,56 Q50,60 60,56",
      sad: "M42,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M58,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M40,58 Q50,54 60,58",
      surprised:
        "M42,35 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M58,35 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M45,56 h10",
      talking:
        "M42,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M58,35 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M44,56 a6,4 0 1,0 12,0",
    },
  },
  {
    id: "rabbit",
    name: "Rosie the Rabbit",
    type: "animal",
    baseColor: "#FFB6C1",
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="75" rx="23" ry="28" fill="currentColor"/>
      <!-- Head -->
      <circle cx="50" cy="40" r="18" fill="currentColor"/>
      <!-- Long Ears -->
      <ellipse cx="38" cy="18" rx="6" ry="20" fill="currentColor"/>
      <ellipse cx="62" cy="18" rx="6" ry="20" fill="currentColor"/>
      <!-- Snout -->
      <ellipse cx="50" cy="46" rx="9" ry="7" fill="#FFF"/>
      <!-- Nose -->
      <ellipse cx="50" cy="44" rx="3" ry="2" fill="#FF69B4"/>
      <!-- Eyes -->
      <circle cx="43" cy="36" r="3" fill="#000"/>
      <circle cx="57" cy="36" r="3" fill="#000"/>
      <!-- Mouth -->
      <path d="M 50,44 L 50,48 M 45,48 Q 50,50 55,48" stroke="#000" stroke-width="1" fill="none"/>
      <!-- Legs -->
      <rect x="38" y="98" width="8" height="18" rx="4" fill="currentColor"/>
      <rect x="54" y="98" width="8" height="18" rx="4" fill="currentColor"/>
      <!-- Tail -->
      <circle cx="73" cy="78" r="6" fill="currentColor"/>
    </svg>`,
    expressions: {
      neutral:
        "M43,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6",
      happy:
        "M43,34 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,34 m0,4 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M42,52 Q50,55 58,52",
      sad: "M43,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M42,54 Q50,51 58,54",
      surprised:
        "M43,36 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M57,36 m0,4 a4,4 0 1,0 0,-8 a4,4 0 1,0 0,8 M45,52 h10",
      talking:
        "M43,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M57,36 m0,3 a3,3 0 1,0 0,-6 a3,3 0 1,0 0,6 M45,52 a5,3 0 1,0 10,0",
    },
  },
];

export function getCharacterTemplate(
  id: string
): CharacterTemplate | undefined {
  return CHARACTER_TEMPLATES.find((t) => t.id === id);
}

export function getAllCharacterTemplates(): CharacterTemplate[] {
  return CHARACTER_TEMPLATES;
}
