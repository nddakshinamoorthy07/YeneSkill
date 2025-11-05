# 🎓 FutureFocus Foundation (FFF) - Learning Platform

A modern, visually stunning online learning and mentorship platform built with React, Vite, TailwindCSS, Framer Motion, and Firebase.

![FFF Platform](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 Design Philosophy

- **Clean & Bright**: Minimal yet energizing interface
- **Motion-Rich**: Smooth animations and transitions powered by Framer Motion
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Dark Mode**: Seamless light/dark theme toggle

### 🚀 Key Capabilities

- **Landing Page**: Compelling hero section with animated background, feature cards, and testimonials
- **Authentication**: Email/password and Google sign-in with beautiful split-screen UI
- **Dashboard**: Personalized learning hub with progress tracking and recommendations
- **Course Catalog**: Advanced search and filtering with real-time updates
- **Course Details**: Rich course pages with video preview, lesson list, and mentor info
- **Mentor Profiles**: Browse expert instructors with detailed bios and course listings
- **Progress Tracking**: Visual progress bars and learning statistics
- **Video Integration**: Embedded YouTube videos with modal player

## 🎨 Design System

### Colors

```css
Primary: #3B82F6 (Blue)
Secondary: #FACC15 (Warm Yellow)
Accent: #06B6D4 (Cyan)
Background Light: #F9FAFB
Background Dark: #111827
Text: #111827
```

### Gradients

```css
Primary Gradient: linear-gradient(135deg, #3B82F6, #06B6D4)
Warm Gradient: linear-gradient(135deg, #FACC15, #F97316)
Hero Gradient: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(6, 182, 212, 0.9))
```

### Typography

- **Font Families**: Inter, Poppins
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extra Bold), 900 (Black)

## 📁 Project Structure

```
FFF-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx              # Navigation with user menu
│   │   ├── Footer.tsx              # Footer with links and social
│   │   ├── HeroSection.tsx         # Animated landing hero
│   │   ├── FeatureCard.tsx         # Feature highlights
│   │   ├── CourseCard.tsx          # Course thumbnail cards
│   │   ├── MentorCard.tsx          # Mentor profile cards
│   │   ├── TestimonialSlider.tsx   # Auto-scrolling testimonials
│   │   ├── SearchBar.tsx           # Search input with icon
│   │   ├── Tag.tsx                 # Category/level tags
│   │   ├── ProgressBar.tsx         # Animated progress indicator
│   │   ├── VideoModal.tsx          # Video player modal
│   │   └── ThemeToggle.tsx         # Dark/light mode switch
│   ├── pages/               # Route components
│   │   ├── LandingPage.tsx         # Home/marketing page
│   │   ├── LoginPage.tsx           # Authentication page
│   │   ├── Dashboard.tsx           # User dashboard
│   │   ├── CoursesPage.tsx         # Course catalog with filters
│   │   ├── MentorsPage.tsx         # Mentor directory
│   │   └── CourseDetailPage.tsx    # Individual course page
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts              # Firebase authentication
│   ├── data/                # Sample data
│   │   └── sampleData.ts           # Courses, mentors, testimonials
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── firebase.ts          # Firebase configuration
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Animation library |
| **Firebase** | Authentication & database |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git

### Installation

1. **Clone the repository**

```bash
cd FFF-main
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. **Start the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to `http://localhost:5173`

## 📚 Sample Content

The application includes rich sample data:

### Courses (6)
- Introduction to Web Development
- AI Basics for Everyone
- Building Apps with Firebase
- React Mastery: Build Modern UIs
- Data Science with Python
- UI/UX Design Fundamentals

### Mentors (4)
- Sarah Chen - Senior Full-Stack Developer
- Dr. Marcus Johnson - AI Research Scientist
- Priya Sharma - Cloud Solutions Architect
- David Kim - Data Science Lead

### Testimonials (4)
Real-world success stories from fictional students

### Videos
Embedded YouTube tutorials from educational channels

## 🎭 Component Library

### Core Components

#### `<Navbar />`
Responsive navigation with:
- Animated logo
- Active link indicators
- User avatar dropdown
- Mobile hamburger menu
- Theme toggle

#### `<HeroSection />`
Landing page hero with:
- Animated gradient background
- Floating particles
- Call-to-action buttons
- Statistics counter
- Background video overlay

#### `<CourseCard />`
Course display with:
- Hover animations
- Progress indicator
- Video preview on hover
- Rating and enrollment stats
- Tag pills

#### `<MentorCard />`
Mentor profile with:
- Profile image
- Expertise tags
- Rating, students, courses
- View profile action

#### `<TestimonialSlider />`
Auto-scrolling carousel with:
- Smooth transitions
- Navigation controls
- Progress indicators
- Star ratings

#### `<VideoModal />`
Full-screen video player:
- YouTube embed
- Close button
- Backdrop blur
- Animated entry/exit

## 🎨 Animations

Powered by Framer Motion:

- **Page Transitions**: Fade and slide
- **Card Hover**: Scale and elevation
- **Scroll Reveals**: Staggered animations
- **Progress Bars**: Smooth fill animations
- **Theme Toggle**: Rotating icon
- **Modal Overlays**: Backdrop and scale

## 🔐 Authentication

Firebase Auth integration:

- Email/Password signup and login
- Google OAuth provider
- Protected routes
- Persistent sessions
- User state management
- Logout functionality

## 📱 Responsive Design

Breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Mobile-first approach with:
- Collapsible navigation
- Stacked cards
- Touch-friendly buttons
- Optimized images

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast compliance

## 🌙 Dark Mode

Theme toggle with:
- System preference detection
- Local storage persistence
- Smooth transitions
- Tailwind dark: variants

## 🚢 Deployment

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Recommended platforms:
- **Vercel**: Best for Vite apps
- **Netlify**: Easy continuous deployment
- **Firebase Hosting**: Integrated with Firebase services

## 📊 Performance

Optimizations:

- Code splitting
- Lazy loading
- Image optimization
- Minimal dependencies
- Tree shaking
- CSS purging

## 🧪 Testing

```bash
npm test
```

## 🛣️ Roadmap

Future enhancements:

- [ ] Real-time chat with mentors
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Progress analytics dashboard
- [ ] Social sharing
- [ ] Bookmark courses
- [ ] Course recommendations AI
- [ ] Live class streaming
- [ ] Mobile app (React Native)

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Images**: Unsplash
- **Videos**: YouTube educational content
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Poppins)
- **Inspiration**: Khan Academy, Coursera, Duolingo

## 📞 Support

For questions or issues:

- 📧 Email: support@futurefocus.org
- 💬 Discord: [Join our community]
- 🐦 Twitter: [@FFFLearn]

## 📸 Screenshots

### Landing Page
Beautiful hero with animated gradient, features, and testimonials

### Dashboard
Personalized learning hub with progress tracking

### Course Catalog
Advanced filtering and search functionality

### Course Detail
Rich course pages with video, lessons, and mentor info

---

**Built with ❤️ for learners worldwide by the FutureFocus Foundation team**
