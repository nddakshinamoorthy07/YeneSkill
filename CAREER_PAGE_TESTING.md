# 🚀 Career Page - Live Data Testing Guide

## ✅ **What's New**

The Career Page now **dynamically builds your skills graph** based on:

- ✅ **Completed Courses** - Extracts skills from finished courses
- ✅ **In-Progress Courses** - Includes skills from courses >30% complete
- ✅ **Skill Levels** - Adjusts based on course completion percentage
- ✅ **Smart Recommendations** - Suggests related skills to learn next
- ✅ **AI-Generated Paths** - Creates career paths based on your current skills

---

## 🎯 **How It Works**

### **Skill Extraction Logic:**

```
Course Progress → Skills Unlocked
────────────────────────────────
0-30%   → No skills yet
31-60%  → Skills at Level 1-2
61-90%  → Skills at Level 2-3
91-100% → Skills at Level 3 (Mastery)
```

### **Course-to-Skills Mapping:**

| Course Title Contains | Skills Unlocked |
|----------------------|----------------|
| `web` or `web-development` | HTML, CSS, JavaScript |
| `react` | React, JSX, Hooks |
| `node` | Node.js, Express, REST API |
| `python` | Python, NumPy, Pandas |
| `ai` | Machine Learning, TensorFlow |
| `database` | MongoDB, SQL, PostgreSQL |
| `git` | Git, GitHub, Version Control |

---

## 🧪 **Testing Scenarios**

### **Scenario 1: New User (No Courses)**

**Setup:** No courses in Firestore

**Expected Result:**
- Skills Graph: Empty state with "Browse Courses" button
- Recommended Skills: None
- Learning Paths: 1 default path ("Web Developer")

---

### **Scenario 2: Beginner Web Developer**

**Setup in Firestore:**

```javascript
// users/{userId}/courses/course-1
{
  id: "web-dev-101",
  title: "Web Development Fundamentals",
  progress: 60,
  durationHours: 20
}
```

**Expected Career Page:**

**Skills Graph Shows:**
- 🔵 HTML (Level 2) - Frontend
- 🔵 CSS (Level 2) - Frontend
- 🔵 JavaScript (Level 2) - Programming

**Recommended Skills:**
- TypeScript
- React
- Tailwind

**Learning Paths:**
- "Web Developer" (100 hours)

---

### **Scenario 3: Full Stack Student**

**Setup in Firestore:**

```javascript
// Course 1 - Web Development (Completed)
{
  id: "web-dev-101",
  title: "Web Development Fundamentals",
  progress: 100,
  durationHours: 20
}

// Course 2 - React (In Progress)
{
  id: "react-advanced",
  title: "Advanced React Patterns",
  progress: 80,
  durationHours: 15
}

// Course 3 - Node.js (Started)
{
  id: "node-backend",
  title: "Node.js Backend Development",
  progress: 40,
  durationHours: 18
}
```

**Expected Career Page:**

**Skills Graph Shows:**
- 🔵 HTML (Level 3) - Frontend
- 🔵 CSS (Level 3) - Frontend
- 🔵 JavaScript (Level 3) - Programming
- 🔵 React (Level 3) - Frontend
- 🔵 JSX (Level 3) - Frontend
- 🟣 Node.js (Level 2) - Backend
- 🟣 Express (Level 1) - Backend

**Recommended Skills:**
- TypeScript
- MongoDB
- Docker
- AWS

**Learning Paths:**
- "Full Stack Developer" (120 hours)
- "Cloud Engineer" (80 hours)

---

### **Scenario 4: Data Science Track**

**Setup in Firestore:**

```javascript
// Course 1
{
  id: "python-basics",
  title: "Python Programming Fundamentals",
  progress: 100,
  durationHours: 25
}

// Course 2
{
  id: "ai-ml-intro",
  title: "AI and Machine Learning Basics",
  progress: 70,
  durationHours: 30
}
```

**Expected Career Page:**

**Skills Graph Shows:**
- 🔵 Python (Level 3) - Programming
- 🟢 NumPy (Level 3) - Data Science
- 🟢 Pandas (Level 3) - Data Science
- 🩷 Machine Learning (Level 2) - AI/ML
- 🩷 TensorFlow (Level 1) - AI/ML

