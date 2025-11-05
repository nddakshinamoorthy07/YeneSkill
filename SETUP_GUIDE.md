# 🚀 YeneSkill Platform - Complete Setup Guide

## 📁 New Project Structure

Your project has been **reorganized** into a clean frontend/backend architecture:

```
YeneSkill/
├── 📂 frontend/           ← React application (client-side)
├── 📂 backend/            ← Firebase config (server-side)
├── 📂 docs/               ← All documentation
├── 📂 shared/             ← Shared code (future)
└── 📄 README.md           ← Main documentation
```

---

## ✅ Step 1: Setup Frontend

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies (Already Done ✅)

Dependencies are already installed!

### Configure Firebase

1. **Copy the example environment file:**

```bash
copy .env.example .env
```

2. **Get Firebase credentials:**

   - Go to https://console.firebase.google.com/
   - Click your project (or create new)
   - Click ⚙️ Settings → Project settings
   - Scroll to "Your apps" section
   - Click the web app icon `</>`
   - Copy the config values

3. **Edit `frontend/.env` file:**

Open `frontend/.env` and replace with YOUR values:

```env
VITE_FIREBASE_API_KEY=AIza...your_actual_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

⚠️ **Important**: Replace ALL values with your actual Firebase credentials!

### Enable Firebase Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Click **Email/Password** → Enable → Save
4. Click **Google** → Enable → Add your email → Save

### Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Test mode** (for now)
4. Select your region
5. Click **Enable**

### Start Frontend

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

🎉 **Open http://localhost:5173 in your browser!**

---

## ✅ Step 2: Setup Backend (Optional)

### Navigate to Backend

```bash
cd ../backend
```

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Login to Firebase

```bash
firebase login
```

This will open a browser for authentication.

### Link to Your Firebase Project

```bash
firebase use --add
```

Select your project from the list.

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

---

## 🧪 Step 3: Test the Application

### 1. Create Your First Account

1. Open http://localhost:5173
2. Click **"Get Started"** button
3. Click **"Sign Up"** tab
4. Enter:
   - Email: `test@example.com`
   - Password: `password123`
5. Click **"Create Account"**

✅ You should be redirected to the Dashboard!

### 2. Test Google Sign-In

1. Click **Logout** (user avatar → Logout)
2. Click **"Get Started"**
3. Click **"Continue with Google"**
4. Select your Google account

✅ You should be logged in!

### 3. Explore Features

- 📚 Browse **Courses** page
- 👥 View **Mentors** page
- 🎥 Click a course to see details
- 🌙 Toggle **Dark Mode** (sun/moon icon)
- 📊 Check **Dashboard** for personalized content

---

## 📂 Understanding the Structure

### Frontend Folder (`frontend/`)

```
frontend/
├── src/
│   ├── components/        # UI components (Navbar, Footer, Cards, etc.)
│   ├── pages/            # Pages (Landing, Login, Dashboard, etc.)
│   ├── hooks/            # Custom hooks (useAuth)
│   ├── data/             # Sample data (courses, mentors)
│   ├── App.tsx           # Main app with routing
│   ├── firebase.ts       # Firebase initialization
│   └── main.tsx          # Entry point
├── public/               # Static files
├── .env                  # Environment variables (YOUR FIREBASE CONFIG)
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

### Backend Folder (`backend/`)

```
backend/
├── firebase.json          # Firebase project config
├── firestore.rules        # Database security rules
├── firestore.indexes.json # Database indexes
└── functions/            # Cloud Functions (future)
```

### Docs Folder (`docs/`)

```
docs/
├── START_HERE.md              # Quick start
├── FFF_README.md              # Complete guide
├── FFF_QUICKSTART.md          # Detailed walkthrough
├── FFF_FEATURES.md            # Feature list
├── IMPLEMENTATION_SUMMARY.md  # Project overview
└── PROJECT_STRUCTURE.md       # File structure
```

---

## 🎯 Common Commands

### Frontend Development

```bash
cd frontend

npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Backend Management

```bash
cd backend

firebase emulators:start              # Test locally
firebase deploy                       # Deploy everything
firebase deploy --only hosting        # Deploy frontend only
firebase deploy --only firestore      # Deploy database rules
```

---

## 🔧 Customization

### Change Colors

Edit `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: { DEFAULT: '#3B82F6' },  // Change to your brand color
  secondary: { DEFAULT: '#FACC15' },
}
```

### Add Your Content

Edit `frontend/src/data/sampleData.ts`:

```typescript
export const sampleCourses = [
  {
    id: '1',
    title: 'Your Course Title',
    description: 'Your description',
    thumbnail: 'https://your-image-url.com/image.jpg',
    // ... more fields
  }
];
```

### Update Logo/Branding

- Logo text: `frontend/src/components/Navbar.tsx` (line ~42)
- Favicon: Replace `frontend/public/vite.svg`
- App title: `frontend/index.html` (line ~6)

---

## 🐛 Troubleshooting

### Problem: Login doesn't work

**Solution:**
1. Check `frontend/.env` has correct Firebase values
2. Verify Email/Password is enabled in Firebase Console
3. Check browser console (F12) for error messages
4. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Problem: "Firebase config is missing"

**Solution:**
1. Make sure `frontend/.env` file exists
2. All variables must start with `VITE_`
3. No quotes around values
4. Restart dev server after changing `.env`

### Problem: Google Sign-In fails

**Solution:**
1. Enable Google provider in Firebase Console
2. Add authorized domain `localhost` in Firebase → Authentication → Settings
3. For production, add your domain to authorized domains

### Problem: Dark mode not working

**Solution:**
1. Clear browser cache
2. Click the sun/moon icon in navbar
3. Check browser console for errors

---

## 🚢 Deployment

### Deploy Frontend to Vercel (Recommended)

```bash
cd frontend
npm install -g vercel
vercel
```

Follow prompts, and you'll get a live URL!

### Deploy to Firebase Hosting

```bash
cd frontend
npm run build

cd ../backend
firebase deploy --only hosting
```

### Deploy Backend

```bash
cd backend
firebase deploy --only firestore:rules
```

---

## 📚 Next Steps

1. ✅ **Customize branding** (colors, logo, content)
2. ✅ **Add real courses** (replace sample data)
3. ✅ **Configure Firestore rules** for production
4. ✅ **Add Cloud Functions** for backend logic
5. ✅ **Implement payments** (Stripe integration)
6. ✅ **Deploy to production**

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `SETUP_GUIDE.md` | This file - setup instructions |
| `docs/START_HERE.md` | Quick start guide |
| `docs/FFF_README.md` | Complete platform docs |
| `docs/FFF_QUICKSTART.md` | Detailed walkthrough |
| `frontend/README.md` | Frontend-specific docs |
| `backend/README.md` | Backend-specific docs |

---

## 🆘 Still Need Help?

1. Check browser console (F12 → Console tab)
2. Check terminal for error messages
3. Read `docs/START_HERE.md`
4. Verify Firebase Console settings
5. Make sure `.env` values are correct

---

## ✨ You're All Set!

Your project is now organized with:
- ✅ Clean frontend/backend separation
- ✅ All dependencies installed
- ✅ Comprehensive documentation
- ✅ Ready to customize and deploy

**Next command:**

```bash
cd frontend
npm run dev
```

Then open **http://localhost:5173** and start building! 🚀

---

**Built with ❤️ for FutureFocus Foundation**
