# Setup Guide

## Initial Setup

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and Firestore
4. Get your Firebase configuration from Project Settings
5. Update `.env` file with your credentials

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Firebase CLI Setup

```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 5. Start Development

```bash
npm run dev
```

## Troubleshooting

- **Port already in use**: Change port in `vite.config.js`
- **Firebase errors**: Verify `.env` configuration
- **Build errors**: Clear `node_modules` and reinstall
