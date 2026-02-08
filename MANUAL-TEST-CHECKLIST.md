# Manual Testing Checklist
## Valentine's Website - Cross-Platform Validation

---

## 🖥️ DESKTOP TESTING (Chrome, Firefox, Safari, Edge)

### Initial Load
- [ ] Loading screen appears with "Preparing something special..."
- [ ] Hearts cycle through 6 different emojis (❤️ 💕 💖 💗 💘 💝)
- [ ] Progress bar fills smoothly
- [ ] No emoji corruption (no ? or � characters)
- [ ] Transition to main screen is smooth

### Visual Elements
- [ ] Background has dark theme with red glow
- [ ] Glassmorphic card displays with blur effect
- [ ] Christmas lights animate at top
- [ ] Floating emojis drift upward (flowers, food, badminton, hearts)
- [ ] Particles float in background
- [ ] Scanline effect visible (subtle)
- [ ] All text is readable

### Interactive Features
- [ ] Cursor trail follows mouse (sparkles)
- [ ] Clicking anywhere creates heart burst
- [ ] Card tilts slightly when mouse moves over it
- [ ] Card resets when mouse leaves
- [ ] Parallax scrolling works (background moves slower)
- [ ] Typewriter effect on content text
- [ ] Buttons fade in with stagger effect

### Control Buttons (Top Right)
- [ ] Theme button cycles: Night 🌙 → Day ☀️ → Sunset 🌅
- [ ] Day theme: Light background, warm colors
- [ ] Sunset theme: Dark with orange/red glow
- [ ] Night theme: Dark with red glow (default)
- [ ] Mood button cycles: Romantic 💕 → Playful 🎉 → Nostalgic 🌙
- [ ] Font button cycles: Handwritten ✍️ → Elegant 🎭 → Modern 🎯
- [ ] Font notification appears and fades
- [ ] Text size button cycles: Normal A → Large A+ → Small A-
- [ ] All buttons have hover effects (glow, lift)
- [ ] All buttons have smooth transitions

### Story Navigation
- [ ] Start scene shows daily note or random love note
- [ ] "Yes, Bubu!" button works
- [ ] Badminton origin story flows correctly (4 chapters)
- [ ] All choice buttons work
- [ ] Multiple story paths accessible
- [ ] Can reach final scene
- [ ] "Play again" returns to start
- [ ] Progress saves (refresh page, should resume)

### Responsive Behavior
- [ ] Resize window to 1920px: Everything scales properly
- [ ] Resize to 1366px: Layout adjusts
- [ ] Resize to 1024px: Tablet view works
- [ ] Resize to 768px: Mobile controls appear
- [ ] Resize to 480px: Small mobile view works
- [ ] Resize to 360px: Minimum width works
- [ ] No horizontal scrolling at any size
- [ ] All text wraps properly

---

## 📱 MOBILE TESTING (iOS Safari, Chrome Android)

### iPhone Testing (Safari)
- [ ] Loading animation works
- [ ] All emojis display correctly
- [ ] Touch interactions work (tap buttons)
- [ ] Cursor trail disabled (performance)
- [ ] Tap creates heart burst
- [ ] Shake phone triggers heart explosion
- [ ] Control buttons accessible (top right)
- [ ] All themes work
- [ ] All fonts work
- [ ] Text size changes work
- [ ] Story navigation smooth
- [ ] Scrolling smooth
- [ ] No layout issues
- [ ] Landscape mode works
- [ ] Portrait mode works

### Android Testing (Chrome)
- [ ] Loading animation works
- [ ] All emojis display correctly
- [ ] Touch interactions work
- [ ] Tap creates heart burst
- [ ] Shake phone triggers heart explosion
- [ ] Control buttons work
- [ ] All features functional
- [ ] Performance smooth
- [ ] No crashes or freezes

### Tablet Testing (iPad)
- [ ] Larger screen layout works
- [ ] Touch interactions work
- [ ] All features functional
- [ ] Landscape and portrait both work

---

## 🌐 BROWSER-SPECIFIC TESTS

### Chrome/Edge (Chromium)
- [ ] Backdrop-filter works (glassmorphism)
- [ ] All animations smooth
- [ ] Canvas cursor trail works
- [ ] DevTools shows no errors
- [ ] Performance tab shows 60fps

### Firefox
- [ ] Backdrop-filter works
- [ ] All features functional
- [ ] No console errors
- [ ] Performance good

### Safari (macOS/iOS)
- [ ] -webkit-backdrop-filter works
- [ ] All emojis render correctly
- [ ] Touch events work (iOS)
- [ ] No webkit-specific issues
- [ ] Fonts load correctly

---

## 🎨 THEME TESTING

