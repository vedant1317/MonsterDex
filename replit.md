# MonsterDex - Monster Energy Review Platform

## Overview

MonsterDex is a full-stack web application that serves as a comprehensive review platform for Monster Energy drinks. Users can discover, rate, and track Monster Energy flavors while earning achievements and competing on leaderboards. The platform features a dark, neon-futuristic aesthetic inspired by gaming and energy drink brands, with emphasis on interactive animations and engaging user experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)
- Single-page application (SPA) architecture with client-side navigation

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode only theme with cyberpunk/neon aesthetic (deep blacks, neon greens)
- Custom color palette defined in CSS variables for consistent theming

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and synchronization
- Axios for HTTP client with request/response interceptors
- Context API for authentication state (AuthContext)
- Local storage for JWT token persistence

**Animation & Interactivity**
- Framer Motion for page transitions, hover effects, and micro-interactions
- Custom particle background using HTML5 Canvas
- React Hot Toast for notification system
- React Confetti for achievement celebrations

**Design System**
- Google Fonts: "Orbitron" for headers (futuristic display), "Rajdhani" for body text
- Neon glow effects using CSS box-shadows on interactive elements
- Desktop-optimized layouts with 1920px max-width containers
- Grid-based layouts: 4-column catalog, 5-column carousels

### Backend Architecture

**Server Framework**
- Express.js for RESTful API server
- Node.js runtime environment
- Modular route organization (auth, flavors, reviews, users, leaderboard)
- CommonJS modules (`.cjs`) for route handlers mixed with ES modules

**Authentication & Authorization**
- JWT (JSON Web Tokens) for stateless authentication
- bcryptjs for password hashing
- Custom auth middleware for protected routes
- Token-based session management with localStorage on client

**API Design**
- RESTful endpoints following resource-oriented architecture
- JSON request/response format
- Request logging middleware for development debugging
- Error handling with appropriate HTTP status codes

**Database Layer**
- MongoDB with Mongoose ODM for data modeling and validation
- MongoDB Atlas for cloud database hosting
- Collections: Users, Flavors, Reviews
- Document relationships via ObjectId references

### Data Models

**User Schema**
- Authentication: email, hashed password, username
- Progress tracking: triedFlavors array, achievements array
- Statistics: totalTried, totalReviews, avgRating

**Flavor Schema**
- Core info: name, description, category, imageUrl
- Aggregated data: avgRating, totalReviews
- Categories: Original, Ultra, Java, Rehab, Reserve, Specialty

**Review Schema**
- References: userId, flavorId
- Content: rating (1-5), comment text
- Metadata: createdAt timestamp, populated username

### Design Pattern Decisions

**Component Architecture**
- Atomic design with reusable UI components (FlavorCard, StarRating, AchievementBadge)
- Page components as route containers (Landing, Catalog, FlavorDetail, Leaderboard, Profile)
- Smart/container vs presentational component separation

**Routing Strategy**
- Wouter chosen for minimal bundle size vs React Router
- Client-side routing with animated page transitions
- Protected routes handled via authentication context checks

**Data Flow**
- Unidirectional data flow: API → React Query → Components
- Optimistic updates with query invalidation on mutations
- Cache-first strategy with background refetching

**Authentication Flow**
- Registration/login returns JWT token
- Token stored in localStorage and axios interceptor
- 401 responses trigger automatic logout and redirect
- User data cached in context and localStorage

### Performance Optimizations

**Build & Bundling**
- Vite for fast development with native ESM
- Code splitting at route level (automatic with Vite)
- esbuild for production backend bundling

**Caching Strategy**
- React Query with infinite stale time for static content
- Disabled automatic refetch on window focus
- Query invalidation on mutations for real-time updates

**Asset Optimization**
- Lazy loading for particle effects and animations
- Tailwind CSS purging unused styles in production
- Google Fonts preconnect for faster font loading

## External Dependencies

### Core Runtime & Build Tools
- Node.js runtime environment
- Vite (development server, build tool, HMR)
- TypeScript compiler for type checking
- PostCSS with Tailwind CSS and Autoprefixer

### Database & ORM
- MongoDB Atlas (cloud database service)
- Mongoose (MongoDB object modeling)
- Connection via `MONGO_URI` environment variable

### Frontend Libraries
- React 18 (UI framework)
- TanStack Query v5 (server state management)
- Axios (HTTP client)
- Wouter (routing)
- Framer Motion (animations)
- React Hot Toast (notifications)
- React Hook Form with Zod resolver (form validation)
- Recharts (data visualization for profile stats)
- React Confetti (achievement celebrations)
- date-fns (date formatting)

### UI Component Libraries
- Radix UI primitives (20+ component packages for accessible UI)
- Shadcn/ui component system
- class-variance-authority (component variant styling)
- clsx & tailwind-merge (className utilities)
- cmdk (command menu component)
- Lucide React (icon library)

### Backend Libraries
- Express.js (web framework)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser (cookie parsing middleware)
- cors (cross-origin resource sharing)
- dotenv (environment variable management)

### Development Tools
- tsx (TypeScript execution for development)
- nodemon (auto-restart on file changes)
- ESbuild (production backend bundling)
- Replit-specific plugins (vite-plugin-runtime-error-modal, cartographer, dev-banner)

### Google Fonts
- Orbitron (futuristic display font for headers)
- Rajdhani (modern sans-serif for body text)
- Loaded via Google Fonts CDN

### Environment Variables Required
- `MONGO_URI`: MongoDB Atlas connection string
- `DATABASE_URL`: Alternative database URL (for Drizzle config, though not actively used)
- `NODE_ENV`: Environment identifier (development/production)