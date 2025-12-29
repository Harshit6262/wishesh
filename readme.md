# 💕 Our Love Story - Interactive Romantic Website

A stunning, fully animated romantic website dedicated to your girlfriend. Created with love, filled with interactive elements, and designed to be memorable and personal.

## 🎨 Features

### 🏠 Homepage

- **Animated heart particles** falling like snow
- **Fade-in welcome message** with elastic animation
- **Smooth scroll indicator** with pulsing animation
- **GSAP-powered** smooth transitions

### 📅 Interactive Timeline

- **Relationship milestones** (first meet, first date, special trips, etc.)
- **Clickable cards** with photos, stories, and dates
- **Zooming animations** on interaction
- **Modal popup** for detailed stories
- **Confetti bursts** when viewing memories

### 🖼️ Photo Gallery

- **Responsive grid layout** with adaptive sizing
- **Image flip animation** on hover
- **Heart emoji overlays** with smooth transitions
- **Lightbox modal** for full-size viewing
- **Photo upload feature** to personalize with couple photos
- **Romantic filters & glow effects**
- **Parallax scrolling** effect

### 💌 Love Messages

- **Typing animation** - text appears character by character
- **Flying text animation** - words float in from sides
- **Custom poetry/quotes** section
- **Romantic styling** with gradient backgrounds

### 🎵 Music Player

- **Play/pause functionality** for background music
- **Visual equalizer waves** that animate with music
- **Progress bar** with clickable seeking
- **Romantic background track**

### 🎮 Interactive Elements

- **Hover butterflies** - butterflies appear and flutter when mouse moves
- **Click fireworks** - colorful explosions with "I Love You" message
- **Heart cursor trail** - hearts follow mouse movement
- **Ripple effects** on page interactions

### ❓ Quiz Section

- **"How Well Do You Know Us?" quiz** with 5 questions
- **Animated correct/incorrect feedback**
- **Score calculation** with personalized messages
- **Confetti celebration** on correct answers
- **Dark mode compatible**

### 💎 Proposal Section

- **3D rotating ring animation** (using Three.js)
- **Pulsing diamond** with light effects
- **Falling flower petals** animation
- **Romantic proposal text**
- **Share and download buttons**

### 🎨 Theme & Design

- **Dark Mode** for romantic ambiance (toggle button)
- **Gradient backgrounds** throughout
- **Responsive design** - works on mobile, tablet, desktop
- **Smooth scroll behavior**
- **Accessibility** features

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Advanced animations, gradients, flexbox, grid
- **Vanilla JavaScript** - No framework dependencies
- **GSAP 3** - Professional animations library
- **Three.js** - 3D graphics for ring animation
- **Font Awesome** - Icons

### Features

- No backend required
- Pure client-side rendering
- Fast loading
- SEO friendly
- Lightweight

## 📦 Project Structure

```
LoveStory/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # All styling
├── js/
│   ├── main.js              # Main logic, initialization
│   ├── particles.js         # Heart particle system
│   ├── timeline.js          # Timeline interactions
│   ├── gallery.js           # Gallery animations
│   ├── messages.js          # Typing & music player
│   ├── quiz.js              # Quiz functionality
│   ├── interactive.js       # Butterflies, fireworks, hover effects
│   └── proposal.js          # 3D ring, proposals, share buttons
├── assets/
│   ├── images/              # Upload couple photos here
│   └── music/               # Add romantic background music
└── README.md                # This file
```

## 🚀 Quick Start

### Method 1: Local Testing

1. **Download all files** and save in a folder named `LoveStory`
2. **Open `index.html`** in your browser (Chrome, Firefox, Safari recommended)
3. **Personalize** with your girlfriend's name and details (see below)

No server needed! Works entirely in browser.

### Method 2: GitHub Pages (Free Hosting)

