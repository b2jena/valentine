/* === STRANGER THINGS ATMOSPHERE === */

// Floating Upside Down particles
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

// Christmas lights along the top
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

// Floating emoji background — flowers, chocolates, pasta, biryani, hearts
function createFloatingEmojis() {
    const c = document.getElementById('floatingEmojis');
    const emojis = [
        '🌹','🌸','🌺','🌷','💐','🌻','🌼','💮',
        '🍫','🍬','🍭','🍩',
        '🍝','🍜',
        '🍗','🍛',
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
        // Random horizontal drift
        e.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
        e.style.opacity = '0';
        c.appendChild(e);
    }
}

/* === GAME STORY === */
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

/* === RENDERING ENGINE === */
let currentScene = 'start';

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

    // Micro-interaction: subtle pulse on scene change
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
                        currentScene = choice.next;
                        renderScene(currentScene);
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

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createChristmasLights();
    createFloatingEmojis();

    const screen = document.getElementById('gameScreen');
    screen.style.opacity = '0';
    screen.style.transform = 'scale(0.95) translateY(20px)';
    setTimeout(() => {
        screen.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
        screen.style.opacity = '1';
        screen.style.transform = 'scale(1) translateY(0)';
        setTimeout(() => renderScene(currentScene), 400);
    }, 100);
});