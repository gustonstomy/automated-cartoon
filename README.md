# 🎬 Automated Cartoon Animation Pipeline

A full-stack Next.js application for creating children's-style animated stories with minimal manual work. Transform written stories into beautiful animated sequences automatically!

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)
![Remotion](https://img.shields.io/badge/Remotion-4-purple?style=for-the-badge)

## ✨ Features

- **📝 Manual Story Input** - Write your own stories with automatic scene generation
- **🎭 Character Templates** - 4 pre-designed SVG characters with 5 expressions each
- **🏞️ Scene Backgrounds** - 6 beautiful scene templates (Park, House, Playground, School, Beach, Garden)
- **✏️ Visual Editor** - Adjust character positions and edit dialogue
- **▶️ Animation Player** - Real-time preview with custom playback controls
- **💬 Dialogue System** - Automatic subtitle generation from story text
- **💾 Project Management** - Save, load, and manage multiple animation projects
- **🎬 Video Export** - Export animations as MP4 files (Remotion integration)
- **🎨 Clean UI** - Professional black and white interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gustonstomy/automated-cartoon.git
cd automated-cartoon

# Install dependencies
npm install

# Setup database
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application!

## 📖 How to Use

### 1. Create a Story

Navigate to **Create Story** and write your story or use the **"Load Example"** button:

```
Max the dog was excited to go to the park. When he arrived,
he saw Luna the cat sitting under a tree. "Hello Luna!" said
Max happily. Luna smiled and said "Hi Max! Want to play?"
They ran and played together all afternoon. It was the best day ever!
```

### 2. Generate Animation

Click **"Generate Animation"** - the system will automatically:

- Extract character names from your story (Max, Luna, etc.)
- Assign character templates from the library
- Create scenes with appropriate backgrounds
- Generate dialogue mapping text to characters
- Position characters intelligently
- Create smooth animations (appear, move, expressions)

### 3. Edit in Visual Editor

- **Adjust character positions** using X/Y coordinate inputs
- **Navigate between scenes** with Previous/Next buttons
- **Edit dialogue text** for each character
- **Save changes** to your project

### 4. Preview & Export

- **Play animation** with the built-in player
- **View dialogue subtitles** synchronized with timing
- **See characters animate** with smooth transitions
- **Export to video** using Remotion (MP4 format)

### 5. Manage Projects

- **View all projects** on the Projects page
- **Load existing projects** to continue editing
- **Delete old projects** to free up space

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - UI animations
- **Remotion 4** - Programmatic video creation

### Backend

- **Next.js API Routes** - Serverless functions
- **Prisma 5** - Database ORM
- **SQLite** - Local database storage

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Component patterns

## 📁 Project Structure

```
automated-cartoon/
├── app/
│   ├── api/
│   │   ├── projects/          # CRUD endpoints for projects
│   │   └── render/            # Video export endpoint
│   ├── create/                # Story creation page
│   ├── editor/[id]/           # Visual editor interface
│   ├── preview/[id]/          # Animation preview player
│   ├── projects/              # Project management page
│   ├── page.tsx               # Landing page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/ui/             # Reusable UI components
├── lib/
│   ├── templates/
│   │   ├── characters.ts      # 4 SVG character templates
│   │   └── scenes.ts          # 6 SVG scene backgrounds
│   ├── story-parser.ts        # Story-to-animation conversion
│   ├── db.ts                  # Prisma client configuration
│   └── utils.ts               # Utility functions
├── remotion/
│   ├── Root.tsx               # Remotion root component
│   ├── Composition.tsx        # Animation renderer
│   └── index.ts               # Remotion registration
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── prisma.config.ts       # Prisma configuration
└── types/
    └── animation.ts           # TypeScript type definitions
```

## 🎨 Character Templates

| Character        | Type   | Color     | Expressions                             |
| ---------------- | ------ | --------- | --------------------------------------- |
| Max the Dog      | Animal | Brown/Tan | neutral, happy, sad, surprised, talking |
| Luna the Cat     | Animal | Orange    | neutral, happy, sad, surprised, talking |
| Bruno the Bear   | Animal | Brown     | neutral, happy, sad, surprised, talking |
| Rosie the Rabbit | Animal | Pink      | neutral, happy, sad, surprised, talking |

All characters are SVG-based for scalability and customizable colors.

## 🏞️ Scene Backgrounds

- **Sunny Park** - Outdoor scene with trees and grass
- **Cozy Bedroom** - Indoor room with bed and window
- **Fun Playground** - Slide and swings for active scenes
- **School Classroom** - Blackboard and desks
- **Sunny Beach** - Ocean waves and palm trees
- **Flower Garden** - Colorful flowers and fence

## 🗄️ Database Schema

```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  storyData String   // JSON stringified animation data
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  assets    Asset[]
}

model Asset {
  id        String   @id @default(cuid())
  type      String   // 'audio', 'image', 'video'
  url       String
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}
```

## 🎯 API Endpoints

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/projects`      | List all projects         |
| POST   | `/api/projects`      | Create new project        |
| GET    | `/api/projects/[id]` | Get project by ID         |
| PUT    | `/api/projects/[id]` | Update project            |
| DELETE | `/api/projects/[id]` | Delete project            |
| POST   | `/api/render`        | Export animation to video |

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio GUI

# Linting
npm run lint         # Run ESLint
```

## 🎬 How It Works

### Story Parser

The system automatically:

1. **Splits story** into sentences using punctuation
2. **Extracts character names** (capitalized words, excluding common words)
3. **Assigns templates** from the 4 available character types
4. **Creates scenes** by grouping 2-3 sentences together
5. **Generates dialogue** mapping sentences to characters
6. **Positions characters** using smart placement algorithm
7. **Creates animations** (appear, move, scale, expressions)
8. **Calculates timing** based on dialogue length (3 seconds per line)

### Animation Engine

Built with Remotion for professional-grade rendering:

- **Frame-based rendering** at 30 FPS (1920x1080)
- **Smooth interpolation** for character movements
- **Expression changes** synchronized to dialogue
- **Scene transitions** with fade-in effects
- **Dialogue subtitles** displayed at precise timestamps
- **Character animations**: appear, disappear, move, scale

### Video Export

Uses Remotion CLI to render animations:

- High-quality MP4 output
- Customizable resolution and FPS
- Exports saved to `/public/exports/`
- Download links provided after rendering

## 🔧 Configuration

### Database

The project uses SQLite by default. Database configuration is in `prisma/prisma.config.ts`:

```typescript
export default {
  datasources: {
    db: {
      url: "file:./dev.db",
    },
  },
};
```

### Remotion

Remotion configuration is in `remotion/` directory:

- Composition: 1920x1080 at 30 FPS
- Duration: Calculated from scene lengths
- Audio: Ready for integration

## 🐛 Troubleshooting

### Build Fails

```bash
# Regenerate Prisma client
npx prisma generate

# Clear Next.js cache
rm -rf .next
npm run build
```

### Database Issues

```bash
# Reset database
rm prisma/dev.db
npx prisma db push
```

### Port Already in Use

```bash
# Use different port
npm run dev -- --port 3001
```

## 🚧 Roadmap

### Implemented ✅

- [x] Story creation and parsing
- [x] Character and scene templates
- [x] Visual editor with position controls
- [x] Animation preview player
- [x] Project save/load functionality
- [x] Database integration
- [x] Responsive UI design
- [x] Export API endpoint

### Future Enhancements 🔮

- [ ] **AI Story Generation** - OpenAI integration for automated storytelling
- [ ] **Text-to-Speech** - ElevenLabs/OpenAI TTS for narration
- [ ] **Lip-Sync** - Basic mouth animations matching audio
- [ ] **Background Music** - Audio track support
- [ ] **Custom Characters** - User-uploaded images
- [ ] **Timeline Editor** - Granular control over timing
- [ ] **Drag-and-Drop Editor** - Visual character positioning
- [ ] **User Authentication** - Multi-user support
- [ ] **Project Sharing** - Share animations with others
- [ ] **Template Marketplace** - Community templates

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:

- Follows TypeScript best practices
- Includes appropriate type definitions
- Works with the existing build system
- Doesn't break existing functionality

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Guston Stomy**

- Email: gustomstomy@gmail.com
- GitHub: [@gustonstomy](https://github.com/gustonstomy)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Remotion](https://www.remotion.dev/) - Video rendering engine
- [Prisma](https://www.prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- Inspired by Peppa Pig and Dora the Explorer animations

## 💡 Tips for Best Results

1. **Character Names**: Capitalize character names in your story (Max, Luna, etc.)
2. **Dialogue**: Use quotes for speech: `"Hello!" said Max`
3. **Scene Length**: Keep scenes to 2-3 sentences for best pacing
4. **Story Length**: 5-10 sentences work well for starter animations
5. **Character Limit**: System works best with 2-4 characters per story

## ⚡ Performance

- **Build time**: ~3-5 seconds
- **Story generation**: Instant
- **Animation preview**: Real-time (30 FPS)
- **Video export**: 1-2 minutes per minute of animation
- **Database**: Optimized SQLite queries

---

<p align="center">Made with ❤️ by <a href="https://github.com/gustonstomy">Guston Stomy</a></p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
<p align="center">🎬 Create amazing animations effortlessly!</p>
