# 🚀 YeneSkill - Quick Reference Card

## 📁 New Project Structure

```
YeneSkill/
├── frontend/    ← React app (START HERE!)
├── backend/     ← Firebase config
├── docs/        ← Documentation
└── shared/      ← Shared code (future)
```

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Configure Firebase

```bash
cd frontend
copy .env.example .env
# Edit .env with YOUR Firebase credentials
```

### 2️⃣ Start Dev Server

```bash
npm run dev
```

### 3️⃣ Open Browser

http://localhost:5173

---

## 🔥 Firebase Setup Checklist

- [ ] Create Firebase project: https://console.firebase.google.com/
- [ ] Enable **Email/Password** auth
- [ ] Enable **Google** auth
- [ ] Create **Firestore Database** (test mode)
- [ ] Copy config to `frontend/.env`
- [ ] Add `localhost` to authorized domains

---

## 📝 Environment Variables

Edit `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-ABC
```

⚠️ All values must be REAL (not placeholders)!

---

## 🛠️ Common Commands

### Frontend (cd frontend)

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

### Backend (cd backend)

| Command | Purpose |
|---------|---------|
| `firebase login` | Login to Firebase |
| `firebase deploy` | Deploy everything |
| `firebase deploy --only hosting` | Deploy frontend |
| `firebase deploy --only firestore:rules` | Deploy database rules |

---

## 🎯 Project Locations

### Working Files

| What | Where |
|------|-------|
| **React Components** | `frontend/src/components/` |
| **Pages** | `frontend/src/pages/` |
| **Sample Data** | `frontend/src/data/sampleData.ts` |
| **Firebase Config** | `frontend/src/firebase.ts` |
| **Styles** | `frontend/src/index.css` |
| **Tailwind Config** | `frontend/tailwind.config.js` |

### Configuration

| What | Where |
|------|-------|
| **Environment** | `frontend/.env` |
| **Package Config** | `frontend/package.json` |
| **Firebase Rules** | `backend/firestore.rules` |
| **Firebase Config** | `backend/firebase.json` |

### Documentation

| What | Where |
|------|-------|
| **Main Guide** | `README.md` |
| **Setup Guide** | `SETUP_GUIDE.md` |
| **Quick Start** | `docs/START_HERE.md` |
| **Full Docs** | `docs/FFF_README.md` |
| **Features** | `docs/FFF_FEATURES.md` |

---

## 🎨 Customization Quick Links

### Change Colors

`frontend/tailwind.config.js` → `colors` section

### Update Courses

`frontend/src/data/sampleData.ts` → `sampleCourses`

### Update Mentors

`frontend/src/data/sampleData.ts` → `sampleMentors`

### Change Logo

`frontend/src/components/Navbar.tsx` → Line ~47

### Update App Title

`frontend/index.html` → `<title>` tag

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Login fails** | Check `.env` values, restart server |
| **"Firebase config missing"** | Verify `.env` exists with `VITE_` prefix |
| **Google login fails** | Enable in Firebase Console, add localhost |
| **Build errors** | Run `rm -rf node_modules/.vite && npm install` |
| **Port in use** | Change port in `vite.config.js` or kill process |

---

## 🚢 Deployment

### Vercel (Frontend)

```bash
cd frontend
vercel
```

### Firebase Hosting

```bash
cd frontend
npm run build
cd ../backend
firebase deploy --only hosting
```

---

## 📂 Important Files

| File | Purpose | Edit? |
|------|---------|-------|
| `frontend/.env` | Firebase credentials | ✅ YES |
| `frontend/src/data/sampleData.ts` | Course/mentor data | ✅ YES |
| `frontend/tailwind.config.js` | Brand colors | ✅ YES |
| `frontend/src/firebase.ts` | Firebase setup | ⚠️ Rarely |
| `backend/firestore.rules` | Database security | ✅ YES (for production) |

---

## 🎯 Testing Login

1. Open http://localhost:5173
2. Click **"Get Started"**
3. Click **"Sign Up"** tab
4. Enter: `test@test.com` / `password123`
5. Click **"Create Account"**

✅ Should redirect to Dashboard!

---

## 📚 Pages Overview

| Route | Page | Protected |
|-------|------|-----------|
| `/` | Landing | No |
| `/login` | Login/Signup | No |
| `/dashboard` | Dashboard | Yes |
| `/lessons` | Courses | No |
| `/mentors` | Mentors | No |
| `/course/:id` | Course Detail | No |

---

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com/
- Tailwind Docs: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- React Router: https://reactrouter.com
- Vite Guide: https://vitejs.dev

---

## ✅ Checklist for Production

### Before Deploying

- [ ] Update Firestore security rules
- [ ] Add production domain to Firebase authorized domains
- [ ] Update environment variables for production
- [ ] Test all features (login, courses, mentors)
- [ ] Enable Google Analytics (optional)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure CORS if needed
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`

### SEO & Performance

- [ ] Add meta tags in `index.html`
- [ ] Add Open Graph tags
- [ ] Optimize images
- [ ] Add sitemap
- [ ] Configure robots.txt

---

## 💡 Pro Tips

1. **Use React DevTools** for debugging
2. **Check browser console** (F12) for errors
3. **Restart server** after changing `.env`
4. **Clear cache** if dark mode doesn't work
5. **Use Firebase Emulators** for local testing

---

## 🎉 You're Ready!

**Your Next Steps:**

1. Configure `.env` with Firebase credentials
2. Run `npm run dev` in `frontend/`
3. Open http://localhost:5173
4. Create your first account

**Having issues? Check:**
- SETUP_GUIDE.md (detailed setup)
- docs/START_HERE.md (troubleshooting)
- Browser console for errors

---

**Built with ❤️ by FFF Team**

*Keep this card handy for quick reference!*
