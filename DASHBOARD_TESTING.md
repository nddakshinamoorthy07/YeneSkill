# 🧪 Dashboard Live Data Testing Guide

## 🎯 What's New

The Dashboard now shows **real-time data** from Firestore:

✅ **Courses Enrolled** - Counts actual enrolled courses  
✅ **Certificates** - Shows completed courses (100% progress)  
✅ **Hours Learned** - Calculates from course progress  
✅ **Streak Days** - Tracks consecutive learning days  
✅ **Weekly Progress** - Updates based on weekly hours goal  

---

## 📊 **How It Works**

### **Firestore Structure:**

```
users/{userId}
├── streak: 0
├── weeklyHoursCompleted: 0
├── weeklyHoursGoal: 10
├── lastActiveDate: Timestamp
└── courses/ (sub-collection)
    ├── {courseId}
    │   ├── title: "Course Name"
    │   ├── progress: 50
    │   ├── durationHours: 10
    │   ├── status: "in-progress"
    │   └── enrolledAt: Timestamp
    └── ...
```

---

## 🧪 **How to Test Live Updates**

### **Method 1: Using Firestore Console (Easiest)**

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Navigate to Firestore Database**
3. **Find your user**: `users/{your-user-id}`
4. **Add a test course**:
   - Click `users/{your-user-id}`
   - Click "Start collection" → Name: `courses`
   - Document ID: `course-1`
   - Add fields:
     ```
     title: "Web Development" (string)
     progress: 75 (number)
     durationHours: 10 (number)
     status: "in-progress" (string)
     enrolledAt: (timestamp - now)
     ```
5. **Refresh Dashboard** - Stats update automatically!

### **Method 2: Using Browser Console (Advanced)**

1. **Import test utilities** in `main.tsx`:

   ```typescript
   // Add to src/main.tsx
   import './utils/testProgress';
   ```

2. **Open browser console** (F12)

3. **Run test commands**:

   ```javascript
   // Get your user ID first
   const userId = 'YOUR_USER_ID_HERE';

   // Add a test course
   testProgress.addTestCourse(userId, {
     title: 'React Mastery',
     progress: 60,
     durationHours: 15
   });

   // Complete a course
   testProgress.completeCourse(userId, 'course-1');

   // Update progress
   testProgress.updateCourseProgress(userId, 'course-1', 80);

   // Update weekly hours
   testProgress.updateWeeklyHours(userId, 7.5);

   // Increase streak
   testProgress.increaseStreak(userId);
   ```

4. **Refresh dashboard** to see changes

---

## 📝 **Manual Testing Steps**

### **Test 1: Add Your First Course**

**Firestore:**
```javascript
// users/{userId}/courses/course-1
{
  title: "Introduction to Python",
  progress: 25,
  durationHours: 12,
  status: "in-progress",
  enrolledAt: Timestamp.now()
}
```

**Expected Dashboard:**
- Courses Enrolled: **1**
- Hours Learned: **3** (25% of 12 hours)
- Certificates: **0**

---

### **Test 2: Complete a Course**

**Firestore:**
```javascript
// Update course-1
{
  progress: 100,
  status: "completed",
  completedAt: Timestamp.now()
}
```

**Expected Dashboard:**
- Courses Enrolled: **1**
- Hours Learned: **12** (100% of 12 hours)
- Certificates: **1** ✅

---

### **Test 3: Add Multiple Courses**

**Firestore:**
```javascript
// Add course-2
{
  title: "Advanced JavaScript",
  progress: 50,
  durationHours: 20,
  status: "in-progress",
  enrolledAt: Timestamp.now()
}

// Add course-3
{
  title: "Data Structures",
  progress: 100,
  durationHours: 15,
  status: "completed",
  enrolledAt: Timestamp.now()
}
```

**Expected Dashboard:**
- Courses Enrolled: **3**
- Hours Learned: **37** (12 + 10 + 15)
- Certificates: **2** (course-1 and course-3)

---

### **Test 4: Update Weekly Progress**

**Firestore:**
```javascript
// Update users/{userId}
{
  weeklyHoursCompleted: 7,
  weeklyHoursGoal: 10
}
```

**Expected Dashboard:**
- Weekly Progress: **70%**
- Text: "7 of 10 hours completed this week"

---

### **Test 5: Build a Streak**

