# 📚 Course Enrollment System - Complete Guide

## 🎉 **What's New**

YeneSkill now has a **fully functional course enrollment system** that:

✅ **Real-time enrollment** - Click "Enroll Now" to join courses  
✅ **Auto-updates Dashboard** - Enrolled courses appear immediately  
✅ **Progress tracking** - Track completion 0-100%  
✅ **Career integration** - Skills unlock as you complete courses  
✅ **Stats sync** - Dashboard stats update automatically  

---

## 🗂️ **How the System Works**

### **1. User Clicks "Enroll Now"**
```
CoursesPage → CourseCard → useEnrollment hook
                                ↓
                         Firestore Write:
                    users/{uid}/courses/{courseId}
                                ↓
                         Updates user stats
                                ↓
                       Dashboard refreshes
```

### **2. Data Flow**

```
Firestore Collections:
├── courses/                    ← All available courses
│   ├── {courseId}
│   │   ├── title
│   │   ├── description
│   │   ├── durationHours
│   │   └── ...
│
└── users/{userId}/
    ├── streak                  ← Updated daily
    ├── totalCourses            ← Increments on enroll
    ├── completedCourses        ← Increments on 100%
    └── courses/                ← User's enrolled courses
        └── {courseId}
            ├── progress: 0-100
            ├── status: "in-progress" | "completed"
            ├── enrolledAt
            └── lastAccessedAt
```

---

## 🌱 **Seed Sample Data (12 Courses + 8 Mentors)**

### **Step 1: Run Seed Script**

```bash
cd d:/YeneSkill/FFF-main
node scripts/seedFirestore.js
```

### **Expected Output:**
```
🌱 Starting database seeding...

📚 Seeding courses...
✅ 12 courses seeded!

👨‍🏫 Seeding mentors...
✅ 8 mentors seeded!

🎯 Seeding career skills...
✅ 10 skills seeded!

🎉 Database seeding completed successfully!
```

### **Courses Added:**

1. **Web Development Fundamentals** (Beginner, 25h)
2. **React Mastery** (Intermediate, 30h)
3. **Python Programming** (Beginner, 35h)
4. **AI & Machine Learning Basics** (Intermediate, 40h)
5. **Node.js Backend Development** (Intermediate, 28h)
6. **Database Design & SQL** (Intermediate, 22h)
7. **Mobile App with React Native** (Advanced, 45h)
8. **Cloud Computing with AWS** (Intermediate, 35h)
9. **UI/UX Design Principles** (Beginner, 20h)
10. **Data Science with Python** (Intermediate, 42h)
11. **TypeScript for Modern Dev** (Intermediate, 18h)
12. **Docker & Kubernetes** (Advanced, 32h)

---

## 🧪 **Testing the Enrollment Flow**

### **Test 1: Enroll in a Course**

1. **Go to Courses** (`/lessons`)
2. **Click "Enroll Now"** on any course
3. **Button changes to** "Continue Learning" ✅
4. **Go to Dashboard** → Stats update:
   - Courses Enrolled: +1
   - Course appears in "Continue Learning"

### **Test 2: Track Progress**

1. **Open Firestore Console**
2. **Navigate to:** `users/{your-id}/courses/{course-id}`
3. **Update `progress`** from 0 → 50
4. **Refresh Dashboard:**
   - Progress bar shows 50%
   - Hours Learned increases

### **Test 3: Complete a Course**

1. **Set `progress: 100`** in Firestore
2. **Refresh Dashboard:**
   - Certificates: +1
   - Hours Learned: Full course hours added
3. **Go to Career page:**
   - New skills appear in graph! ✨

### **Test 4: Skills Unlock**

1. **Enroll in "Web Development Fundamentals"**
2. **Set progress to 75%**
3. **Go to Career page:**
   - HTML (Level 2)
   - CSS (Level 2)
   - JavaScript (Level 2)
   appear in the graph!

---

## 🚀 **Complete End-to-End Flow**

### **Scenario: New User Journey**

#### **Day 1:**
```
Action: Enroll in "Python Programming"
Result:
  ✅ Dashboard: Courses Enrolled = 1
  ✅ Course card shows "Continue Learning"
  ✅ Progress = 0%
```

#### **Day 2:**
```
Action: Study 5 hours (update progress to 30%)
Firestore: users/{uid}/courses/python-programming
  { progress: 30 }

Result:
  ✅ Dashboard: Hours Learned = 10.5 (30% of 35 hours)
  ✅ Career Page: Python skill appears (Level 1)
  ✅ Recommended: NumPy, Pandas
```

#### **Day 7:**
```
Action: Complete course (progress: 100%)
Firestore:
  { progress: 100, status: "completed" }

Result:
  ✅ Dashboard: Certificates = 1
  ✅ Dashboard: Hours Learned = 35
  ✅ Dashboard: Streak = 7 days
  ✅ Career: Python (Level 3), NumPy (Level 3), Pandas (Level 3)
  ✅ Learning Path: "Data Scientist" appears!
```

---

## 🎯 **useEnrollment Hook API**

### **Usage:**

