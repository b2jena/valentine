/* ========================================
   EMOJI COMPATIBILITY LAYER
   Ensures all emojis work across browsers/devices
   ======================================== */

// Universal emoji sets (tested on iOS, Android, Windows, Mac, Linux)
const SAFE_EMOJIS = {
    // Hearts - universally supported since Unicode 6.0 (2010)
    hearts: ['❤️', '💕', '💖', '💗', '💘', '💝'],
    
    // Flowers - universally supported
    flowers: ['🌹', '🌸', '🌺', '🌷', '💐', '🌻', '🌼'],
    
    // Food - universally supported
    sweets: ['🍫', '🍬', '🍭', '🍩'],
    meals: ['🍝', '🍜', '🍗', '🍛'],
    
    // Sports - universally supported
    sports: ['🏸'], // Badminton
    
    // Nature - universally supported
    nature: ['✨', '🦋', '🌙', '☀️'],
    
    // Symbols - universally supported
    symbols: ['💪', '🎉', '☁️', '🌧️', '🌅']
};

// Emoji with text fallbacks for maximum compatibility
const EMOJI_FALLBACKS = {
    // Control buttons
    '🌙': { emoji: '🌙', text: '🌙', name: 'Night' },
    '☀️': { emoji: '☀️', text: '☀', name: 'Day' },
    '🌅': { emoji: '🌅', text: '🌄', name: 'Sunset' },
    '💕': { emoji: '💕', text: '♥', name: 'Love' },
    '🎉': { emoji: '🎉', text: '★', name: 'Party' },
    '✍️': { emoji: '✍️', text: 'Aa', name: 'Write' },
    '🎭': { emoji: '🎭', text: 'Aa', name: 'Elegant' },
    '🎯': { emoji: '🎯', text: 'Aa', name: 'Modern' },
    
    // Story emojis
    '🏸': { emoji: '🏸', text: '🏸', name: 'Badminton' },
    '❤️': { emoji: '❤️', text: '♥', name: 'Heart' },
    '🥰': { emoji: '🥰', text: '😊', name: 'Love' },
    '😊': { emoji: '😊', text: '☺', name: 'Smile' },
    '🥺': { emoji: '🥺', text: '🙏', name: 'Please' }
};

// Test if emoji renders properly
function testEmojiSupport(emoji) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 10;
    ctx.textBaseline = 'top';
    ctx.font = '10px Arial';
    ctx.fillText(emoji, 0, 0);
    const data = ctx.getImageData(0, 0, 10, 10).data;
    // Check if any pixels were drawn
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0) {
            return true;
        }
    }
    return false;
}

// Get safe emoji or fallback
function getSafeEmoji(emoji) {
    const fallback = EMOJI_FALLBACKS[emoji];
    if (!fallback) return emoji;
    
    // Try to use the emoji, fallback to text if not supported
    if (testEmojiSupport(emoji)) {
        return fallback.emoji;
    }
    return fallback.text;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAFE_EMOJIS, EMOJI_FALLBACKS, getSafeEmoji };
}