### Night Theme (Default)
- [ ] Dark background (#0a0a0a)
- [ ] Red glow effects
- [ ] Content readable
- [ ] Buttons visible

### Day Theme
- [ ] Light background (#fef5e7)
- [ ] Warm sunny colors
- [ ] Content readable (dark text)
- [ ] Buttons visible

### Sunset Theme
- [ ] Dark background (#1a0a0a)
- [ ] Orange/red glow
- [ ] Content readable
- [ ] Romantic atmosphere

---

## 🔤 FONT TESTING

### Handwritten + Sans (Default)
- [ ] Title: Shadows Into Light
- [ ] Body: Caveat
- [ ] Buttons: Montserrat
- [ ] All fonts load
- [ ] Readable at all sizes

### Script + Serif (Elegant)
- [ ] Title: Dancing Script
- [ ] Body: Playfair Display (italic)
- [ ] Buttons: Playfair Display
- [ ] Elegant appearance
- [ ] Readable

### Bold + Light (Modern)
- [ ] Title: Bebas Neue (uppercase feel)
- [ ] Body: Raleway (light weight)
- [ ] Buttons: Raleway
- [ ] Modern clean look
- [ ] Readable

---

## 💾 PERSISTENCE TESTING

### LocalStorage
- [ ] Complete story to chapter 5
- [ ] Refresh page
- [ ] Should resume at chapter 5
- [ ] Change theme to Day
- [ ] Refresh page
- [ ] Theme should still be Day
- [ ] Change font to Elegant
- [ ] Refresh page
- [ ] Font should still be Elegant
- [ ] Change text size to Large
- [ ] Refresh page
- [ ] Text size should still be Large

### Multiple Tabs
- [ ] Open website in two tabs
- [ ] Change theme in tab 1
- [ ] Refresh tab 2
- [ ] Tab 2 should have new theme

---

## 🎯 EDGE CASE TESTING

### Rapid Interactions
- [ ] Click buttons rapidly (no errors)
- [ ] Toggle theme rapidly (smooth)
- [ ] Toggle font rapidly (smooth)
- [ ] Click story choices rapidly (no double-trigger)

### Network Issues
- [ ] Disable network after load
- [ ] Website still works (cached)
- [ ] Fonts fallback if not loaded
- [ ] No crashes

### Browser Features Disabled
- [ ] Disable JavaScript: Website shows message
- [ ] Disable LocalStorage: Website works (no save)
- [ ] Disable cookies: Website works (no cookies used)

### Extreme Viewport Sizes
- [ ] 320px width: Still functional
- [ ] 4K display (2560px): Scales properly
- [ ] Very tall viewport: Scrolling works
- [ ] Very short viewport (landscape): Adapts

---

## 🔍 EMOJI VERIFICATION

### Loading Animation
- [ ] ❤️ Red Heart appears
- [ ] 💕 Two Hearts appears
- [ ] 💖 Sparkling Heart appears
- [ ] 💗 Growing Heart appears
- [ ] 💘 Heart with Arrow appears
- [ ] 💝 Heart with Ribbon appears
- [ ] All 6 cycle smoothly
- [ ] No corruption or missing emojis

### Floating Emojis
- [ ] 🌹 Rose visible
- [ ] 🌸 Cherry Blossom visible
- [ ] 🍫 Chocolate visible
- [ ] 🍝 Pasta visible
- [ ] 🍛 Curry visible
- [ ] 🏸 Badminton visible (multiple)
- [ ] ❤️ Hearts visible
- [ ] All float upward smoothly

### Story Content
- [ ] All emojis in story text display
- [ ] No ? or � characters anywhere
- [ ] Emojis don't break layout

---

## ⚡ PERFORMANCE TESTING

### Desktop Performance
- [ ] Page loads in < 2 seconds
- [ ] Animations run at 60fps
- [ ] No lag when scrolling
- [ ] No lag when hovering
- [ ] Memory usage reasonable (< 100MB)
- [ ] CPU usage reasonable (< 20%)

### Mobile Performance
- [ ] Page loads in < 3 seconds on 4G
- [ ] Animations smooth (30-60fps)
- [ ] No lag when scrolling
- [ ] No lag when tapping
- [ ] Battery drain reasonable
- [ ] No device overheating

---

## ♿ ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] Tab key moves through buttons
- [ ] Enter/Space activates buttons
- [ ] Focus visible on buttons
- [ ] Can navigate entire story with keyboard

### Screen Reader
- [ ] Title announced correctly
- [ ] Content announced correctly
- [ ] Buttons have labels
- [ ] Story flow makes sense

### Color Contrast
- [ ] Text readable on all themes
- [ ] Buttons have sufficient contrast
- [ ] WCAG AA compliance

---

## 🐛 BUG CHECKLIST

### Known Issues to Verify Fixed
- [x] Emoji corruption in loading animation (FIXED)
- [x] UTF-8 encoding issues (FIXED)
- [ ] Any console errors?
- [ ] Any visual glitches?
- [ ] Any broken features?

---

## ✅ FINAL SIGN-OFF

### Desktop Browsers
- [ ] Chrome: All tests passed
- [ ] Firefox: All tests passed
- [ ] Safari: All tests passed
- [ ] Edge: All tests passed

### Mobile Devices
- [ ] iPhone (Safari): All tests passed
- [ ] Android (Chrome): All tests passed
- [ ] iPad: All tests passed

### Critical Features
- [ ] Loading animation: Working
- [ ] Emoji display: Perfect
- [ ] Story navigation: Working
- [ ] Theme toggle: Working
- [ ] Font toggle: Working
- [ ] Save progress: Working
- [ ] Responsive design: Working
- [ ] Performance: Excellent

### Production Ready?
- [ ] All tests passed
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Cross-browser compatible
- [ ] Mobile-friendly
- [ ] Accessible

---

## 📝 TESTING NOTES

**Tester Name:** _______________
**Date:** _______________
**Browser/Device:** _______________
**Issues Found:** _______________

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] All manual tests completed
- [ ] All automated tests passed
- [ ] No console errors
- [ ] No visual bugs
- [ ] Performance optimized
- [ ] Emojis verified on target devices
- [ ] Ready to share with Aradhana! 💕
