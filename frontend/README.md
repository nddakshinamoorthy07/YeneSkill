# FFF Frontend - React Application

Modern, responsive learning platform built with React, TypeScript, and TailwindCSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route components
│   ├── hooks/          # Custom React hooks
│   ├── data/           # Sample data
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── firebase.ts     # Firebase configuration
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### Firebase Setup

1. Create Firebase project
2. Enable Authentication (Email/Password + Google)
3. Enable Firestore Database
4. Copy config to `.env`

## 🎨 Features

- ✅ Authentication (Email/Password + Google)
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ Course catalog with search/filters
- ✅ Mentor profiles
- ✅ Progress tracking
- ✅ Video player modals

## 📚 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Backend
- **React Router** - Routing
- **Lucide React** - Icons

## 🧩 Key Components

- `Navbar` - Navigation with auth
- `HeroSection` - Animated landing hero
- `CourseCard` - Course thumbnails
- `MentorCard` - Mentor profiles
- `TestimonialSlider` - Auto-scrolling reviews
- `VideoModal` - Video player
- `ThemeToggle` - Dark mode switch

## 📱 Pages

- `/` - Landing page
- `/login` - Authentication
- `/dashboard` - User dashboard (protected)
- `/lessons` - Course catalog
- `/mentors` - Mentor directory
- `/course/:id` - Course details

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: { DEFAULT: '#3B82F6' },
  secondary: { DEFAULT: '#FACC15' },
}
```

### Sample Data

Edit `src/data/sampleData.ts` to customize courses, mentors, and testimonials.

## 📦 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm test            # Run tests
```

## 🚢 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
```

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## 🐛 Troubleshooting

**Build errors:**
```bash
rm -rf node_modules/.vite
npm install
npm run dev
```

**Firebase errors:**
- Check `.env` variables
- Verify Firebase config
- Check browser console

## 📖 Documentation

See `/docs` folder for complete documentation.
