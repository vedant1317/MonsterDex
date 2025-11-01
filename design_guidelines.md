# MonsterDex Design Guidelines

## Design Approach
**Reference-Based Approach**: Gaming/Energy drink aesthetic inspired by cyberpunk and neon-futuristic interfaces. Think Razer, Discord dark mode, and energy drink brand websites with high-impact visual effects.

## Core Visual Identity

### Color Palette (MANDATORY - Dark Neon Theme)
- **Primary Background**: `#0a0a0a` (deep black)
- **Secondary Background**: `#0f0f23` (dark navy-black)
- **Card/Component Background**: `#1a1a2e` (charcoal blue)
- **Primary Accent**: `#00ff88` (electric neon green)
- **Secondary Accent**: `#39ff14` (bright lime green)
- **Gradients**: `linear-gradient(45deg, #00ff88, #39ff14)` for CTAs and highlights
- **Glow Effects**: `box-shadow: 0 0 20px #00ff88` on interactive elements

### Typography
- **Headers**: "Orbitron" (Google Fonts) - futuristic, bold, all-caps for major headings
- **Body Text**: "Rajdhani" (Google Fonts) - clean, readable, modern
- **Hierarchy**: 
  - H1: 4rem (64px), Orbitron, bold, letter-spacing: 0.05em
  - H2: 3rem (48px), Orbitron, semi-bold
  - H3: 2rem (32px), Orbitron, medium
  - Body: 1.125rem (18px), Rajdhani, regular
  - Small: 0.875rem (14px), Rajdhani, light

### Layout System (Desktop-Optimized)
- **Container Max Width**: 1920px with 80px horizontal padding
- **Grid Systems**: 
  - Catalog: 4-column grid (gap-8)
  - Featured Flavors: 5-column carousel
  - Profile Achievements: 5-column grid
- **Spacing Units**: Tailwind - primarily 4, 8, 12, 16, 24, 32 for consistent rhythm
- **Vertical Sections**: py-24 to py-32 for major page sections

## Page-Specific Layouts

### Landing Page
- **Hero Section**: Full viewport (100vh) with particles.js/canvas particle effect background, centered content with animated search bar
- **Featured Carousel**: Horizontal scrolling showcase of 5 top-rated flavors with neon glow cards
- **Categories Grid**: 3x2 grid with large clickable category cards (Original, Ultra, Java, Rehab, Reserve, Specialty)
- **CTA Section**: Bold gradient button with glow, statistics counters (total flavors, reviews, users)

### Catalog Page
- **Layout**: Sidebar filters (left, 280px width) + Main grid (4 columns)
- **Flavor Cards**: 
  - 300x400px images
  - Hover: scale(1.05) + neon glow shadow
  - Rating stars (animated fill)
  - Quick stats overlay on hover
- **Infinite Scroll**: Load 20 items at a time with skeleton loaders

### Flavor Detail Page
- **Hero Layout**: Split 40/60 - Large flavor image (left) + Details/Stats (right)
- **Reviews Section**: Full-width below hero, chronological list with user avatars
- **Review Form**: Fixed-position sidebar (right) or modal overlay with 5-star rating (interactive animation) + textarea

### Leaderboard Page
- **Table Layout**: Full-width centered table (max-width: 1400px)
- **Top 3 Badges**: Oversized cards with podium-style ranking (1st gold glow, 2nd silver glow, 3rd bronze glow)
- **Remaining Rankings**: Compact table rows with subtle hover effects
- **Live Updates**: Pulse animation on rank changes

### Profile Page
- **Header**: User stats banner (total tried, total reviews, average rating given)
- **Three-Column Layout**:
  - Left: Achievements grid (5 columns, badge cards with unlock animations)
  - Center: Tried flavors grid (personal ratings visible)
  - Right: Stats dashboard (pie chart for categories, bar chart for rating distribution)
- **Confetti**: Canvas overlay trigger on achievement unlock

## Component Library

### Navigation
- **Navbar**: Fixed top, translucent background (`#1a1a2e` with 90% opacity), blur backdrop
- **Logo**: Left-aligned, Orbitron font with neon green gradient
- **Links**: Centered, hover underline with neon glow
- **Search Bar**: Integrated in navbar, expands on click
- **Profile Dropdown**: Right-aligned with avatar, neon border on active

### Buttons
- **Primary CTA**: Gradient background (#00ff88 to #39ff14), white text, box-shadow glow on hover
- **Secondary**: Transparent with neon green border, filled on hover
- **Icon Buttons**: Circular, glow on hover
- **Blurred Background Buttons** (on hero images): backdrop-blur-md with semi-transparent background

### Cards
- **FlavorCard**: Dark card background (#1a1a2e), rounded corners (12px), image top, content bottom, border glow on hover
- **AchievementBadge**: Hexagonal or shield shape, grayscale when locked, full neon color when unlocked
- **ReviewCard**: User avatar left, content right, timestamp, rating stars

### Forms
- **Input Fields**: Dark background (#0f0f23), neon green border on focus, Rajdhani font
- **Star Rating**: Interactive hover/click states, animated fill with gradient
- **Textarea**: Matching input style, minimum 4 rows
- **Validation**: Red glow for errors, green glow for success

### Modals/Overlays
- **Auth Modal**: Centered overlay, dark backdrop blur, neon border card
- **Review Form**: Slide-in from right or centered modal
- **Toast Notifications**: Top-right corner, neon accent, auto-dismiss

## Animation Specifications (Framer Motion)

### Page Transitions
- Fade in + slide up (20px) on route change
- Duration: 0.3s, easing: ease-out

### Interactive Elements
- **Card Hover**: scale(1.05), box-shadow glow increase, duration: 0.2s
- **Button Click**: scale(0.95) momentary, then back
- **Stars**: Fill animation left-to-right, 0.15s per star
- **Loading Spinners**: Rotating neon ring

### Particles Effect
- Landing page background only
- Green/cyan colored particles
- Slow drift movement
- Density: Medium (60-80 particles)

## Images
- **Hero Section (Landing)**: NO static hero image - use particles.js animation background instead
- **Flavor Images**: 300x400px product shots on transparent or dark backgrounds (use placeholder service during development: `https://via.placeholder.com/300x400/[category-color]/ffffff?text=[FlavorName]`)
- **User Avatars**: 48px circular for profile dropdown, 64px for profile page
- **Achievement Badges**: SVG icons or 128x128px PNG graphics

## Accessibility
- All interactive elements have focus states with neon green outline
- ARIA labels on icon-only buttons
- Keyboard navigation fully supported
- High contrast maintained with neon colors on dark backgrounds
- Form labels always visible (no placeholder-only inputs)

## Charts & Data Visualization (Recharts)
- **Pie Chart**: Neon green/cyan gradient segments, dark background
- **Bar Chart**: Vertical bars with gradient fill, grid lines subtle gray
- **Tooltips**: Dark background with neon border