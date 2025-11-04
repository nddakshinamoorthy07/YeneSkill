# FFF - Firebase React Application

A modern web application built with React, Vite, Firebase, and Tailwind CSS.

## Features

- ⚡️ Vite for fast development and building
- ⚛️ React 18 with TypeScript
- 🔥 Firebase integration (Authentication & Firestore)
- 🎨 Tailwind CSS for styling
- 📦 ESLint & Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your Firebase configuration:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Deployment

Deploy to Firebase Hosting:

```bash
npm run build
firebase deploy
```

## License

MIT
