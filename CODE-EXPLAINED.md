# 💻 Code Explained - Line by Line

**Understanding Every Function**: This guide explains what each piece of code does and why.

---

## 📑 Table of Contents

1. [State Management](#state-management)
2. [Loading Animation](#loading-animation)
3. [Cursor Trail](#cursor-trail)
4. [Weather Integration](#weather-integration)
5. [Time System](#time-system)
6. [Interactive Effects](#interactive-effects)
7. [Game Logic](#game-logic)

---

## 🗂️ State Management

### The State Object

```javascript
const state = {
    currentScene: 'start',      // Which story scene we're on
    theme: 'night',             // Visual theme (night/day/sunset)
    mood: 'romantic',           // Mood setting (romantic/playful/nostalgic)
    font: 'handwritten',        // Font style (handwritten/elegant/modern)
    textSize: 'normal',         // Text size (normal/large/small)
    visitCount: 0,              // How many times user visited
    lastVisit: null,            // When they last visited
    progress: {}                // Which scenes they've seen
};
```

**Why use a state object?**
- **Single source of truth**: All app data in one place
- **Easy to debug**: Just console.log(state)
- **Easy to persist**: Save/load from localStorage
- **Predictable**: Know exactly what data exists

### Save State Function

```javascript
function saveState() {
    // Convert JavaScript object to JSON string
    // Why? localStorage only stores strings
    const stateJSON = JSON.stringify(state);
    
    // Save to browser's localStorage
    // Key: 'valentineState', Value: JSON string
    localStorage.setItem('valentineState', stateJSON);
}
```

**What is JSON.stringify()?**
- Converts JavaScript object to string
- Example: `{name: "John"}` → `'{"name":"John"}'`
- Required because localStorage only stores strings

**What is localStorage?**
- Browser storage that persists after closing
- Stores key-value pairs
- Maximum ~5-10MB per domain
- Synchronous (blocks code execution)

### Load State Function

```javascript
function loadState() {
    // Get saved state from localStorage
    const saved = localStorage.getItem('valentineState');
    
    // Check if anything was saved
    if (saved) {
        // Parse JSON string back to JavaScript object
        const savedState = JSON.parse(saved);
        
        // Merge saved state with current state
        // Why Object.assign? Keeps default values for new properties
        Object.assign(state, savedState);
        
        // Increment visit counter
        state.visitCount++;
    }
    
    // Update last visit time (ISO 8601 format)
    state.lastVisit = new Date().toISOString();
    
    // Save updated state
    saveState();
}
```

**What is Object.assign()?**
```javascript
// Example:
const defaults = { theme: 'night', mood: 'romantic', newFeature: true };
const saved = { theme: 'day' };

Object.assign(defaults, saved);
// Result: { theme: 'day', mood: 'romantic', newFeature: true }
//         ↑ from saved    ↑ kept from defaults
```

**Why use Object.assign()?**
- Merges objects without overwriting everything
- Keeps default values for new properties
- Handles version updates gracefully

---

## 🎬 Loading Animation

### Initialize Loading

```javascript
function initLoading() {
    // Get DOM elements
    const loader = document.getElementById('heartLoader');
    const progress = document.getElementById('progressFill');
    
    // Array of heart emojis to cycle through
    // \u2764\uFE0F = ❤️ (Unicode escape sequence)
    // \u{1F495} = 💕 (ES6 Unicode escape)
    const hearts = ['\u2764\uFE0F', '\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F498}', '\u{1F49D}'];
    
    let idx = 0;        // Current heart index
    let percent = 0;    // Progress percentage
```

**Why use Unicode escapes?**
- Ensures emojis work in all environments
- Some editors don't display emojis correctly
- More reliable than copy-pasting emojis

### Heart Animation Loop

```javascript
    // Change heart every 300ms
    const heartInterval = setInterval(() => {
        // Cycle through hearts array
        // % (modulo) wraps around: 0,1,2,3,4,5,0,1,2...
        loader.textContent = hearts[idx % hearts.length];
        idx++;
    }, 300);
```

**What is setInterval()?**
- Runs function repeatedly at specified interval
- Syntax: `setInterval(function, milliseconds)`
- Returns interval ID (used to stop it later)

**What is modulo (%) operator?**
```javascript
// Example:
0 % 6 = 0  // 0 ÷ 6 = 0 remainder 0
1 % 6 = 1  // 1 ÷ 6 = 0 remainder 1
5 % 6 = 5  // 5 ÷ 6 = 0 remainder 5
6 % 6 = 0  // 6 ÷ 6 = 1 remainder 0 (wraps around!)
7 % 6 = 1  // 7 ÷ 6 = 1 remainder 1
```

### Progress Bar Animation

```javascript
    // Update progress bar
    const progressInterval = setInterval(() => {
        // Increase by random amount (0-15%)
        // Why random? Looks more natural
        percent += Math.random() * 15;
        
        // Check if complete
        if (percent >= 100) {
            percent = 100;  // Cap at 100%
            
            // Stop both intervals
            clearInterval(progressInterval);
            clearInterval(heartInterval);
            
            // Wait 500ms, then hide loading screen
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                initGame();  // Start the game
            }, 500);
        }
        
        // Update progress bar width
        progress.style.width = percent + '%';
    }, 200);  // Run every 200ms
}
```

**What is Math.random()?**
- Returns random number between 0 and 1
- Example: 0.234, 0.891, 0.045
- Multiply to get range: `Math.random() * 15` = 0 to 15

**What is clearInterval()?**
- Stops a setInterval loop
- Requires interval ID from setInterval
- Important to prevent memory leaks

**What is setTimeout()?**
- Runs function once after delay
- Syntax: `setTimeout(function, milliseconds)`
- Different from setInterval (which repeats)

---

## 🎨 Cursor Trail

### Initialize Cursor Trail

```javascript
function initCursorTrail() {
    // Get canvas element
    const canvas = document.getElementById('cursorCanvas');
    
    // Get 2D drawing context
    // Think of it as a "pen" to draw on canvas
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
```

**What is Canvas?**
- HTML element for drawing graphics
- Uses JavaScript to draw shapes, images, animations
- Better performance than DOM for animations

**What is getContext('2d')?**
- Returns drawing API for canvas
- '2d' = 2D graphics (vs '3d' for WebGL)
- Provides methods like fillRect(), arc(), etc.

### Particle System

```javascript
    // Array to store all particles
    const particles = [];
    
    // Colors for particles
    const colors = ['#ff6b6b', '#ff8787', '#ffa5a5', '#ffb6c1'];
```

**Why use an array?**
- Store multiple particles
- Easy to loop through
- Easy to add/remove particles

### Window Resize Handler

```javascript
    // Update canvas size when window resizes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
```

**Why resize canvas?**
- Canvas doesn't auto-resize
- Must manually update width/height
- Otherwise particles appear in wrong positions

### Mouse Move Handler

```javascript
    // Create particles on mouse move
    document.addEventListener('mousemove', (e) => {
        // Create 3 particles per mouse move
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: e.clientX,                           // Mouse X position
                y: e.clientY,                           // Mouse Y position
                size: Math.random() * 3 + 1,            // Random size 1-4px
                speedX: (Math.random() - 0.5) * 2,      // Random X velocity -1 to 1
                speedY: (Math.random() - 0.5) * 2,      // Random Y velocity -1 to 1
                color: colors[Math.floor(Math.random() * colors.length)],  // Random color
                life: 1                                 // Opacity (1 = fully visible)
            });
        }
    });
```

**What is e.clientX and e.clientY?**
- Mouse position relative to viewport
- clientX = horizontal position
- clientY = vertical position

**Why (Math.random() - 0.5) * 2?**
```javascript
// Math.random() gives 0 to 1
// Subtract 0.5 gives -0.5 to 0.5
// Multiply by 2 gives -1 to 1
// Result: particles move in all directions
```

**What is Math.floor()?**
- Rounds down to nearest integer
- Example: Math.floor(3.7) = 3
- Used to get array index

### Animation Loop

```javascript
    function animate() {
        // Clear entire canvas
        // Like erasing a whiteboard
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Loop through particles backwards
        // Why backwards? So we can remove items safely
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Update particle position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Fade out (decrease opacity)
            p.life -= 0.02;
            
            // Shrink particle
            p.size *= 0.98;
            
            // Remove dead particles
            if (p.life <= 0 || p.size < 0.5) {
                particles.splice(i, 1);  // Remove from array
                continue;                 // Skip to next particle
            }
            
            // Set opacity
            ctx.globalAlpha = p.life;
            
            // Set color
            ctx.fillStyle = p.color;
            
            // Draw circle
            ctx.beginPath();                              // Start new path
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);  // Draw circle
            ctx.fill();                                   // Fill with color
        }
        
        // Reset opacity
        ctx.globalAlpha = 1;
        
        // Request next frame
        // Browser calls animate() again before next repaint
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();
}
```

**Why loop backwards?**
```javascript
// ❌ Forward loop (buggy when removing items)
for (let i = 0; i < array.length; i++) {
    if (condition) {
        array.splice(i, 1);  // Removes item
        // Now i points to next item, but loop increments i
        // Result: skips an item!
    }
}

// ✅ Backward loop (safe when removing items)
for (let i = array.length - 1; i >= 0; i--) {
    if (condition) {
        array.splice(i, 1);  // Removes item
        // No problem! We're going backwards
    }
}
```

**What is requestAnimationFrame()?**
- Browser API for smooth animations
- Calls function before next repaint (~60fps)
- Pauses when tab is inactive (saves battery)
- Better than setInterval for animations

**What is ctx.arc()?**
- Draws a circle or arc
- Syntax: `arc(x, y, radius, startAngle, endAngle)`
- `Math.PI * 2` = full circle (360 degrees)

---

## 🌦️ Weather Integration

### Weather Configuration

```javascript
const WEATHER_CONFIG = {
    city: 'Bangalore',
    location: 'Manyata Tech Park',
    lat: 13.0358,  // Latitude (North-South position)
    lon: 77.6194   // Longitude (East-West position)
};
```

**What are coordinates?**
- Latitude: -90 (South Pole) to +90 (North Pole)
- Longitude: -180 (West) to +180 (East)
- Bangalore: 13°N, 77°E

### Weather Data Object

```javascript
let weatherData = {
    temp: null,           // Temperature in Celsius
    condition: 'clear',   // Weather condition
    description: '',      // Detailed description
    lastUpdated: null     // When data was fetched
};
```

**Why use null?**
- Indicates "no value yet"
- Different from undefined (never set)
- Different from 0 (actual value)

### Fetch Weather Function

```javascript
async function fetchBengaluruWeather() {
    try {
        // Build API URL
        const url = `https://api.open-meteo.com/v1/forecast?` +
                    `latitude=${WEATHER_CONFIG.lat}&` +
                    `longitude=${WEATHER_CONFIG.lon}&` +
                    `current=temperature_2m,weather_code&` +
                    `timezone=Asia/Kolkata`;
```

**What is async?**
- Marks function as asynchronous
- Allows use of await inside
- Returns a Promise automatically

**What is template literal?**
```javascript
// Old way (string concatenation)
const url = 'https://api.com?lat=' + lat + '&lon=' + lon;

// New way (template literal)
const url = `https://api.com?lat=${lat}&lon=${lon}`;
```

**Why use template literals?**
- Easier to read
- Can span multiple lines
- Can embed expressions with ${}

### API Call

```javascript
        // Make HTTP request
        const response = await fetch(url);
```

**What is await?**
- Pauses function until Promise resolves
- Only works in async functions
- Makes async code look synchronous

**What is fetch()?**
- Browser API for HTTP requests
- Returns a Promise
- Modern replacement for XMLHttpRequest

### Response Handling

```javascript
        // Parse JSON response
        const data = await response.json();
```

**What is response.json()?**
- Parses response body as JSON
- Returns a Promise
- Converts JSON string to JavaScript object

### Data Extraction

```javascript
        // Check if data exists
        if (data && data.current) {
            // Round temperature to nearest integer
            weatherData.temp = Math.round(data.current.temperature_2m);
            
            // Convert weather code to condition
            weatherData.condition = getWeatherCondition(data.current.weather_code);
            
            // Save update time
            weatherData.lastUpdated = new Date();
            
            // Update background
            updateBackgroundForWeather(weatherData.condition);
            
            return weatherData;
        }
```

**What is Math.round()?**
- Rounds to nearest integer
- Example: Math.round(24.7) = 25
- Example: Math.round(24.3) = 24

### Error Handling

```javascript
    } catch (error) {
        // Log error (for debugging)
        console.log('Weather fetch failed, using default');
        
        // Use fallback values
        // Why? So site works even if API fails
        weatherData.temp = 25;
        weatherData.condition = 'clear';
    }
    
    return weatherData;
}
```

**Why catch errors?**
- Prevents app from crashing
- Provides fallback behavior
- Better user experience
- Easier debugging

### Weather Code Interpretation

```javascript
function getWeatherCondition(code) {
    // WMO Weather interpretation codes
    // Check in order of priority
    
    if (code === 0) return 'clear';           // Clear sky
    if (code >= 95) return 'stormy';          // Thunderstorm
    if (code >= 71 && code <= 77) return 'snowy';  // Snow
    if (code <= 3) return 'cloudy';           // Cloudy
    if (code <= 67 || code >= 80) return 'rainy';  // Rain
    
    return 'cloudy';  // Default fallback
}
```

**Why this order?**
- Check specific conditions first (stormy, snowy)
- Then general conditions (cloudy, rainy)
- Default at end as safety net

**WMO Code Ranges**:
- 0: Clear
- 1-3: Cloudy
- 4-67: Rain/Drizzle
- 71-77: Snow
- 80-94: Rain showers
- 95+: Thunderstorm

---

## 🕐 Time System

### Get IST Time

```javascript
function getISTTime() {
    // Get current time
    const now = new Date();
    
    // Convert to IST (Indian Standard Time)
    const istTime = new Date(
        now.toLocaleString('en-US', { 
            timeZone: 'Asia/Kolkata' 
        })
    );
```

**What is new Date()?**
- Creates Date object with current time
- Stores time in milliseconds since Jan 1, 1970
- Has methods to get/set time components

**What is toLocaleString()?**
- Converts date to string in specific timezone
- 'en-US' = English (United States) format
- 'Asia/Kolkata' = IST timezone

### Format Time

```javascript
    // Get hours (0-23)
    const hours = istTime.getHours();
    
    // Get minutes with leading zero
    // Example: 5 → "05", 15 → "15"
    const minutes = istTime.getMinutes().toString().padStart(2, '0');
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    // 0 → 12, 1 → 1, 12 → 12, 13 → 1, etc.
    const displayHours = hours % 12 || 12;
    
    // Return formatted time
    return `${displayHours}:${minutes} ${ampm} IST`;
}
```

**What is padStart()?**
- Adds characters to start of string
- Syntax: `string.padStart(length, padString)`
- Example: `"5".padStart(2, '0')` = "05"

**Why hours % 12 || 12?**
```javascript
// Without || 12:
0 % 12 = 0   // Midnight would show as 0:00 AM ❌

// With || 12:
0 % 12 || 12 = 12  // Midnight shows as 12:00 AM ✅
```

**What is || (OR) operator?**
- Returns first truthy value
- 0 is falsy, so returns 12
- Any other number is truthy, so returns that number

### Time-Based Greeting

```javascript
function getTimeBasedGreeting() {
    const now = new Date();
    const istTime = new Date(
        now.toLocaleString('en-US', { 
            timeZone: 'Asia/Kolkata' 
        })
    );
    const hours = istTime.getHours();
    
    // Return greeting based on time
    if (hours < 12) return "🌅 Good morning";
    if (hours < 17) return "☀️ Good afternoon";
    if (hours < 21) return "🌆 Good evening";
    return "🌙 Good night";
}
```

**Time Ranges**:
- 00:00-11:59: Morning
- 12:00-16:59: Afternoon
- 17:00-20:59: Evening
- 21:00-23:59: Night

---

## 🎮 Game Logic

### Game Story Structure

```javascript
const gameStory = {
    start: {
        title: "A Message For You",
        content: "Hey Bubu... ❤️\n\nIn a world full of ordinary moments...",
        choices: [
            { text: "Yes, Bubu!", next: "howwemet" }
        ]
    },
    howwemet: {
        title: "Where It All Began",
        content: "A badminton court...",
        choices: [
            { text: "What happened next?", next: "friends" }
        ]
    }
    // ... more scenes
};
```

**Why this structure?**
- Easy to add/edit scenes
- Clear relationships between scenes
- Self-documenting code
- Easy to save progress

### Render Scene Function

```javascript
function renderScene(key) {
    // Get scene data
    const scene = gameStory[key];
    
    // Get DOM elements
    const titleEl = document.getElementById('title');
    const contentEl = document.getElementById('content');
    const choicesEl = document.getElementById('choices');
```

**What is gameStory[key]?**
- Bracket notation for object access
- key is a variable (e.g., "start")
- Same as gameStory.start but dynamic

### Save Progress

```javascript
    // Save progress
    state.currentScene = key;
    state.progress[key] = new Date().toISOString();
    saveState();
```

**Why save progress?**
- User can continue where they left off
- Track which scenes they've seen
- Personalize experience based on history

### Typewriter Effect

```javascript
function typeWriter(el, text, speed = 25) {
    // Clear element
    el.textContent = '';
    
    // Start invisible
    el.style.opacity = '0';
    
    let i = 0;
    
    // Fade in element
    setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease-out';
        el.style.opacity = '1';
    }, 100);
    
    // Type each character
    (function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);  // Recursive call
        }
    })();
}
```

**What is recursion?**
- Function calling itself
- Must have base case (stopping condition)
- Here: stops when i >= text.length

**Why IIFE (Immediately Invoked Function Expression)?**
```javascript
(function type() {
    // Function code
})();  // () immediately calls it
```
- Creates private scope
- Executes immediately
- Can call itself recursively

---

## 🎯 Key Takeaways

### 1. Separation of Concerns
- HTML = Structure
- CSS = Presentation
- JavaScript = Behavior

### 2. Error Handling
- Always use try-catch for async operations
- Provide fallback values
- Never let errors crash the app

### 3. Performance
- Use requestAnimationFrame for animations
- Debounce expensive operations
- Cache DOM queries

### 4. User Experience
- Loading states
- Smooth transitions
- Responsive design
- Accessibility

### 5. Code Organization
- Group related functions
- Use meaningful names
- Comment complex logic
- Keep functions small

---

**Continue learning**: See LEARNING-GUIDE.md for more tutorials!
