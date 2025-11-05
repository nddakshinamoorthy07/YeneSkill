# 📁 FFF Platform - Complete File Structure

## 🌳 Directory Tree

```
FFF-main/
│
├── 📂 src/                                  # Source code
│   │
│   ├── 📂 components/                       # Reusable UI Components (12)
│   │   ├── 📄 Navbar.tsx                    # Navigation bar with auth
│   │   ├── 📄 Footer.tsx                    # Footer with links
│   │   ├── 📄 HeroSection.tsx               # Animated hero section
│   │   ├── 📄 FeatureCard.tsx               # Feature highlight cards
│   │   ├── 📄 CourseCard.tsx                # Course thumbnail cards
│   │   ├── 📄 MentorCard.tsx                # Mentor profile cards
│   │   ├── 📄 TestimonialSlider.tsx         # Auto-scrolling testimonials
│   │   ├── 📄 SearchBar.tsx                 # Search input component
│   │   ├── 📄 Tag.tsx                       # Category/level tags
│   │   ├── 📄 ProgressBar.tsx               # Animated progress bar
│   │   ├── 📄 VideoModal.tsx                # Video player modal
│   │   └── 📄 ThemeToggle.tsx               # Dark/light mode toggle
│   │
│   ├── 📂 pages/                            # Route Components (6)
│   │   ├── 📄 LandingPage.tsx               # Homepage (/)
│   │   ├── 📄 LoginPage.tsx                 # Auth page (/login)
│   │   ├── 📄 Dashboard.tsx                 # User dashboard (/dashboard)
│   │   ├── 📄 CoursesPage.tsx               # Course catalog (/lessons)
│   │   ├── 📄 MentorsPage.tsx               # Mentor directory (/mentors)
│   │   └── 📄 CourseDetailPage.tsx          # Course details (/course/:id)
│   │
│   ├── 📂 hooks/                            # Custom React Hooks
│   │   └── 📄 useAuth.ts                    # Firebase authentication hook
│   │
│   ├── 📂 data/                             # Sample Data
│   │   └── 📄 sampleData.ts                 # Courses, mentors, testimonials
│   │
│   ├── 📄 App.tsx                           # Main app with routing
│   ├── 📄 main.tsx                          # Application entry point
│   ├── 📄 index.css                         # Global styles & Tailwind
│   ├── 📄 firebase.ts                       # Firebase configuration
│   └── 📄 vite-env.d.ts                     # Vite type definitions
│
├── 📂 public/                               # Static Assets
│   └── 📄 vite.svg                          # Vite logo
│
├── 📂 dist/                                 # Production build output
│   ├── 📄 index.html
│   └── 📂 assets/
│       ├── 📄 index-*.css                   # Compiled CSS
│       └── 📄 index-*.js                    # Compiled JavaScript
│
├── 📂 scripts/                              # Utility Scripts
│   └── 📄 seedData.js                       # Firestore seeding script
│
├── 📂 tests/                                # Test Files
│   └── 📄 *.test.ts
│
├── 📄 package.json                          # Dependencies & scripts
├── 📄 package-lock.json                     # Locked dependencies
├── 📄 tsconfig.json                         # TypeScript config
├── 📄 tsconfig.node.json                    # TypeScript Node config
├── 📄 vite.config.js                        # Vite configuration
├── 📄 vitest.config.ts                      # Vitest test config
├── 📄 tailwind.config.js                    # Tailwind CSS config
├── 📄 postcss.config.js                     # PostCSS config
├── 📄 eslint.config.js                      # ESLint rules
├── 📄 .prettierrc.json                      # Prettier formatting
├── 📄 .gitignore                            # Git ignore rules
│
├── 📄 .env                                  # Environment variables (local)
├── 📄 .env.example                          # Environment template
│
├── 📄 firebase.json                         # Firebase configuration
├── 📄 firestore.rules                       # Firestore security rules
├── 📄 firestore.indexes.json                # Firestore indexes
│
├── 📄 README.md                             # Original readme
├── 📄 AGENTS.md                             # Agent instructions
├── 📄 FFF_README.md                         # ✨ Complete platform docs
├── 📄 FFF_QUICKSTART.md                     # ✨ Quick start guide
├── 📄 FFF_FEATURES.md                       # ✨ Feature documentation
├── 📄 IMPLEMENTATION_SUMMARY.md             # ✨ Implementation summary
├── 📄 PROJECT_STRUCTURE.md                  # ✨ This file
│
└── 📄 index.html                            # HTML entry point
```

## 📊 File Statistics

| Category | Count | Description |
|----------|-------|-------------|
| **Components** | 12 | Reusable UI components |
| **Pages** | 6 | Route-level components |
| **Hooks** | 1 | Custom React hooks |
| **Data Files** | 1 | Sample data |
| **Config Files** | 10 | Build, lint, format configs |
| **Documentation** | 5 | README, guides, summaries |
| **Total Source Files** | ~25 | TypeScript/TSX files |

## 🎨 Component Hierarchy

