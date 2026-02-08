/* ========================================
   VALENTINE'S WEBSITE - ENHANCED VERSION
   Features: Loading, Themes, Parallax, Cursor Trail,
   Click Hearts, Tilt, Daily Notes, Weather, Save Progress
   ======================================== */

// === STATE MANAGEMENT ===
const state = {
    currentScene: 'start',
    theme: 'night',
    mood: 'romantic',
    font: 'handwritten',
    textSize: 'normal',
    visitCount: 0,
    lastVisit: null,
    progress: {}
};

// === STORAGE ===
function saveState() {
    localStorage.setItem('valentineState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('valentineState');
    if (saved) {
        Object.assign(state, JSON.parse(saved));
        state.visitCount++;
    }
    state.lastVisit = new Date().toISOString();
    saveState();
}

// === LOADING ANIMATION ===
function initLoading() {
    const loader = document.getElementById('heartLoader');
    const progress = document.getElementById('progressFill');
    const hearts = ['\u2764\uFE0F', '\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F498}', '\u{1F49D}'];
    let idx = 0;
    let percent = 0;

    const heartInterval = setInterval(() => {
        loader.textContent = hearts[idx % hearts.length];
        idx++;
    }, 300);

    const progressInterval = setInterval(() => {
        percent += Math.random() * 15;
        if (percent >= 100) {
            percent = 100;
            clearInterval(progressInterval);
            clearInterval(heartInterval);
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                initGame();
            }, 500);
        }
        progress.style.width = percent + '%';
    }, 200);
}

