# Testing Checklist

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Build succeeds
- [ ] Run `npm test` - All tests pass
- [ ] Code formatted with Prettier

### Functionality
- [ ] Application loads without errors
- [ ] Firebase authentication works
- [ ] Firestore read/write operations work
- [ ] All routes are accessible
- [ ] Error handling works correctly

### Performance
- [ ] Bundle size is acceptable
- [ ] Page load time < 3 seconds
- [ ] No console errors or warnings

### Security
- [ ] Environment variables properly configured
- [ ] Firebase rules are set correctly
- [ ] No sensitive data in code
- [ ] HTTPS enabled in production

### Browser Testing
- [ ] Chrome - Latest version
- [ ] Firefox - Latest version
- [ ] Safari - Latest version
- [ ] Edge - Latest version
- [ ] Mobile browsers (iOS/Android)

### Deployment
- [ ] `.env` configured for production
- [ ] Firebase project selected correctly
- [ ] Build output directory is correct
- [ ] Firebase hosting rules configured

## Test Commands

```bash
# Lint check
npm run lint

# Build check
npm run build

# Run tests
npm test

# Preview production build
npm run preview
```