```
App.tsx (Router)
│
├── Navbar (All pages)
│   ├── ThemeToggle
│   └── User Menu
│
├── LandingPage (/)
│   ├── HeroSection
│   ├── FeatureCard (×6)
│   ├── TestimonialSlider
│   └── Footer
│
├── LoginPage (/login)
│   └── Auth Form
│
├── Dashboard (/dashboard) [Protected]
│   ├── Stats Cards (×4)
│   ├── CourseCard (×6)
│   │   ├── Tag (×3)
│   │   └── ProgressBar
│   └── MentorCard (×3)
│
├── CoursesPage (/lessons)
│   ├── SearchBar
│   ├── Filters
│   │   └── Tag (active filters)
│   └── CourseCard (filtered)
│       ├── Tag
│       └── ProgressBar
│
├── MentorsPage (/mentors)
│   ├── MentorCard (×4)
│   └── Modal (on click)
│       └── Tag (expertise)
│
└── CourseDetailPage (/course/:id)
    ├── Hero Banner
    │   └── Tag (×2)
    ├── Tabs (Overview/Lessons/Discussions/Resources)
    ├── Sidebar
    │   ├── Video Preview
    │   ├── ProgressBar
    │   └── Course Includes
    ├── Instructor Section
    └── VideoModal (on play)
```

## 🗂️ Component Purpose

### Layout Components
- **Navbar**: Global navigation with auth state
- **Footer**: Site-wide footer with links

### Landing Page
- **HeroSection**: Eye-catching hero with CTA
- **FeatureCard**: Showcase platform benefits
- **TestimonialSlider**: Social proof carousel

### Course Components
- **CourseCard**: Course thumbnail with metadata
- **SearchBar**: Filter courses by keyword
- **Tag**: Visual category/level indicators
- **ProgressBar**: Show learning progress
- **VideoModal**: Full-screen video player

### Mentor Components
- **MentorCard**: Mentor profile summary

### Utilities
- **ThemeToggle**: Switch dark/light mode

## 📄 Page Responsibilities

| Page | Route | Purpose | Protected |
|------|-------|---------|-----------|
| **LandingPage** | `/` | Marketing, features, testimonials | No |
| **LoginPage** | `/login` | Sign in/sign up with email or Google | No |
| **Dashboard** | `/dashboard` | Personalized learning hub | Yes |
| **CoursesPage** | `/lessons` | Browse and filter courses | No |
| **MentorsPage** | `/mentors` | View instructor profiles | No |
| **CourseDetailPage** | `/course/:id` | Course info, lessons, enroll | No |

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `tsconfig.json` | TypeScript compiler options |
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind theme and plugins |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `eslint.config.js` | Code linting rules |
| `.prettierrc.json` | Code formatting rules |
| `firebase.json` | Firebase hosting config |
| `firestore.rules` | Database security rules |
| `vitest.config.ts` | Test runner configuration |

## 📚 Documentation Files

| File | Content |
|------|---------|
| `FFF_README.md` | Complete platform documentation |
| `FFF_QUICKSTART.md` | Setup and usage guide |
| `FFF_FEATURES.md` | Detailed feature list |
| `IMPLEMENTATION_SUMMARY.md` | Project summary and metrics |
| `PROJECT_STRUCTURE.md` | This file - structure overview |

## 🎯 Key Entry Points

1. **index.html** - HTML template
2. **src/main.tsx** - React mounting
3. **src/App.tsx** - Router setup
4. **src/firebase.ts** - Backend config
5. **src/data/sampleData.ts** - Content data

## 🔗 Data Flow

```
User Action
    ↓
Component (pages/)
    ↓
Hook (useAuth)
    ↓
Firebase
    ↓
State Update
    ↓
UI Re-render
```

## 📦 Build Output

```
dist/
├── index.html              # Entry HTML (0.48 kB)
└── assets/
    ├── index-*.css         # Styles (35 kB → 6 kB gzipped)
    └── index-*.js          # Scripts (605 kB → 169 kB gzipped)
```

## 🌟 Notable Features by File

### `src/components/Navbar.tsx`
- Scroll-based background blur
- Active route indicators
- User dropdown menu
- Mobile hamburger menu

### `src/components/HeroSection.tsx`
- Animated floating particles
- Gradient background layers
- Statistics counter
- Dual CTAs

### `src/components/TestimonialSlider.tsx`
- Auto-advance carousel
- Manual navigation
- Progress indicators

### `src/pages/Dashboard.tsx`
- Personalized greeting
- Weekly progress tracking
- Multi-section layout
- Dynamic course filtering

### `src/pages/CoursesPage.tsx`
- Real-time search
- Multi-filter system
- Active filter display
- Empty state handling

### `src/hooks/useAuth.ts`
- Email/password auth
- Google OAuth
- Auth state persistence
- Session management

## 🎨 Styling Architecture

```
index.css (Global)
    ↓
Tailwind Base/Components/Utilities
    ↓
tailwind.config.js (Theme)
    ↓
Component Classes (Inline)
```

## 🚀 Build Process

```
TypeScript (src/**/*.tsx)
    ↓
Vite Compilation
    ↓
Tailwind CSS Processing
    ↓
Tree Shaking
    ↓
Minification
    ↓
dist/ Output
```

---

**Total Files in Project: ~50**  
**Source Code Files: ~25**  
**Configuration Files: ~10**  
**Documentation Files: ~5**

**Structure: Clean, Organized, Production-Ready** ✅