**Firestore:**
```javascript
// Update users/{userId}
{
  streak: 5,
  lastActiveDate: Timestamp.now()
}
```

**Expected Dashboard:**
- Streak Days: **5**
- Welcome message: "Amazing! You're on a 5-day streak! Keep it up! 🔥"

---

## 🚀 **Quick Test Setup**

### **Option A: Firestore Console (5 minutes)**

1. Go to Firestore in Firebase Console
2. Create your user document: `users/{your-user-id}`
3. Add fields:
   ```
   streak: 3
   weeklyHoursCompleted: 6
   weeklyHoursGoal: 10
   lastActiveDate: (timestamp)
   ```
4. Create sub-collection `courses` with 2-3 test courses
5. Refresh dashboard

### **Option B: Sample Data Script**

Create a test file:

```typescript
// src/scripts/seedUserData.ts
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function seedTestData(userId: string) {
  // Create user document
  await setDoc(doc(db, 'users', userId), {
    streak: 7,
    weeklyHoursCompleted: 8,
    weeklyHoursGoal: 10,
    lastActiveDate: new Date(),
  });

  // Add sample courses
  const courses = [
    {
      id: 'web-dev-101',
      title: 'Web Development Fundamentals',
      progress: 75,
      durationHours: 20,
      status: 'in-progress',
    },
    {
      id: 'react-advanced',
      title: 'Advanced React Patterns',
      progress: 100,
      durationHours: 15,
      status: 'completed',
    },
    {
      id: 'ai-basics',
      title: 'AI Basics for Everyone',
      progress: 30,
      durationHours: 12,
      status: 'in-progress',
    },
  ];

  for (const course of courses) {
    await setDoc(doc(db, 'users', userId, 'courses', course.id), {
      ...course,
      enrolledAt: new Date(),
      lastAccessedAt: new Date(),
    });
  }

  console.log('✅ Test data seeded!');
}
```

Run from console:
```javascript
import { seedTestData } from './scripts/seedUserData';
seedTestData('YOUR_USER_ID');
```

---

## 🔍 **Debugging**

### **Stats Not Updating?**

1. **Check browser console** for errors (F12)
2. **Verify Firestore rules** allow read/write
3. **Check user ID** matches in Firestore
4. **Hard refresh** browser (Ctrl + Shift + R)

### **Get Your User ID:**

Open console (F12):
```javascript
// In browser console
firebase.auth().currentUser.uid
```

Or check the URL after login - it's in the Firestore path.

---

## 📊 **Expected Calculations**

### **Hours Learned:**
```
Total Hours = Sum of (Course Duration × Progress %)

Example:
Course 1: 20 hours × 75% = 15 hours
Course 2: 15 hours × 100% = 15 hours
Course 3: 12 hours × 30% = 3.6 hours
Total = 33.6 hours (displayed as 33)
```

### **Weekly Progress:**
```
Progress % = (Weekly Hours Completed / Weekly Goal) × 100

Example:
Completed: 7 hours
Goal: 10 hours
Progress = 70%
```

### **Streak:**
- Increments by 1 each day you visit
- Resets to 1 if you skip a day
- Updates automatically on dashboard load

---

## ✅ **Testing Checklist**

- [ ] Dashboard loads without errors
- [ ] Stats show "..." while loading
- [ ] After loading, stats show real numbers
- [ ] Adding a course increases "Courses Enrolled"
- [ ] Completing a course (100%) increases "Certificates"
- [ ] Course progress updates "Hours Learned"
- [ ] Weekly hours update progress bar
- [ ] Streak updates daily
- [ ] Empty state shows when no courses enrolled
- [ ] Stats are stored in Firestore
- [ ] Refresh preserves data

---

## 🎉 **Demo Scenario**

**Day 1:**
- Enroll in 2 courses (progress: 0%)
- Stats: Enrolled: 2, Completed: 0, Hours: 0, Streak: 1

**Day 2:**
- Study Course 1 to 50%
- Stats: Enrolled: 2, Completed: 0, Hours: 10, Streak: 2

**Day 3:**
- Complete Course 1 (100%)
- Study Course 2 to 30%
- Stats: Enrolled: 2, Completed: 1, Hours: 23.6, Streak: 3

---

## 📞 **Need Help?**

- Check Firestore Console for data
- Look at browser console for errors
- Verify Firebase rules allow access
- Check user is authenticated

**Happy Testing! 🚀**