// === CURSOR TRAIL ===
function initCursorTrail() {
    const canvas = document.getElementById('cursorCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff6b6b', '#ff8787', '#ffa5a5', '#ffb6c1'];

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.98;

            if (p.life <= 0 || p.size < 0.5) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

// === CLICK HEARTS ===
function initClickHearts() {
    const container = document.getElementById('clickHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '✨'];

    document.addEventListener('click', (e) => {
        const count = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = 50 + Math.random() * 50;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    });
}

// === PARALLAX SCROLLING ===
function initParallax() {
    const layers = document.querySelectorAll('[data-speed]');
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed);
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

// === TILT EFFECT ===
function initTilt() {
    const card = document.getElementById('gameScreen');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// === SHAKE TO EXPLODE HEARTS (Mobile) ===
function initShakeDetection() {
    if (!window.DeviceMotionEvent) return;

    let lastX, lastY, lastZ;
    let shakeThreshold = 15;

    window.addEventListener('devicemotion', (e) => {
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;

        const x = acc.x || 0;
        const y = acc.y || 0;
        const z = acc.z || 0;

        if (lastX !== undefined) {
            const deltaX = Math.abs(x - lastX);
            const deltaY = Math.abs(y - lastY);
            const deltaZ = Math.abs(z - lastZ);

            if (deltaX + deltaY + deltaZ > shakeThreshold) {
                explodeHearts();
            }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
    });
}

function explodeHearts() {
    const container = document.getElementById('clickHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '✨', '🌹', '💐'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 100;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
}

// === THEME & MOOD CONTROLS ===
function initControls() {
    const themeBtn = document.getElementById('themeToggle');
    const moodBtn = document.getElementById('moodToggle');
    const fontBtn = document.getElementById('fontToggle');
    const textBtn = document.getElementById('textSizeToggle');

    // Theme toggle
    const themes = ['night', 'day', 'sunset'];
    const themeIcons = { night: '🌙', day: '☀️', sunset: '🌅' };
    
    themeBtn.addEventListener('click', () => {
        const idx = themes.indexOf(state.theme);
        state.theme = themes[(idx + 1) % themes.length];
        document.body.dataset.theme = state.theme;
        themeBtn.querySelector('.btn-icon').textContent = themeIcons[state.theme];
        saveState();
    });

    // Mood toggle
    const moods = ['romantic', 'playful', 'nostalgic'];
    const moodIcons = { romantic: '💕', playful: '🎉', nostalgic: '🌙' };
    
    moodBtn.addEventListener('click', () => {
        const idx = moods.indexOf(state.mood);
        state.mood = moods[(idx + 1) % moods.length];
        document.body.dataset.mood = state.mood;
        moodBtn.querySelector('.btn-icon').textContent = moodIcons[state.mood];
        saveState();
    });

    // Font toggle
    const fonts = ['handwritten', 'elegant', 'modern'];
    const fontIcons = { handwritten: '✍️', elegant: '🎭', modern: '🎯' };
    const fontNames = { 
        handwritten: 'Handwritten + Sans', 
        elegant: 'Script + Serif', 
        modern: 'Bold + Light' 
    };
    
    fontBtn.addEventListener('click', () => {
        const idx = fonts.indexOf(state.font);
        state.font = fonts[(idx + 1) % fonts.length];
        document.body.dataset.font = state.font;
        fontBtn.querySelector('.btn-icon').textContent = fontIcons[state.font];
        
        // Show notification
        showNotification(`Font: ${fontNames[state.font]}`);
        saveState();
    });

    // Text size toggle
    const sizes = ['normal', 'large', 'small'];
    const sizeIcons = { normal: 'A', large: 'A+', small: 'A-' };
    
    textBtn.addEventListener('click', () => {
        const idx = sizes.indexOf(state.textSize);
        state.textSize = sizes[(idx + 1) % sizes.length];
        document.body.dataset.textSize = state.textSize;
        textBtn.querySelector('.btn-icon').textContent = sizeIcons[state.textSize];
        saveState();
    });

    // Apply saved state
    document.body.dataset.theme = state.theme;
    document.body.dataset.mood = state.mood;
    document.body.dataset.font = state.font;
    document.body.dataset.textSize = state.textSize;
    themeBtn.querySelector('.btn-icon').textContent = themeIcons[state.theme];
    moodBtn.querySelector('.btn-icon').textContent = moodIcons[state.mood];
    fontBtn.querySelector('.btn-icon').textContent = fontIcons[state.font];
    textBtn.querySelector('.btn-icon').textContent = sizeIcons[state.textSize];
}

// === NOTIFICATION SYSTEM ===
function showNotification(message) {
    const existing = document.querySelector('.font-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'font-notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(180, 50, 50, 0.9);
        backdrop-filter: blur(10px);
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-family: var(--font-button);
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '1';
        notif.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// === DAILY NOTES ===
function getDailyNote() {
    const day = new Date().getDay();
    const notes = {
        0: "☀️ Sunday vibes: Remember our lazy Sunday mornings together?",
        1: "💪 Monday motivation: You make every week worth starting, Bubu!",
        2: "🏸 Tuesday: Perfect day for a badminton match, don't you think?",
        3: "💕 Wednesday: Halfway through the week, thinking of you!",
        4: "✨ Thursday: Almost the weekend... almost time to see you!",
        5: "🎉 Friday feeling: The best days are the ones with you!",
        6: "❤️ Saturday: Our day! Hope we're making memories today!"
    };
    return notes[day];
}

// === WEATHER-BASED MESSAGES ===
async function getWeatherMessage() {
    // Simulated weather (in production, use real weather API)
    const conditions = ['sunny', 'rainy', 'cloudy', 'clear'];
    const weather = conditions[Math.floor(Math.random() * conditions.length)];
    
    const messages = {
        rainy: "🌧️ It's raining... remember that rainy day match when we got soaked? Best game ever!",
        sunny: "☀️ Sunny day! Perfect weather for our next badminton session, Bubu!",
        cloudy: "☁️ Cloudy skies, but you're my sunshine no matter what!",
        clear: "✨ Clear skies tonight... just like how clear my feelings are for you!"
    };
    
    return messages[weather];
}

// === RANDOM LOVE NOTES ===
function getRandomLoveNote() {
    const notes = [
        "💝 Fun fact: You make my heart do that thing where it forgets how to beat normally.",
        "🌹 Random thought: If I could rearrange the alphabet, I'd put U and I together... but we're already perfect!",
        "✨ Just so you know: You're the reason I believe in magic.",
        "💕 Reminder: You're not just my Valentine, you're my every day.",
        "🏸 Court confession: I fell for you before I fell on the court (and I fell a lot!).",
        "❤️ Truth bomb: Every love song makes me think of you.",
        "🦋 Sweet secret: Butterflies still happen every time I see you.",
        "💖 Daily dose: You + Me = Perfect equation."
    ];
    return notes[Math.floor(Math.random() * notes.length)];
}

// === ATMOSPHERE GENERATORS ===
function createParticles() {
    const c = document.getElementById('particles');
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (6 + Math.random() * 10) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        const s = (2 + Math.random() * 3) + 'px';
        p.style.width = s;
        p.style.height = s;
        c.appendChild(p);
    }
}

function createChristmasLights() {
    const w = document.getElementById('christmasLights');
    const colors = ['red', 'yellow', 'green', 'blue'];
    const n = Math.max(12, Math.floor(window.innerWidth / 50));
    for (let i = 0; i < n; i++) {
        const b = document.createElement('div');
        b.className = 'bulb ' + colors[i % 4];
        b.style.animationDelay = (Math.random() * 3) + 's';
        w.appendChild(b);
    }
}

function createFloatingEmojis() {
    const c = document.getElementById('floatingEmojis');
    const emojis = [
        '🌹','🌸','🌺','🌷','💐','🌻','🌼','💮',
        '🍫','🍬','🍭','🍩',
        '🍝','🍜','🍗','🍛',
        '🏸','🏸','🏸',
        '❤️','💕','💖','💗','💘','💝','✨','🦋'
    ];
    for (let i = 0; i < 35; i++) {
        const e = document.createElement('div');
        e.className = 'floating-emoji';
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.left = Math.random() * 100 + '%';
        e.style.fontSize = (18 + Math.random() * 22) + 'px';
        e.style.animationDuration = (8 + Math.random() * 14) + 's';
        e.style.animationDelay = (Math.random() * 12) + 's';
        e.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
        e.style.opacity = '0';
        c.appendChild(e);
    }
}

// === GAME STORY ===
const gameStory = {
    start: {
        title: "A Message For You",
        content: "Hey Bubu... ❤️\n\nIn a world full of ordinary moments, I found something extraordinary.\n\nI found you.\n\nAre you ready to see how special you are to me?",
        choices: [{ text: "Yes, Bubu!", next: "howwemet" }]
    },
    howwemet: {
        title: "Where It All Began",
        content: "A badminton court. That's where the universe decided to change everything. 🏸\n\nTwo strangers. Same court. Same love for the game.\n\nI didn't know it yet... but I had just met the most important person of my life.",
        choices: [
            { text: "What happened next?", next: "friends" },
            { text: "I remember that day...", next: "friends" }
        ]
    },
    friends: {
        title: "Strangers to Friends",
        content: "We started talking. Then laughing. Then looking forward to every game just to see each other.\n\nYou weren't just someone on the court anymore.\n\nYou became the person I wanted to tell everything to.\n\nMy friend. My favorite hello. My reason to show up.",
        choices: [{ text: "And then we became partners...", next: "partners" }]
    },
    partners: {
        title: "Friends to Partners",
        content: "We started playing doubles together. 🏸\n\nOn the court, we just clicked. Every rally, every point — like we could read each other's minds.\n\nBut somewhere between the smashes and the high-fives...\n\nI realized I didn't just want you as my badminton partner.",
        choices: [{ text: "You wanted more, didn't you, Bubu?", next: "lovebirds" }]
    },
    lovebirds: {
        title: "Partners to Lovebirds",
        content: "I wanted all of it. Every morning text. Every late-night call. Every smile meant just for me.\n\nFrom strangers on a court... to friends who couldn't stop talking... to partners who couldn't stop winning...\n\nTo us. Lovebirds. Forever. 💕\n\nThat's our story, Bubu. And it's my favorite one.",
        choices: [{ text: "It's my favorite story too, Baby ❤️", next: "chapter1" }]
    },
    chapter1: {
        title: "My Beautiful Goddess",
        content: "Aradhana, my gorgeous dream girl...\n\nYou're not just beautiful on the outside.\n\nYou're the light of my life, my treasure, my everything.\n\nLet me tell you why you're so special...",
        choices: [{ text: "Tell me more, Baby", next: "chapter2" }]
    },
    chapter2: {
        title: "My Sweetness",
        content: "You're my honey bunches, my cupcake, my sweet pea...\n\nBut you're so much more than just sweet.\n\nYou're my sunshine on cloudy days, my firefly in the dark.\n\nWhat makes you feel most special, Bubu?",
        choices: [
            { text: "When you call me beautiful", next: "chapter3a" },
            { text: "When you make me smile", next: "chapter3b" },
            { text: "When you're just... you", next: "chapter3c" }
        ]
    },
    chapter3a: {
        title: "My Aphrodite",
        content: "My lovely angel, my doll face, my bella...\n\nYou're not just gorgeous — you're perfection.\n\nYou're my muse, my bliss, the pearl in my life.\n\nEvery time I see you, I fall all over again.",
        choices: [{ text: "You're making me blush, Baby!", next: "chapter4" }]
    },
    chapter3b: {
        title: "My Sunshine",
        content: "My sweetie, my cutie pie, my little butterfly...\n\nYour smile lights up my world like nothing else.\n\nYou're my blossom, my tulip, my wildflower.\n\nWith you, every day feels like spring.",
        choices: [{ text: "Aww, Bubu! 🥰", next: "chapter4" }]
    },
    chapter3c: {
        title: "My One and Only",
        content: "My beloved, my dearest, mi amor...\n\nYou don't have to try to be special.\n\nYou just ARE. My treasure, my bright eyes, my everything.\n\nBeing yourself is what makes you perfect for me.",
        choices: [{ text: "I love this, Baby", next: "chapter4" }]
    },
    chapter4: {
        title: "My Doubles Partner",
        content: "Hey Boo, my better half, my wifey...\n\nOn the court, you're my doubles partner — fierce, unstoppable, unbeatable. 🏸\n\nOff the court, you're my partner in everything.\n\nMy main squeeze, my hot stuff, my ace.\n\nEvery rally, every game, every moment — better with you.",
        choices: [{ text: "We're the best team, Bubu!", next: "chapter5" }]
    },
    chapter5: {
        title: "My Heart",
        content: "Sweetheart, my dear, my always...\n\nYou're not just my girlfriend.\n\nYou're my heart, my weakness, my forever.\n\nWhat do you want to know, my precious peach?",
        choices: [
            { text: "Why do you love me?", next: "why" },
            { text: "What am I to you?", next: "special" },
            { text: "What's our future?", next: "future" }
        ]
    },
    why: {
        title: "My Love, My Luna",
        content: "Because you're my cookie, my muffin, my sweetness...\n\nBecause your laugh is my favorite song, my little chickadee.\n\nBecause you make ordinary moments feel magical, my angel.\n\nYou're the apple of my eye, my honey bee, my everything.",
        choices: [
            { text: "Tell me more, Bubu", next: "why2" },
            { text: "This is so sweet, Baby", next: "chapter5" }
        ]
    },
    why2: {
        title: "My Snuggles",
        content: "My cuddle bug, my bun-bun, my snuggle bear...\n\nI love how you make me feel safe and loved.\n\nYou're my dove, my kitten, my little bunny.\n\nWith you, I'm home.",
        choices: [
            { text: "Aww Bubu! 🥺", next: "chapter5" },
            { text: "Keep going, Baby", next: "final" }
        ]
    },
    special: {
        title: "My Marvelous Miss",
        content: "You're my pumpkin, my dumpling, my sweet pea...\n\nYou're my pixie, my twinkle, my starling.\n\nYou're not just special — you're my miracle.\n\nMy hot tamale, my flirtini, my goofball... you're EVERYTHING.",
        choices: [
            { text: "You're too much, Bubu! 😊", next: "special2" },
            { text: "I love you too, Baby", next: "chapter5" }
        ]
    },
    special2: {
        title: "My Bright Eyes",
        content: "My baby cakes, my gumdrop, my shortcake...\n\nEvery little thing about you is special to me.\n\nYou're my maple, my clover, my sunray.\n\nMy beautiful, gorgeous, lovely Aradhana.",
        choices: [
            { text: "This is perfect, Bubu", next: "chapter5" },
            { text: "Show me more, Baby", next: "final" }
        ]
    },
    future: {
        title: "My Forever",
        content: "My dearest doll, my beloved, my always...\n\nThe future is ours to write together, Bubu.\n\nYou're my forever, mi amor, my one and only.\n\nI want you in every chapter, every page, every word of my story.",
        choices: [
            { text: "I want that too, Bubu", next: "future2" },
            { text: "Tell me more, Baby", next: "chapter5" }
        ]
    },
    future2: {
        title: "My Amore",
        content: "My sweet cheeks, my love nugget, my precious pearl...\n\nWhatever comes next, we face it together.\n\nYou're my bliss, my perfection, my dream come true.\n\nForever and always, Bubu.",
        choices: [
            { text: "Forever, Baby 💕", next: "chapter5" },
            { text: "Take me to the end", next: "final" }
        ]
    },
    final: {
        title: "Happy Valentine's Day, Bubu",
        content: "Aradhana... my honey, my babe, my sweetness...\n\nFrom that first rally on the badminton court to this moment right now — every single day with you has been a gift. 🏸\n\nYou're my sunshine, my goddess, my angel, my treasure.\n\nYou're my cutie, my sugar, my cookie, my everything.\n\nYou're not just my Valentine — you're my always.\n\n❤️ I love you, Bubu ❤️\n\nFrom your Bubu, with all my heart 💕",
        choices: [{ text: "Play again, Baby! 🥰", next: "start" }]
    }
};

// === RENDERING ENGINE ===
function typeWriter(el, text, speed = 25) {
    el.textContent = '';
    el.style.opacity = '0';
    let i = 0;
    setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease-out';
        el.style.opacity = '1';
    }, 100);
    (function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    })();
}

function renderScene(key) {
    const scene = gameStory[key];
    const titleEl = document.getElementById('title');
    const contentEl = document.getElementById('content');
    const choicesEl = document.getElementById('choices');
    const screen = document.getElementById('gameScreen');
    const dailyNote = document.getElementById('dailyNote');

    // Save progress
    state.currentScene = key;
    state.progress[key] = new Date().toISOString();
    saveState();

    // Show daily/weather note on first scene
    if (key === 'start') {
        const notes = [getDailyNote(), getRandomLoveNote()];
        dailyNote.textContent = notes[Math.floor(Math.random() * notes.length)];
        dailyNote.style.display = 'block';
    } else {
        dailyNote.style.display = 'none';
    }

    // Micro-interaction
    screen.style.transform = 'scale(0.98)';
    screen.style.opacity = '0.8';
    setTimeout(() => {
        screen.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
        screen.style.transform = 'scale(1)';
        screen.style.opacity = '1';
    }, 50);

    // Title transition
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        titleEl.textContent = scene.title;
        titleEl.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
    }, 200);

    // Content typewriter
    setTimeout(() => typeWriter(contentEl, scene.content), 400);

    // Staggered button reveal
    choicesEl.innerHTML = '';
    setTimeout(() => {
        scene.choices.forEach((choice, idx) => {
            setTimeout(() => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
                btn.onclick = () => {
                    btn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        renderScene(choice.next);
                    }, 150);
                };
                choicesEl.appendChild(btn);
                setTimeout(() => {
                    btn.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateY(0)';
                }, 50);
            }, idx * 150);
        });
    }, scene.content.length * 25 + 800);
}

// === INITIALIZATION ===
function initGame() {
    createParticles();
    createChristmasLights();
    createFloatingEmojis();
    initCursorTrail();
    initClickHearts();
    initParallax();
    initTilt();
    initShakeDetection();
    initControls();

    // Start from saved progress or beginning
    const startScene = state.currentScene || 'start';
    setTimeout(() => renderScene(startScene), 500);
}

// === START ===
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initLoading();
});

