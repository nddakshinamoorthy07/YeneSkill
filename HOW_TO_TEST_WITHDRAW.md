# How to Test Withdraw Feature

## Quick Test Guide

### 1. Start the Development Server
```bash
cd frontend
npm run dev
```

### 2. Navigate to Courses/Lessons Page
- Open browser to: `http://localhost:3000/lessons` OR `http://localhost:3000/courses`
- Both routes show the same CoursesPage component

### 3. Identify Enrolled Courses
Look for courses with:
- **Progress bar** displayed below tags
- Progress values > 0 (e.g., 35%, 60%, 20%)

Currently enrolled courses in sample data:
- ✅ "Introduction to Web Development" - 35% progress
- ✅ "AI Basics for Everyone" - 60% progress  
- ✅ "React Mastery: Build Modern UIs" - 20% progress

### 4. Locate Withdraw Button
The withdraw button appears:
- **At the bottom of the course card**
- Below the stats (lessons, students, rating)
- Red border with "Withdraw" text and logout icon
- Full width of the card

### 5. Test Withdraw Flow
1. Click the **red "Withdraw" button** on any enrolled course
2. Confirmation modal appears with:
   - Warning icon (red circle)
   - "Withdraw from Course?" title
   - Warning message about progress loss
   - Cancel and Withdraw buttons
3. Click **"Withdraw"** to confirm
4. Button shows "Withdrawing..." during processing
5. Success alert appears
6. Course enrollment is deleted from Firebase
7. Page can be refreshed to see updated state

### 6. Test on Course Detail Page
1. Click on any enrolled course card
2. Navigate to course detail page (`/course/:id`)
3. Scroll to right sidebar
4. Find "Withdraw from Course" button (large, red border)
5. Click and follow same confirmation flow
6. After withdrawal, redirects to `/courses`

## Troubleshooting

### Withdraw Button Not Visible?
**Check:**
1. Is the course enrolled? (progress > 0?)
2. Scroll down - button is at bottom of card
3. Clear browser cache and rebuild:
   ```bash
   cd frontend
   npm run build
   ```

### Button Visible But No Click Response?
**Check:**
1. Is Firebase configured in `.env` file?
2. Check browser console for errors
3. Ensure user is authenticated

### Withdrawal Not Working?
**Check:**
1. Firebase connection in browser DevTools → Network
2. Console errors in browser
3. Ensure `useWithdraw` hook is imported correctly

## Sample Data Reference

Courses with progress (should show withdraw button):
```javascript
{
  id: '1',
  title: 'Introduction to Web Development',
  progress: 35  // ✅ Shows withdraw
}
{
  id: '2', 
  title: 'AI Basics for Everyone',
  progress: 60  // ✅ Shows withdraw
}
{
  id: '4',
  title: 'React Mastery: Build Modern UIs', 
  progress: 20  // ✅ Shows withdraw
}
```

Courses without progress (no withdraw button):
```javascript
{
  id: '3',
  title: 'Building Apps with Firebase',
  progress: 0  // ❌ No withdraw button
}
```

## Visual Confirmation

### Card Layout (Enrolled Course):
```
┌─────────────────────────────┐
│     [Course Image]          │
│                             │
├─────────────────────────────┤
│ Course Title                │
│ Description text...         │
│ [Tag] [Tag] [Tag]          │
│ ▓▓▓▓▓░░░░░░░░░░ 35%       │ ← Progress Bar
│ ⏱ 8 lessons  👥 2.4k ⭐4.8│ ← Stats
│ ┌─────────────────────────┐ │
│ │ 🚪 Withdraw            │ │ ← WITHDRAW BUTTON
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Implementation Files

Check these files if debugging:
- `frontend/src/components/CourseCard.tsx` - Card with button
- `frontend/src/hooks/useWithdraw.ts` - Withdraw logic
- `frontend/src/pages/CourseDetailPage.tsx` - Detail page button
- `frontend/src/pages/CoursesPage.tsx` - Lists courses
- `frontend/src/App.tsx` - Route configuration

## Routes

| URL | Component | Shows Withdraw? |
|-----|-----------|-----------------|
| `/lessons` | CoursesPage | ✅ Yes (on enrolled cards) |
| `/courses` | CoursesPage | ✅ Yes (on enrolled cards) |
| `/dashboard` | Dashboard | ✅ Yes (continue learning section) |
| `/course/:id` | CourseDetailPage | ✅ Yes (if enrolled) |
