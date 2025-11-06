# Complete Course Enrollment & Withdrawal System

## System Overview

The YeneSkill platform now has a **complete course management system** with enrollment and withdrawal functionality integrated with Firebase.

## User Workflow

```
┌─────────────────────────────────────────────────────┐
│          1. BROWSE COURSES                          │
│  User visits /lessons or /courses page              │
│  Sees all available courses                         │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│          2. ENROLL IN COURSE                        │
│  User clicks "Enroll Now" button                    │
│  → Creates enrollment in Firebase                   │
│  → progress: 0, enrolledAt: timestamp               │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│          3. COURSE IS ENROLLED                      │
│  Button changes to "Withdraw"                       │
│  Progress bar appears (if progress > 0)             │
│  Course shows in "Continue Learning"                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│          4. WITHDRAW (OPTIONAL)                     │
│  User clicks "Withdraw" button                      │
│  → Shows confirmation modal                         │
│  → Deletes enrollment from Firebase                 │
│  → Button changes back to "Enroll Now"              │
└─────────────────────────────────────────────────────┘
```

## Features Implemented

### ✅ 1. Enrollment System
- **`useEnroll` Hook** - Handles course enrollment
- **Firebase Integration** - Creates enrollment documents
- **Enroll Button** - Shown on non-enrolled courses
- **Loading States** - Shows "Enrolling..." during process
- **Success/Error Alerts** - User feedback

### ✅ 2. Enrollment Status Check
- **`useEnrollmentStatus` Hook** - Checks Firebase for enrollment
- **Real-time Status** - Queries enrollments collection
- **Progress Tracking** - Returns current progress
- **Loading States** - Handles async checks

### ✅ 3. Withdrawal System
- **`useWithdraw` Hook** - Handles course withdrawal
- **Confirmation Modal** - Prevents accidental withdrawals
- **Warning Message** - Informs about progress loss
- **Firebase Integration** - Deletes enrollment documents

### ✅ 4. Dynamic UI
- **Conditional Rendering** - Shows Enroll OR Withdraw based on status
- **Progress Bars** - Only shown for enrolled courses
- **Button States** - Disabled during processing
- **Auto-refresh** - Updates UI after enroll/withdraw

## File Structure

### New Hooks Created
```
frontend/src/hooks/
├── useEnroll.ts           # Enrollment logic
├── useEnrollmentStatus.ts # Check enrollment from Firebase
└── useWithdraw.ts         # Withdrawal logic
```

### Updated Components
```
frontend/src/components/
└── CourseCard.tsx         # Shows Enroll/Withdraw buttons

frontend/src/pages/
└── CourseDetailPage.tsx   # Detail page with Enroll/Withdraw
```

## How It Works

### 1. Course Cards (/lessons, /courses, /dashboard)
```tsx
// Checks enrollment status from Firebase
const { isEnrolled, progress, loading } = useEnrollmentStatus(courseId);

// Shows appropriate button
{isEnrolled ? (
  <button onClick={handleWithdraw}>Withdraw</button>
) : (
  <button onClick={handleEnroll}>Enroll Now</button>
)}
```

### 2. Firebase Data Structure
```javascript
// enrollments collection
{
  userId: "user123",
  courseId: "course456",
  progress: 0,               // 0-100
  enrolledAt: "2025-01-01",
  lastAccessed: "2025-01-01",
  completed: false
}
```

### 3. Enrollment Flow
```javascript
// 1. User clicks "Enroll Now"
const handleEnroll = async () => {
  // 2. Check if already enrolled
  const existing = await checkExistingEnrollment();
  if (existing) return false;
  
  // 3. Create new enrollment
  await addDoc(enrollmentsRef, {
    userId,
    courseId,
    progress: 0,
    enrolledAt: new Date()
  });
  
  // 4. Refresh page to show updated state
  window.location.reload();
};
```

### 4. Withdrawal Flow
```javascript
// 1. User clicks "Withdraw"
// 2. Shows confirmation modal
// 3. User confirms
const handleWithdraw = async () => {
  // 4. Find enrollment document
  const snapshot = await getDocs(enrollmentQuery);
  
  // 5. Delete enrollment
  await deleteDoc(doc(db, 'enrollments', enrollmentId));
  
  // 6. Refresh page
  window.location.reload();
};
```

## Pages Where This Works

### 📄 /lessons (Courses Listing)
- ✅ Shows all courses
- ✅ Enroll button on non-enrolled courses
- ✅ Withdraw button on enrolled courses
- ✅ Progress bars on enrolled courses

### 📄 /courses (Same as /lessons)
- ✅ Same functionality as /lessons

### 📄 /dashboard (Dashboard)
- ✅ "Continue Learning" section shows enrolled courses
- ✅ Withdraw button available
- ✅ Progress tracking

### 📄 /course/:id (Course Detail)
- ✅ Large "Enroll Now" or "Continue Learning" button
- ✅ "Withdraw from Course" button for enrolled
- ✅ Progress bar in sidebar
- ✅ Confirmation modal

## Testing Instructions

### Test 1: Enroll in a Course
1. Go to `/lessons`
2. Find a course with "Enroll Now" button
3. Click "Enroll Now"
4. Should see "Successfully enrolled!" alert
5. Page refreshes
6. Button changes to "Withdraw"

### Test 2: Withdraw from Course
1. Find enrolled course (has "Withdraw" button)
2. Click "Withdraw"
3. Confirmation modal appears
4. Click "Withdraw" in modal
5. Should see "You have been withdrawn" alert
6. Page refreshes
7. Button changes to "Enroll Now"

### Test 3: Enrollment Persistence
1. Enroll in a course
2. Refresh the page
3. Course should still show as enrolled
4. Navigate to different page and back
5. Enrollment status persists

### Test 4: Course Detail Page
1. Click on any course card
2. Go to detail page
3. If not enrolled: See "Enroll Now" button
4. If enrolled: See "Continue Learning" and "Withdraw" buttons
5. Test enroll/withdraw from detail page

## Firebase Required

**Important**: This system requires Firebase to be properly configured:

1. Create `.env` file in `frontend/` with:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Create Firestore collection: `enrollments`
3. User must be authenticated (logged in)

## Sample Data Note

The `sampleData.ts` file has hardcoded `progress` values for demo purposes:
- Course 1 (Web Dev): progress: 35
- Course 2 (AI): progress: 60
- Course 4 (React): progress: 20

**These are IGNORED** when checking real enrollment status. The system now queries Firebase instead!

## Benefits

✅ **Real Data** - Uses actual Firebase instead of fake sample data  
✅ **Persistent** - Enrollments saved across sessions  
✅ **User-specific** - Each user has their own enrollments  
✅ **Flexible** - Can enroll/withdraw anytime  
✅ **Safe** - Confirmation before withdrawal  
✅ **Feedback** - Clear alerts and loading states  

## Build Status

✅ **Build successful** - No TypeScript errors  
✅ **All hooks created** - useEnroll, useWithdraw, useEnrollmentStatus  
✅ **All pages updated** - CourseCard, CourseDetailPage  
✅ **Tested** - Complete flow works end-to-end  

---

**Ready to use!** Start dev server and test the complete workflow:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000/lessons` and start enrolling!
