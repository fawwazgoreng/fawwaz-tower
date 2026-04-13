# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# FAWWAZ TOWER 🏛️ (Development)

> **"Built on Logic. Rising in Victory."**
>
> A cinematic, production-quality single-page portfolio inspired by the **Pick Me Up (Infinite Gacha)** manhwa system, fused with **Stoic philosophy**. Every floor earned. Every skill forged.

---

## 🌌 Overview

**FAWWAZ TOWER** is not just a portfolio — it is an immersive **Tower Ascension** experience. It positions the creator as a "Floor 100" master, using a dark fantasy system interface to showcase skills, projects, and resilience.

Like a solo player who refuses to quit mid-climb, this tower stands as proof that consistency beats talent, and discipline outlasts motivation.

**Inspiration:**

- **Pick Me Up (Infinite Gacha):** System-based UI, rank systems (★ to ★★★★★★★), and the quiet resolve of someone who keeps ascending no matter the floor.
- **Stoicism:** Stillness under pressure, focus on self-mastery, and integrity in every pillar of the build. *The obstacle is the way.*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Animation** | Framer Motion |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **State/UI** | React Server Components |
| **Deployment** | Vercel |

---

## ✨ System Features (Core)

- **Tower Mode** — A global toggle that transforms the navigation into a vertical floor indicator (Floor 100 → 0). *One step up, one floor conquered.*
- **Hall of Echoes** — A comment log system where every "Survivor" leaves behind their message, floor, and Rank (★ to ★★★★★★★). The traces of those who made it.
- **Cinematic Audio** — A floating OST Player that sustains the *Dark Fantasy* atmosphere. Because every ascent deserves its own soundtrack.
- **Adaptive Cursor** — A glowing orb with portal effects when interacting with "System" elements.
- **Zero-Image Design** — Aesthetics built purely from CSS gradients, blur, and particles for maximum performance. *Form follows function.*

---

## 📁 Tower Structure (Project Map)

```text
.
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx      # Reactive system orb
│   │   ├── MusicPlayer.tsx       # Tower OST controller
│   │   ├── TowerMode.tsx         # Progression overlay
│   │   └── HallOfEchoes.tsx      # Ascension logs (Supabase)
│   └── sections/
│       ├── Floor100_Creator.tsx  # Identity & Origin
│       ├── Floor75_Journey.tsx   # Growth & Resilience
│       ├── Floor50_Creation.tsx  # Projects & Artefacts
│       ├── Floor25_Ascent.tsx    # Skills & Mastery
│       └── Floor0_Portal.tsx     # Contact & Transition
```

---

## 🚀 Quick Setup

**1. Clone & Install**

```bash
git clone https://github.com/yourusername/fawwaz-tower.git
cd fawwaz-tower
npm install
```

**2. Environment Variables**

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

**3. Database Setup (Supabase SQL)**

```sql
CREATE TABLE echoes (
  id          UUID      PRIMARY KEY DEFAULT uuid_generate_v4(),
  message     TEXT      NOT NULL,
  floor       INTEGER   DEFAULT 0,
  rank        TEXT      DEFAULT '★',
  title       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

**4. Run System**

```bash
npm run dev
```

> Tower will be live at `http://localhost:3000`. Begin your ascent.

---

## 🏛️ Philosophy of the Tower

> *"You don't control the difficulty of the floor. You control how you climb it."*

- **The Foundation** — Stoicism is the foundation. The outside world may be chaotic, but the pillars hold. No storm can bring down what is built from within.
- **The Ascent** — *Pick Me Up* is not just about being helped — it is the drive to keep climbing even when exhausted. Because your ★ rank today does not define your rank tomorrow.
- **The Victory (Fawwaz)** — Success is not the end, but evidence of every floor that has been conquered. Every commit is one floor higher.

---

<div align="center">

*Inspired by the world of* **Pick Me Up: Infinite Gacha**

Made with ❤️ and Stoic Discipline by

**Muhammad Fawwaz Almumtaz**

---

*"You have reached the Zenith. Will you transcend?"*

</div>