**Learning Paths:**
- "Data Scientist" (150 hours)
- "Cloud Engineer" (80 hours)

---

## 📝 **How to Test (Step-by-Step)**

### **Method 1: Firestore Console**

1. **Open Firebase Console** → Firestore Database
2. **Navigate to:** `users/{your-user-id}/courses`
3. **Add a test course:**

   **Document ID:** `web-dev-test`
   
   **Fields:**
   ```
   title: "Web Development Fundamentals" (string)
   progress: 75 (number)
   durationHours: 20 (number)
   status: "in-progress" (string)
   enrolledAt: (timestamp - now)
   lastAccessedAt: (timestamp - now)
   ```

4. **Go to Career Page** (`/career`)
5. **See skills appear:**
   - HTML (Level 2-3)
   - CSS (Level 2-3)
   - JavaScript (Level 2-3)

---

### **Method 2: Browser Console**

1. **Open Career Page** (`/career`)
2. **Press F12** → Console tab
3. **Get your user ID:**
   ```javascript
   const user = firebase.auth().currentUser;
   console.log('User ID:', user.uid);
   ```

4. **Manually add course via console** (if you created the test utilities):
   ```javascript
   // Note: You'd need to import Firebase in console first
   ```

---

## 🎨 **Visual Testing Checklist**

### **Skills Graph:**
- [ ] Shows correct number of skills
- [ ] Nodes are colored by category
- [ ] Node size reflects skill level (bigger = higher level)
- [ ] Can drag nodes around
- [ ] Lines connect related skills
- [ ] Clicking a skill shows details in sidebar

### **Skill Details Panel:**
- [ ] Shows skill name
- [ ] Shows category
- [ ] Shows proficiency (1-5 bars)
- [ ] Shows which course taught it

### **Recommended Skills:**
- [ ] Shows 3-5 skills you don't have yet
- [ ] Skills are related to your current skills
- [ ] Updates when you gain new skills

### **Learning Paths:**
- [ ] Shows 1-2 relevant career paths
- [ ] Paths match your current skills
- [ ] Shows estimated hours
- [ ] Has description

---

## 🔄 **Real-Time Update Testing**

### **Test: Complete a Course**

1. **Current state**: Course at 50% progress
2. **Action**: Update Firestore → Set `progress: 100`
3. **Expected**:
   - Skill levels increase to maximum
   - New learning paths may appear
   - Recommended skills update

### **Test: Add New Course**

1. **Action**: Add new course in different category
2. **Expected**:
   - New skills appear in graph
   - Graph re-renders with new nodes
   - New recommendations generated

---

## 📊 **Skill Level Calculation**

```javascript
// Formula:
Skill Level = Base Level × (Course Progress / 100)

// Examples:
Course: "React Advanced" (Base React skill = 3)
Progress 33%  → Level 1 (beginner)
Progress 66%  → Level 2 (intermediate)
Progress 100% → Level 3 (advanced)
```

---

## 🎯 **Learning Path Logic**

### **Path: "Full Stack Developer"**
**Triggers when you have:**
- JavaScript ✅
- React ✅

**Recommends:**
- Node.js
- Express  
- MongoDB

### **Path: "Cloud Engineer"**
**Triggers when you have:**
- JavaScript OR Python ✅

**Recommends:**
- AWS
- Docker
- Kubernetes

### **Path: "Data Scientist"**
**Triggers when you have:**
- Python ✅

**Recommends:**
- Pandas
- NumPy
- Machine Learning

---

## 🐛 **Troubleshooting**

### **Issue: No skills showing**

**Causes:**
1. No courses in Firestore
2. All courses < 30% progress
3. Course titles don't match keywords

**Fix:**
- Add test course with recognizable title:
  - "Web Development" ✅
  - "React Course" ✅
  - "Python Programming" ✅
  - "Random Course" ❌ (won't extract skills)

### **Issue: Wrong skill levels**

**Cause:** Course progress doesn't reflect actual level

**Fix:**
- 100% progress should give Level 3
- 50% progress should give Level 1-2
- Adjust progress in Firestore

---

## 🔥 **Quick Demo Setup**

### **Create 3 Test Courses:**

<function_calls>
<invoke name="Bash">
<parameter name="cmd">echo "Run these commands in Firestore Console:"