1. **Create GitHub account** (if you don't have one): https://github.com/signup
2. **Create new repository**:

   - Go to https://github.com/new
   - Name it: `love-story`
   - Click "Create repository"

3. **Upload files**:

   - Click "Add file" → "Upload files"
   - Drag all files into the uploader
   - Commit changes

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set Source to "main" branch
   - Save
   - Your site will be at: `https://yourusername.github.io/love-story`

### Method 3: Netlify (Easiest & Fastest)

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up** with GitHub account
3. **Drag & drop your `LoveStory` folder** onto Netlify
4. **Done!** Your site is live in seconds
5. You can even set a **custom domain**

### Method 4: Vercel

1. **Go to Vercel**: https://vercel.com
2. **Connect GitHub** account
3. **Import your repository**
4. **Deploy** automatically
5. Get a **live URL instantly**

## 🎯 Personalization Guide

### Update Her Name

In `index.html`, find:

```html
<h1 id="greeting">To My Love... 💕</h1>
```

Change to:

```html
<h1 id="greeting">To My Love [Her Name]... 💕</h1>
```

Or edit in `js/main.js`:

```javascript
const greetingText = document.getElementById("greeting");
greetingText.textContent = "To My Love [Her Name]... 💕";
```

### Update Timeline

In `js/timeline.js`, modify the `timelineData` array:

```javascript
const timelineData = [
  {
    id: 0,
    title: "First Meeting",
    date: "May 15, 2022",
    story: "Your custom story here...",
    emoji: "👀",
    photos: ["url-to-your-photo"],
  },
  // ... more milestones
];
```

### Add Your Photos

1. **For gallery**: Upload images to `assets/images/`
2. **In `index.html`**, update gallery image URLs:

```html
<img src="assets/images/your-photo.jpg" alt="Memory" />
```

3. **For timeline**: Add your photos to timeline data

### Update Quiz Questions

In `js/quiz.js`, modify `quizQuestions`:

```javascript
const quizQuestions = [
  {
    question: "What's my favorite flower?",
    options: ["Rose", "Sunflower", "Lily", "Daisy"],
    correctAnswer: 0, // Index of correct answer
  },
  // ... more questions
];
```

### Add Background Music

1. **Get a romantic song** (royalty-free):

   - YouTube Audio Library
   - Free Music Archive
   - Zapsplat
   - Bensound

2. **Convert to MP3** and save to `assets/music/`

3. **Update in `index.html`**:

```html
<audio id="bgMusic" src="assets/music/your-song.mp3"></audio>
```

### Change Colors

Edit the root colors in `css/styles.css`:

```css
:root {
  --primary-color: #ff1744; /* Main pink/red */
  --secondary-color: #ff5783; /* Lighter pink */
  --accent-color: #ff6b9d; /* Accent pink */
  --dark-bg: #0a0e27; /* Dark mode background */
}
```

## 📱 Mobile Optimization

The site is fully responsive:

- **Mobile-first design**
- **Touch-friendly buttons**
- **Optimized animations** for lower-end devices
- **Fast loading** on slow connections
- **Works on all modern browsers**

## 🎮 Interactive Features Guide

### Butterflies (Hover)

- Move your mouse around
- Butterflies flutter across the screen
- Completely automatic

### Fireworks (Click)

- Click anywhere on the page
- Colorful explosions appear
- "I Love You" message shows
- Disabled on buttons for better UX

### Heart Trail

- Hearts follow your mouse cursor
- Gentle animation with fade-out
- Works everywhere on the page

### Dark Mode

- Click moon icon in navbar
- Preference is saved locally
- Perfect for evening viewing

## 🔒 Privacy & Security

- **No data collection** - everything is client-side
- **No cookies tracking** - only localStorage for theme preference
- **No server needed** - no logs of access
- **Safe to share** - no personal data exposed

## ⚡ Performance Tips

1. **Optimize images**: Use tools like TinyPNG to compress photos
2. **Use CDN**: GSAP and Three.js are served from CDN
3. **Cache**: Browser caches assets automatically
4. **Lazy load**: Images load as needed

## 🌐 Browser Support

| Browser | Support    |
| ------- | ---------- |
| Chrome  | ✅ Full    |
| Firefox | ✅ Full    |
| Safari  | ✅ Full    |
| Edge    | ✅ Full    |
| IE 11   | ⚠️ Partial |

## 🚀 Advanced Customization

### Add Videos

```html
<video width="400" controls>
  <source src="video.mp4" type="video/mp4" />
</video>
```

### Add Embedded YouTube

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen
></iframe>
```

### Custom Font

In `css/styles.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap");

body {
  font-family: "Dancing Script", cursive;
}
```

## 📊 Analytics (Optional)

Add Google Analytics to track views:

```html
<!-- In index.html, before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

## 🐛 Troubleshooting

### Animations not working?

- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console (F12)
- Ensure GSAP is loaded from CDN

### Images not showing?

- Check image paths (use relative paths)
- Ensure images are in correct folder
- Check file names (case-sensitive on servers)

### Music not playing?

- Different browsers have different autoplay policies
- Add a play button (already included)
- Use common formats like MP3

### Dark mode not saving?

- Check localStorage is enabled
- Try a different browser
- Clear browser data and try again

## 💡 Ideas for Enhancement

1. **Email integration** - Send a link via email
2. **Comment section** - Add guest book
3. **Location map** - Show where you met
4. **Countdown timer** - For special occasions
5. **Snapshot feature** - Take screenshots of the page
6. **Video messages** - Embed voice/video from you
7. **Timeline filters** - Filter by year/month
8. **Custom music playlist** - Multiple songs
9. **Gift registry** - Link to Wishlist
10. **Mobile app** - Convert to PWA

## 📞 Support & Issues

If you encounter issues:

1. **Check console** for errors (F12 → Console)
2. **Verify file paths** are correct
3. **Check CDN links** are accessible
4. **Test in different browser**
5. **Hard refresh** browser (Ctrl+F5)

## 📄 License

This website is created for personal use. Feel free to use, modify, and share!

## 🎁 Final Notes

This website is a labor of love. Every animation, every interaction, and every detail has been crafted to show how much you care.

**Tips for maximum impact:**

- ✅ Personalize with real memories and photos
- ✅ Update with genuine stories
- ✅ Use her favorite music
- ✅ Share it in a special moment
- ✅ Keep updating it with new memories

Remember: The website is beautiful, but the real magic is in the memories and love you share! 💕

---

**Made with ❤️ | Hope this brings a smile to her face! 😊**

For questions or improvements, feel free to reach out!

---

## 🚀 Hosting Comparison

| Platform     | Cost | Setup Time | Features                 |
| ------------ | ---- | ---------- | ------------------------ |
| GitHub Pages | Free | 5 min      | Good, custom domain      |
| Netlify      | Free | 2 min      | Excellent, form handling |
| Vercel       | Free | 2 min      | Excellent, fast CDN      |
| Firebase     | Free | 10 min     | Advanced features        |

**Recommended**: **Netlify** - easiest drag & drop, instant deployment!

---

**Enjoy creating memories! 💕✨**
