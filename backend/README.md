# FFF Backend - Firebase Configuration

This folder contains Firebase backend configuration including Firestore rules and Cloud Functions.

## 📁 Structure

```
backend/
├── firebase.json           # Firebase project configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── functions/              # Cloud Functions (optional)
└── package.json            # Backend dependencies
```

## 🚀 Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase (if needed)

```bash
firebase init
```

Select:
- Firestore
- Functions (optional)
- Hosting (optional)

### 4. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 5. Deploy Cloud Functions (when ready)

```bash
cd functions
npm install
firebase deploy --only functions
```

## 📊 Firestore Rules

Current rules in `firestore.rules` allow:
- Read/write access for authenticated users
- User-specific data isolation
- Basic security

**⚠️ Update rules for production!**

## 🔧 Cloud Functions (Optional)

To add server-side logic:

1. Create `functions/` directory
2. Add function code in `functions/index.js`
3. Deploy with `firebase deploy --only functions`

Example functions:
- User onboarding triggers
- Course enrollment logic
- Certificate generation
- Email notifications
- Payment processing

## 📝 Environment Variables

For Cloud Functions, create `functions/.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
```

## 🌐 Firebase Console

Manage your backend at: https://console.firebase.google.com/

- **Authentication**: View users, providers
- **Firestore**: Browse database
- **Functions**: Monitor executions
- **Hosting**: Manage deployments

## 🔒 Security Best Practices

1. **Update Firestore rules** for production
2. **Enable App Check** to prevent abuse
3. **Set up budget alerts** in Google Cloud
4. **Use service accounts** for admin tasks
5. **Rotate API keys** regularly

## 📚 Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions](https://firebase.google.com/docs/functions)
