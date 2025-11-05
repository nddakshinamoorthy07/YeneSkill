# 🚀 FFF Platform - Quick Start Guide

## 📋 Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the App](#running-the-app)
4. [Project Tour](#project-tour)
5. [Key Features](#key-features)

## 🎯 Installation

### Step 1: Install Dependencies

```bash
cd FFF-main
npm install
```

**Packages installed:**
- React 18.2
- React Router DOM 6.20
- Firebase 10.14
- Framer Motion (latest)
- Lucide React (latest)
- TailwindCSS 3.3
- TypeScript 5.2
- Vite 5.0

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google
4. Enable **Firestore Database**:
   - Go to Firestore Database
   - Create database (start in test mode)
5. Get your config:
   - Go to Project Settings
   - Scroll to "Your apps"
   - Copy the Firebase config

### Step 3: Environment Variables

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

## 🏃 Running the App

### Development Mode

```bash
npm run dev
```

Access at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

### Run Tests

```bash
npm test
```

## 🗺️ Project Tour

### Routes

| Path | Component | Description | Auth Required |
|------|-----------|-------------|---------------|
| `/` | LandingPage | Marketing homepage | No |
| `/login` | LoginPage | Sign in/Sign up | No |
| `/dashboard` | Dashboard | User dashboard | Yes |
| `/lessons` | CoursesPage | Course catalog | No |
| `/course/:id` | CourseDetailPage | Course details | No |
| `/mentors` | MentorsPage | Mentor directory | No |

### Components Overview

#### Navigation & Layout
- **Navbar**: Sticky header with auth state, theme toggle
- **Footer**: Links, social media, contact info

#### Landing Page
- **HeroSection**: Animated gradient hero with particles
- **FeatureCard**: Highlighting platform benefits
- **TestimonialSlider**: Auto-scrolling reviews

#### Course Components
- **CourseCard**: Course thumbnail with hover effects
- **SearchBar**: Filtered search input
- **Tag**: Category/level badges
- **ProgressBar**: Animated learning progress

#### Mentor Components
- **MentorCard**: Profile cards with stats
- **VideoModal**: Full-screen video player

#### Utilities
- **ThemeToggle**: Light/dark mode switcher

## 🎨 Key Features

### 1. Dark Mode
- Click moon/sun icon in navbar
- Persists to localStorage
- Smooth transitions

### 2. Authentication Flow

**Sign Up:**
1. Click "Get Started" or navigate to `/login`
2. Switch to "Sign Up" tab
3. Enter email and password
4. OR click "Continue with Google"
5. Redirects to `/dashboard`

**Sign In:**
1. Navigate to `/login`
2. Enter credentials
3. Redirects to `/dashboard`

**Sign Out:**
1. Click user avatar in navbar
2. Click "Logout"

### 3. Course Discovery

**Browse Courses:**
1. Navigate to "Courses" in navbar
2. Use search bar to filter
3. Select category from dropdown
4. Select level (Beginner/Intermediate/Advanced)
5. Click course card to view details

**Course Details:**
- Watch video preview
- View lesson list
- See mentor bio
- Enroll or continue learning

### 4. Mentor Profiles

1. Navigate to "Mentors"
2. Browse mentor cards
3. Click "View Profile"
4. See expertise, courses, availability
5. Book a session (UI only)

### 5. Dashboard Features

**Stats Cards:**
- Courses enrolled
- Certificates earned
- Hours learned
- Streak days

**Sections:**
- Continue Learning: Courses in progress
- Recommended: Personalized suggestions
- Top Mentors: Featured instructors

### 6. Animations

All powered by Framer Motion:
- Page transitions (fade/slide)
- Card hover effects (scale/shadow)
- Progress bar animations
- Modal overlays
- Scroll reveals
- Staggered lists

## 📦 Sample Data

Located in `src/data/sampleData.ts`:

- **6 Courses** across Web Dev, AI, Data Science, Design
- **4 Mentors** with expertise and bios
- **4 Testimonials** from "students"
- **6 Categories** for filtering
- **Embedded YouTube videos** for previews

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: { DEFAULT: '#3B82F6' },
  secondary: { DEFAULT: '#FACC15' },
  // ...
}
```

### Fonts

Change in `tailwind.config.js`:

```js
fontFamily: {
  sans: ['YourFont', 'system-ui'],
}
```

Update `src/index.css` Google Fonts import.

### Sample Data

Edit `src/data/sampleData.ts` to customize:
- Course titles, descriptions, images
- Mentor profiles
- Testimonials
- Categories

## 🐛 Troubleshooting

### Firebase Errors

**Error: "Firebase config is missing"**
- Check `.env` file exists
- Verify all `VITE_FIREBASE_*` variables
- Restart dev server

**Error: "Auth domain not authorized"**
- Add `localhost` to Firebase authorized domains
- Go to Authentication > Settings > Authorized domains

### Build Errors

**TypeScript errors:**
```bash
npm run build
```
Check console output for type issues.

**Tailwind not applying:**
- Clear cache: `rm -rf node_modules/.vite`
- Restart dev server

### Dark Mode Not Working

- Clear localStorage: `localStorage.clear()`
- Refresh page
- Check browser console for errors

## 🎓 Next Steps

1. **Add Real Data**: Replace sample data with Firestore
2. **Implement Enrollment**: Save user course enrollments
3. **Add Progress Tracking**: Store lesson completion
4. **Build Quiz System**: Add assessments
5. **Enable Payments**: Integrate Stripe
6. **Deploy**: Push to Vercel or Netlify

## 📚 Resources

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vite Guide](https://vitejs.dev)

## 💡 Tips

1. **Use React DevTools** for debugging components
2. **Check Network tab** for Firebase calls
3. **Use Tailwind IntelliSense** in VS Code
4. **Explore Framer Motion variants** for custom animations
5. **Test responsive design** with browser DevTools

---

**Happy Learning! 🚀**

Built with ❤️ by the FFF team