```typescript
import { useEnrollment } from '../hooks/useEnrollment';

function MyCourseComponent({ courseId }) {
  const { isEnrolled, enrolling, enroll, updateProgress } = useEnrollment(courseId);

  // Check if user is enrolled
  if (isEnrolled) {
    return <button>Continue Learning</button>;
  }

  // Enroll in course
  const handleEnroll = async () => {
    const result = await enroll({
      title: 'Course Name',
      durationHours: 20,
      thumbnailUrl: '...',
    });
    
    if (result.success) {
      console.log('Enrolled!');
    }
  };

  // Update progress (0-100)
  const handleProgress = async () => {
    await updateProgress(50); // 50% complete
  };

  return (
    <button onClick={handleEnroll} disabled={enrolling}>
      {enrolling ? 'Enrolling...' : 'Enroll Now'}
    </button>
  );
}
```

---

## 📊 **Firestore Security Rules**

Update your `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Courses - read by all, write by admin only
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Mentors - read by all, write by admin
    match /mentors/{mentorId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User documents
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Enrolled courses sub-collection
      match /courses/{courseId} {
        allow read: if request.auth.uid == userId;
        allow create: if request.auth.uid == userId;
        allow update: if request.auth.uid == userId;
        allow delete: if request.auth.uid == userId;
      }
      
      // Achievements sub-collection
      match /achievements/{achievementId} {
        allow read: if request.auth.uid == userId;
        allow write: if false; // Server-only
      }
    }
    
    // Career graph (public read)
    match /career_graph/skills/{skillId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🔥 **Quick Setup Instructions**

### **Option 1: Use Seed Script (Recommended)**

```bash
# Make sure you're in FFF-main folder
cd d:/YeneSkill/FFF-main

# Run seed script
node scripts/seedFirestore.js
```

### **Option 2: Manual Setup (Firestore Console)**

1. Go to **Firestore Database**
2. Create collection: **`courses`**
3. Add documents manually using seed data from `src/data/seedCourses.ts`
4. Repeat for **`mentors`** collection

---

## 🧪 **Interactive Testing**

### **Test Enrollment:**

1. **Go to:** `http://localhost:3000/lessons`
2. **Click "Enroll Now"** on any course
3. **Wait 1-2 seconds**
4. **Button changes to** "Continue Learning" ✅

### **Test Progress:**

**Browser Console:**
```javascript
// Update course progress programmatically
const { updateProgress } = useEnrollment('web-dev-fundamentals');
await updateProgress(75); // Set to 75%
```

**Or Firestore Console:**
- Navigate to: `users/{uid}/courses/web-dev-fundamentals`
- Edit `progress` field: `75`
- Refresh Dashboard

---

## 📈 **Stats Calculation**

### **Hours Learned:**
```
Total Hours = Σ (Course Duration × Progress %)

Example:
  Course A: 20h × 100% = 20h
  Course B: 30h × 50%  = 15h
  Total = 35 hours
```

### **Certificates:**
```
Count courses where progress === 100
```

### **Streak Days:**
```
Increments daily if:
  - Today's date !== lastActiveDate
  - daysDifference === 1

Resets to 1 if:
  - daysDifference > 1
```

---

## 🎨 **UI States**

### **Not Enrolled:**
- Button: "Enroll Now" (Blue gradient)
- No progress bar

### **Enrolled (In Progress):**
- Button: "Continue Learning" (Green)
- Progress bar visible
- Badge: "In Progress"

### **Completed:**
- Button: "Review Course" (Green)
- Progress bar: 100%
- Badge: "Completed" with checkmark

---

## 🐛 **Troubleshooting**

### **Issue: "Enroll Now" doesn't work**

**Check:**
1. User is logged in
2. Firestore rules allow writes to `users/{uid}/courses`
3. Course document exists in `courses` collection
4. Check browser console for errors

### **Issue: Stats not updating**

**Fix:**
1. Hard refresh Dashboard (Ctrl + Shift + R)
2. Check Firestore data exists
3. Verify `durationHours` field exists in course
4. Check user document has `totalCourses` field

### **Issue: Skills not appearing in Career**

**Fix:**
1. Course must have progress > 30%
2. Course title must contain keywords: "web", "react", "python", "node", etc.
3. Check `CareerPage.tsx` → `courseSkillsMap` for supported courses
4. Refresh Career page

---

## ✅ **Success Checklist**

After setup, you should have:

- [ ] 12 courses in Firestore `courses` collection
- [ ] 8 mentors in `mentors` collection
- [ ] Can click "Enroll Now" on course cards
- [ ] Button changes to "Continue Learning" after enrollment
- [ ] Enrolled courses appear on Dashboard
- [ ] Progress updates when changed in Firestore
- [ ] Dashboard stats (hours, certificates) auto-calculate
- [ ] Career page shows skills from completed courses
- [ ] Recommendations update based on progress

---

## 🚀 **You're All Set!**

Your YeneSkill platform now has:

✅ **12 professional courses** with real YouTube videos  
✅ **8 expert mentors** with bios and expertise  
✅ **Live enrollment** - Click and enroll instantly  
✅ **Progress tracking** - Updates across all pages  
✅ **Smart career paths** - Skills unlock as you learn  
✅ **Comprehensive stats** - Hours, certificates, streaks  

**Run the seed script and start enrolling! 🎓**
