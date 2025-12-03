# 🎬 Automated Cartoon Animation Pipeline

A full-stack Next.js application for creating children's-style animated stories with minimal manual work. Transform written stories into beautiful animated sequences automatically!

![Landing Page](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- **🤖 Automatic Story Parsing** - AI-powered story-to-scene conversion
- **🎭 Character Templates** - 4 pre-designed SVG characters with 5 expressions each
- **🏞️ Scene Backgrounds** - 6 beautiful scene templates (Park, House, Playground, School, Beach, Garden)
- **✏️ Visual Editor** - Drag-and-drop character positioning and customization
- **▶️ Animation Player** - Real-time preview with custom playback controls
- **💬 Dialogue System** - Automatic subtitle generation from story text
- **💾 Project Management** - Save, load, and manage multiple animation projects
- **🎨 Cartoon-Themed UI** - Beautiful, colorful interface designed for creativity

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

Click **"Start Creating"** and write your story or use the **"Load Example"** button:

```
Max the dog was excited to go to the park. When he arrived,
he saw Luna the cat sitting under a tree. "Hello Luna!" said
Max happily. Luna smiled and said "Hi Max! Want to play?"
They ran and played together all afternoon. It was the best day ever!
```

### 2. Generate Animation

Click **"Generate Animation"** - the system will automatically:

- Extract character names (Max, Luna)
- Assign character templates
- Create scenes with backgrounds
- Generate dialogue and animations
- Position characters intelligently

### 3. Edit in Visual Editor

- **Adjust character positions** using X/Y coordinates
- **Navigate between scenes** with Previous/Next buttons
- **View dialogue** for each scene
- **Save changes** to your project

### 4. Preview & Export

- **Play animation** with the custom player
- **View dialogue subtitles** in real-time
- See characters animate and move
- _Video export coming soon!_

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - UI animations
- **Remotion** - Programmatic video creation

### Backend

- **Next.js API Routes** - Serverless functions
- **Prisma** - Database ORM
- **SQLite** - Local database
- **libSQL** - Database adapter

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Component patterns

## 📁 Project Structure

```
automated-cartoon/
├── app/
│   ├── api/projects/          # API routes for CRUD operations
│   ├── create/                # Story creation page
│   ├── editor/[id]/           # Visual editor interface
│   ├── preview/[id]/          # Animation player
│   ├── projects/              # Project management
│   ├── page.tsx               # Landing page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/ui/             # Reusable UI components
├── lib/
│   ├── templates/             # Character & scene templates
│   │   ├── characters.ts      # 4 SVG character templates
│   │   └── scenes.ts          # 6 SVG scene backgrounds
│   ├── story-parser.ts        # Story-to-animation logic
│   ├── db.ts                  # Prisma client
│   └── utils.ts               # Utility functions
├── remotion/
│   ├── Root.tsx               # Remotion configuration
│   └── Composition.tsx        # Animation renderer
├── prisma/
│   └── schema.prisma          # Database schema
└── types/
    └── animation.ts           # TypeScript interfaces
```

## 🎨 Character Templates

| Character        | Type   | Color     | Expressions                             |
| ---------------- | ------ | --------- | --------------------------------------- |
| Max the Dog      | Animal | Brown/Tan | neutral, happy, sad, surprised, talking |
| Luna the Cat     | Animal | Orange    | neutral, happy, sad, surprised, talking |
| Bruno the Bear   | Animal | Brown     | neutral, happy, sad, surprised, talking |
| Rosie the Rabbit | Animal | Pink      | neutral, happy, sad, surprised, talking |

## 🏞️ Scene Backgrounds

- **Sunny Park** - Outdoor scene with trees and clouds
- **Cozy House** - Indoor room with windows
- **Fun Playground** - Slide and swings
- **School Classroom** - Blackboard and desks
- **Sunny Beach** - Ocean and palm trees
- **Flower Garden** - Colorful flowers and fence

## 🗄️ Database Schema

```prisma
model Project {
  id        String   @id @default(uuid())
  name      String
  storyData String   // JSON stringified animation data
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  assets    Asset[]
}

model Asset {
  id        String   @id @default(uuid())
  projectId String
  type      String   // 'audio', 'image', 'video'
  url       String
  metadata  String?
  project   Project  @relation(...)
}
```

## 🎯 API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/projects`      | List all projects  |
| POST   | `/api/projects`      | Create new project |
| GET    | `/api/projects/[id]` | Get project by ID  |
| PUT    | `/api/projects/[id]` | Update project     |
| DELETE | `/api/projects/[id]` | Delete project     |

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio

# Linting
npm run lint         # Run ESLint
```

## 🎬 How It Works

### Story Parser

The system automatically:

1. **Splits story** into sentences
2. **Extracts character names** (capitalized words)
3. **Assigns templates** from available characters
4. **Creates scenes** grouping 2-3 sentences
5. **Generates dialogue** mapping text to characters
6. **Positions characters** using smart placement
7. **Creates animations** (appear, move, expressions)
8. **Calculates timing** based on dialogue length

### Animation Engine

Built with Remotion:

- **Frame-based rendering** at 30 FPS
- **Interpolation** for smooth movements
- **Expression changes** synced to dialogue
- **Scene transitions** with fade effects
- **Dialogue subtitles** at precise timestamps

## 🚧 Roadmap

### Coming Soon

- [ ] **Text-to-Speech** - ElevenLabs/OpenAI TTS integration
- [ ] **Lip-Sync** - Basic mouth animations
- [ ] **Video Export** - MP4 rendering with Remotion
- [ ] **Background Music** - Audio track support

### Future Features

- [ ] Custom character colors
- [ ] AI character generation (DALL-E)
- [ ] Advanced animations (rotation, complex paths)
- [ ] Timeline editor
- [ ] User authentication
- [ ] Project sharing
- [ ] Template gallery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Guston Stomy**

- Email: gustomstomy@gmail.com
- GitHub: [@gustonstomy](https://github.com/gustonstomy)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Remotion](https://www.remotion.dev/) - Video creation
- [Prisma](https://www.prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - Component patterns
- [Radix UI](https://www.radix-ui.com/) - Primitives
- Inspired by Peppa Pig and Dora the Explorer animations

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Landing Page

Beautiful hero section with feature showcase

### Story Creation

Write your story and preview character templates

### Visual Editor

Adjust character positions and navigate scenes

### Animation Player

Play animations with dialogue subtitles

</details>

---

<p align="center">Made with ❤️ by <a href="https://github.com/gustonstomy">Guston Stomy</a></p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
