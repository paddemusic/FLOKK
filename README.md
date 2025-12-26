
# FREND — Patrick Jørgensen Portfolio

A cinematic, dark-first portfolio website showcasing creative strategy, content production, and AI-driven storytelling.

## 🎨 Design Philosophy

**Brand Colors:**
- Black: `#1c1c1c` (primary)
- White: `#f7f7f7` (secondary)
- Red: `#dd2222` (accent)

**Tone:** Futuristic, confident, refined with smooth animations and micro-interactions.

## 🚀 Tech Stack

- **Framework:** Next.js 15.2 (Page Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Font:** Geist Sans & Mono

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── PortfolioSection.tsx
│   ├── TimelineSection.tsx
│   ├── CompetenceSection.tsx
│   ├── ContactSection.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Layout.tsx
├── data/              # Content data
│   ├── projects.ts    # Portfolio projects
│   └── timeline.ts    # Career timeline
├── lib/               # Utilities
│   ├── motion.ts      # Framer Motion configs
│   └── utils.ts       # Helper functions
├── pages/             # Next.js pages
│   ├── index.tsx      # Home page
│   ├── _app.tsx       # App wrapper
│   └── _document.tsx  # Document wrapper
└── styles/
    └── globals.css    # Global styles
```

## 🎬 Animation Tokens

**Duration:**
- Short: 0.4s
- Medium: 0.6s
- Long: 0.9s

**Easing:** cubic-bezier(0.4, 0.0, 0.2, 1)

**Key Animations:**
- Hero Ken Burns effect (12s scale)
- Parallax scrolling (0.15 speed)
- Portfolio hover (1.03 scale, 0.22s)
- Header auto-hide (scroll detection)
- Footer red glow loop (5s fade)

## 📝 Content Management

### Adding Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  category: "Video" | "Campaigns" | "Design" | "AI Projects" | "Music",
  description: "Project description",
  thumbnail: "image-url",
  link: "external-link",
  year: 2024,
  client: "Client Name",
  views: "50M+",
}
```

### Updating Timeline

Edit `src/data/timeline.ts`:

```typescript
{
  id: "unique-id",
  year: "2024",
  title: "Job Title",
  company: "Company Name",
  description: "Role description",
  highlights: ["Achievement 1", "Achievement 2"],
  type: "work" | "education" | "freelance",
}
```

## 🎯 Performance Targets

- **Lighthouse Performance:** ≥90
- **Accessibility:** ≥90
- **CLS:** <0.1
- **FPS:** 60-90

## ♿ Accessibility

- WCAG AA contrast compliance
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators with red accent
- Respects `prefers-reduced-motion`

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No environment variables required for basic functionality.

For contact form integration, configure your preferred email service.

## 📱 Responsive Breakpoints

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

## 🔗 Social Links

Update social links in `src/components/ContactSection.tsx`:

```typescript
const socialLinks = [
  { name: "Instagram", href: "YOUR_INSTAGRAM_URL" },
  { name: "YouTube", href: "YOUR_YOUTUBE_URL" },
  { name: "Spotify", href: "YOUR_SPOTIFY_URL" },
  { name: "LinkedIn", href: "YOUR_LINKEDIN_URL" },
];
```

## 📧 Contact

Email: contact@hellonomusic.com

## 📄 License

© 2025 Patrick Jørgensen — FREND. All rights reserved.

---

**Built with 💪 by Softgen AI**
