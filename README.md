# 🎓 YeneSkill - FutureFocus Foundation Learning Platform

A complete, modern online learning platform with separate frontend and backend architecture.

## 📁 Project Structure

```
YeneSkill/
├── frontend/              # React + Vite frontend application
│   ├── src/
│   │   ├── components/   # 12+ reusable UI components
│   │   ├── pages/        # 6 route pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── data/         # Sample data
│   │   └── App.tsx       # Main application
│   ├── public/           # Static assets
│   ├── package.json
│   └── README.md         # Frontend documentation
│
├── backend/              # Firebase backend configuration
│   ├── firebase.json     # Firebase project config
│   ├── firestore.rules   # Database security rules
│   ├── firestore.indexes.json
│   ├── functions/        # Cloud Functions (optional)
│   ├── package.json
│   └── README.md         # Backend documentation
│
├── docs/                 # Complete project documentation
│   ├── FFF_README.md              # Full platform guide
│   ├── FFF_QUICKSTART.md          # Quick start guide
│   ├── FFF_FEATURES.md            # Feature documentation
│   ├── IMPLEMENTATION_SUMMARY.md  # Project summary
│   ├── PROJECT_STRUCTURE.md       # File structure
│   └── START_HERE.md              # Getting started
│
├── shared/               # Shared types/utilities (future)
│   └── types/
│
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Git

### 1. Install Frontend

```bash
cd frontend
npm install
```

### 2. Install Backend Tools

```bash
cd backend
npm install -g firebase-tools
firebase login
```

### 3. Configure Environment

Create `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### 4. Start Development

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (optional):**
```bash
cd backend
firebase emulators:start
```

### 5. Access Application

- Frontend: http://localhost:5173
- Firebase Emulator UI: http://localhost:4000

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [START_HERE.md](docs/START_HERE.md) | Complete setup guide |
| [FFF_QUICKSTART.md](docs/FFF_QUICKSTART.md) | Quick start walkthrough |
| [FFF_README.md](docs/FFF_README.md) | Full platform documentation |
| [FFF_FEATURES.md](docs/FFF_FEATURES.md) | Feature list and details |
| [Frontend README](frontend/README.md) | Frontend-specific docs |
| [Backend README](backend/README.md) | Backend-specific docs |

## 🎨 Features

### Frontend
- ✅ 6 fully-designed pages
- ✅ 12+ reusable components
- ✅ Authentication (Email + Google)
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ Course catalog with search
- ✅ Mentor profiles
- ✅ Video player

### Backend
- ✅ Firebase Authentication
- ✅ Firestore Database
- ✅ Security rules
- ✅ Ready for Cloud Functions
- ✅ Hosting configuration

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Framer Motion (animations)
- React Router (routing)
- Lucide React (icons)

### Backend
- Firebase Authentication
- Firestore Database
- Firebase Hosting
- Cloud Functions (optional)

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
npm test        # Run tests
```

### Backend
```bash
firebase emulators:start    # Start Firebase emulators
firebase deploy            # Deploy to production
firebase deploy --only hosting  # Deploy hosting only
firebase deploy --only firestore:rules  # Deploy rules only
```

## 🔧 Development Workflow

### Working on Frontend
1. Navigate to `frontend/`
2. Make changes to components/pages
3. Hot reload automatically updates
4. Build with `npm run build`

### Working on Backend
1. Navigate to `backend/`
2. Update `firestore.rules` for security
3. Test with Firebase emulators
4. Deploy with `firebase deploy`

### Adding Features
1. Frontend component in `frontend/src/components/`
2. Backend function in `backend/functions/`
3. Update documentation in `docs/`

## 🚢 Deployment

### Frontend (Vercel - Recommended)

```bash
cd frontend
npm install -g vercel
vercel
```

### Backend (Firebase)

```bash
cd backend
firebase deploy
```

### Full Stack Deployment

```bash
# Build frontend
cd frontend
npm run build

# Deploy everything
cd ../backend
firebase deploy
```

## 🔐 Firebase Setup

### Required Services

1. **Authentication**
   - Enable Email/Password
   - Enable Google provider
   - Add OAuth 2.0 credentials

2. **Firestore Database**
   - Create database
   - Start in test mode
   - Update rules before production

3. **Hosting** (optional)
   - Initialize hosting
   - Configure `firebase.json`

### Firebase Console

https://console.firebase.google.com/

## 📊 Project Stats

- **Components**: 12+
- **Pages**: 6
- **Lines of Code**: 4,000+
- **Bundle Size**: 605 KB (169 KB gzipped)
- **Build Time**: ~3-5 seconds

## 🎯 Folder Purpose

| Folder | Purpose |
|--------|---------|
| `frontend/` | All client-side React code |
| `backend/` | Firebase configuration & functions |
| `docs/` | Complete documentation |
| `shared/` | Shared types/utilities (future) |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test locally
5. Submit pull request

## 📄 License

MIT License - feel free to use for learning or commercial purposes.

## 🙏 Credits

- **Design Inspiration**: Khan Academy, Coursera, Duolingo
- **Images**: Unsplash
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Poppins)

## 🆘 Support

Having issues? Check:

1. [Frontend README](frontend/README.md)
2. [Backend README](backend/README.md)
3. [Quick Start Guide](docs/FFF_QUICKSTART.md)
4. [Troubleshooting](docs/START_HERE.md#troubleshooting)

## 🗺️ Roadmap

- [ ] User profile management
- [ ] Real-time course enrollment
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Live streaming
- [ ] Mobile app
- [ ] Analytics dashboard

---

**Built with ❤️ for FutureFocus Foundation**

*Clean Architecture | Production Ready | Fully Documented*
