# Agent Instructions

## Project Setup

This is a Firebase + React + Vite + TypeScript application.

## Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Test**: `npm test`
- **Preview**: `npm run preview`

## Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Copy Firebase config to `.env` file

## Environment Variables

Required environment variables in `.env`:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

## Project Structure

```
src/
├── components/       # React components
│   ├── AuthForm.tsx     # Authentication UI
│   └── TodoList.tsx     # Todo list with Firestore
├── hooks/           # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   └── useFirestore.ts  # Firestore hook
├── App.tsx          # Main application
├── firebase.ts      # Firebase configuration
└── main.tsx         # Entry point

tests/               # Test files
```

## Features

- Firebase Authentication (Email/Password)
- Firestore Database integration
- Real-time todo list
- Responsive Tailwind CSS design
- TypeScript type safety
- Vitest testing setup

## Firestore Security Rules

Update `firestore.rules` for production:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Deployment

```bash
npm run build
firebase deploy
```
