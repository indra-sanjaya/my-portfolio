export type ProjectStatus = 'Live' | 'In Progress' | 'Prototype';

export type ProjectScreenshot = {
  src: string;
  alt: string;
  label?: string;
};

export type ProjectData = {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  screenshots: ProjectScreenshot[];
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
  architectureHighlights: string[];
};

export const projectsData: ProjectData[] = [
  {
    id: 'firework-studio',
    title: 'FireWork Studio',
    subtitle: 'Social Media Analytics & Content Platform',
    shortDescription:
      'A full-stack social media management platform that aggregates analytics across Instagram, Twitter, and TikTok, surfaces trending content, and uses AI to generate storyboard ideas for scheduled posts.',
    fullDescription:
      'FireWork Studio is a production-ready social media command center built with Next.js and Prisma. It connects live platform APIs (Instagram Graph, Twitter v2, TikTok Open API) to deliver real-time metrics, engagement history, and growth summaries in one dashboard. An AI pipeline powered by Google Gemini scrapes trending content via Apify, generates multi-scene video or carousel storyboards, and produces AI images per scene. Posts are composed in a rich editor with live platform previews, then scheduled through QStash for reliable delayed delivery — including retry logic and status polling for each platform.',
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
      'Prisma + PostgreSQL',
      'Google Gemini API',
      'Better Auth',
      'Cloudinary',
      'Redis (Upstash)',
      'QStash',
      'Apify',
      'Framer Motion',
      'shadcn/ui',
      'Recharts',
      'Puppeteer',
    ],
    features: [
      'Live metrics dashboard for Instagram, Twitter, and TikTok with engagement history charts',
      'AI storyboard generator (video & carousel) using Google Gemini with per-scene image generation',
      'Trending content discovery via Apify scrapers filtered by user interests',
      'Post scheduler with QStash — supports delayed publishing and per-platform retry logic',
      'Rich post editor with live Instagram, Twitter, and TikTok preview panes',
      'Hashtag trend charts sourced from live Instagram and Twitter data',
      'PDF storyboard export via headless Puppeteer',
      'OAuth login and account linking for Instagram, Twitter, and TikTok via Better Auth',
    ],
    challenges: [
      'Coordinating multi-step async flows: AI concept generation → scene scripting → parallel image generation per scene',
      'Handling platform-specific media publishing quirks (Instagram container polling, TikTok publish status retries)',
      'Keeping trending content and hashtag data fresh without hammering external APIs — solved with Redis TTL caching',
      'Building a single post editor that accurately previews carousel, video, and text formats across three distinct platforms',
    ],
    architectureHighlights: [
      'API route layer cleanly separates platform integrations (Instagram, Twitter, TikTok, Gemini, Apify)',
      'QStash handles all scheduled and retry-based post delivery with webhook callbacks',
      'Redis caches trending posts and hashtag data per user to reduce Apify API cost and latency',
      'Prisma schema models users, posts, media, social accounts, AI planning sessions, and scenes in a single normalized database',
      'Better Auth manages OAuth flows and per-provider access token storage for multi-platform linking',
    ],
    screenshots: [
      {
        src: '/firework/analytics.png',
        alt: 'FireWork metrics dashboard',
        label: 'Analytics Dashboard',
      },
      {
        src: '/firework/AI_storyboard.png',
        alt: 'AI storyboard generator',
        label: 'AI Storyboard',
      },
      {
        src: '/firework/post_editor.png',
        alt: 'Post editor with live preview',
        label: 'Post Editor',
      },
      {
        src: '/firework/trending_feed.png',
        alt: 'Trending content discovery',
        label: 'Trending Feed',
      },
    ],
    liveUrl: 'https://firework-studio.rookiedev.online',
    githubUrl: 'https://github.com/indra-sanjaya/firework-studio',
    status: 'Live',
  },
  {
    id: 'sprintzee',
    title: 'SprintZee',
    subtitle: 'Sneaker eCommerce Platform',
    shortDescription:
      'A full-stack sneaker eCommerce store with JWT authentication, debounced search, infinite scroll, wishlist management, and Midtrans payment gateway integration.',
    fullDescription:
      'SprintZee is a production-ready eCommerce platform built with Next.js App Router and a raw MongoDB driver (no ORM). It implements a clean separation between SSR and CSR: the home page and product detail pages are server-rendered for SEO, while the product listing, wishlist, and cart pages are fully client-side with reactive state. Users can register and log in via a JWT-based cookie auth system, browse a paginated product catalogue with debounced search and multi-filter support, manage a personal wishlist, and complete purchases through a Midtrans Snap payment flow — including a webhook handler that verifies signatures, records orders, and auto-clears the cart on payment success.',
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS 4',
      'MongoDB (native driver)',
      'JWT (jsonwebtoken)',
      'bcryptjs',
      'Zod',
      'Midtrans Snap',
      'react-infinite-scroll-component',
      'SweetAlert2',
    ],
    features: [
      'JWT cookie authentication with register, login, and server-action logout',
      'SSR product detail pages with dynamic Open Graph metadata per product',
      'CSR product listing with debounced search, price range filter, tag filter, and sort',
      'Infinite scroll pagination using react-infinite-scroll-component',
      'Wishlist CRUD — add from listing or detail page, remove with confirmation modal',
      'Cart management with quantity increment/decrement and per-item removal',
      'Midtrans Snap checkout with onSuccess, onPending, and onError callbacks',
      'Midtrans webhook handler with SHA-512 signature verification and order persistence',
      'Centralised Zod validation schemas and typed error handler across all API routes',
    ],
    challenges: [
      'Coordinating SSR and CSR rendering strategies per page without a shared data-fetching layer',
      'Implementing a reliable Midtrans webhook flow: verifying signatures, extracting user IDs from order IDs, and atomically clearing carts after settlement',
      'Building a composable filter and sort system that resets infinite scroll state correctly on every filter change',
      'Managing wishlist state across the product listing and detail pages without a global store',
    ],
    architectureHighlights: [
      'MongoDB native driver with per-model static class pattern — no ORM overhead',
      'JWT stored in HttpOnly cookies; auth helper reads and verifies tokens server-side across all protected routes',
      'Zod schemas shared between API route handlers and client-side form validation',
      'Next.js route handlers cleanly separate product, user, wishlist, cart, checkout, and webhook concerns',
      'InfiniteScroll keyed to filter state so the scroll position and data reset correctly on every new query',
    ],
    screenshots: [
      {
        src: '/sprintzee/homepage.png',
        alt: 'SprintZee homepage with featured products',
        label: 'Homepage',
      },
      {
        src: '/sprintzee/product_catalogue.png',
        alt: 'Product listing with search and filters',
        label: 'Product Catalogue',
      },
      {
        src: '/sprintzee/product_detail.png',
        alt: 'Product detail page with image gallery',
        label: 'Product Detail',
      },
      {
        src: '/sprintzee/checkout.png',
        alt: 'Cart and Midtrans checkout flow',
        label: 'Checkout',
      },
    ],
    liveUrl: 'https://sportswear-sprintzee.vercel.app',
    githubUrl: 'https://github.com/H8-FSJS-P3S6/gc02-indra-sanjaya.git',
    status: 'Live',
  },
  {
    id: 'tripplanner',
    title: 'TripPlanner',
    subtitle: 'AI-Powered Trip Planning Application',
    shortDescription:
      'A full-stack trip planning platform with Google and GitHub OAuth, AI-generated day-by-day itineraries via Gemini, live hotel and location search, and a drag-and-drop itinerary editor managed through Redux.',
    fullDescription:
      'TripPlanner is a full-stack CRUD application built with React + Vite on the frontend and Express + PostgreSQL (Sequelize) on the backend. Users authenticate via email/password, Google OAuth 2.0, or GitHub OAuth — all issuing JWT tokens stored in localStorage. Once logged in, users can create trips that trigger a Google Gemini AI call to generate structured day-by-day itineraries with per-activity time, location, estimated cost, and notes. Hotel options are fetched live from Booking.com via RapidAPI and destination suggestions come from GoAPI with a Nominatim fallback. The edit page features a full itinerary builder: activities can be added, removed, and reordered across days via HTML5 drag-and-drop, with real-time budget recalculation and client-side validation. All trip state is managed through Redux Toolkit with async thunks. The backend has ~90% test coverage via Jest and Supertest, with both controller and model layers fully tested.',
    techStack: [
      'React 19',
      'Redux Toolkit',
      'React Router 7',
      'Vite',
      'Tailwind CSS 4',
      'Axios',
      'Express 5',
      'PostgreSQL',
      'Sequelize',
      'JWT (jsonwebtoken)',
      'bcryptjs',
      'Google Gemini API',
      'Google OAuth 2.0',
      'GitHub OAuth',
      'Booking.com API (RapidAPI)',
      'GoAPI Locations',
      'Jest + Supertest',
      'SweetAlert2',
    ],
    features: [
      'Three auth methods: email/password, Google OAuth 2.0, and GitHub OAuth — all issuing JWT tokens',
      'AI-generated structured itineraries via Google Gemini, scoped to destination, budget, duration, and interests',
      'Live hotel search via Booking.com API with price, rating, photo, and address data',
      'Debounced destination autocomplete backed by GoAPI with Nominatim as a fallback',
      'Full itinerary editor with per-day activity management, drag-and-drop reordering across days, and real-time budget tracking',
      'Redux Toolkit store with async thunks for all CRUD operations, keeping UI in sync without extra fetches',
      'Axios interceptor that auto-attaches JWT and redirects to login on 401',
      'Backend test suite achieving ~90% statement and line coverage via Jest and Supertest',
    ],
    challenges: [
      'Designing the drag-and-drop activity reorder so moving an activity from one day to another correctly adjusts insertion indices without off-by-one errors',
      "Keeping the itinerary editor's budget summary live-recalculating as activities are added, removed, or repriced — solved with a pure recalculation function applied after every mutation",
      'Handling the GitHub OAuth redirect flow across a separate client and server deployment, including fetching the verified email fallback when the public email field is null',
      'Mocking the Gemini AI helper and Axios in Jest to isolate controller logic from external API calls while keeping test assertions meaningful',
    ],
    architectureHighlights: [
      'Backend structured in controllers → routes → middlewares → models layers; authentication and error handling each in dedicated middleware',
      'Redux slice centralises all trip state with optimistic UI updates — the list updates immediately on create/delete without a refetch',
      'Itinerary data stored as a structured JSON column in PostgreSQL, allowing the frontend to read and mutate it directly without extra join tables',
      'Gemini call wrapped in a helper that falls back gracefully — if the API key is absent or the call fails, the trip is still created with a null itinerary rather than blocking the flow',
      'Both client and server are deployed as separate Vercel projects; GitHub OAuth redirect URI is configured to point at the server URL, with the token passed back to the client via query param redirect',
    ],
    screenshots: [
      {
        src: '/tripplanner/landing_page.png',
        alt: 'TripPlanner landing page',
        label: 'Landing Page',
      },
      {
        src: '/tripplanner/my_trips.png',
        alt: 'Trip list dashboard',
        label: 'My Trips',
      },
      {
        src: '/tripplanner/create_trip.png',
        alt: 'Create trip with hotel selection',
        label: 'Create Trip',
      },
      {
        src: '/tripplanner/itinerary_detail.png',
        alt: 'AI-generated itinerary detail view',
        label: 'Itinerary Detail',
      },
    ],
    liveUrl: 'https://individual-project-indra-sanjaya-jl.vercel.app',
    githubUrl: 'https://github.com/indra-sanjaya/individual-project-indra-sanjaya.git',
    status: 'Live',
  },
  {
    id: 'voca',
    title: 'VOCA',
    subtitle: 'GraphQL Social Media Mobile App',
    shortDescription:
      'A full-stack social media mobile app built with React Native (Expo) and a GraphQL API, featuring posts, likes, comments, user search, and a follow system backed by MongoDB and Redis.',
    fullDescription:
      'VOCA is a Twitter-inspired social media platform with a React Native (Expo) frontend and an Apollo Server GraphQL backend. The server exposes a single GraphQL endpoint for all operations: user register/login with bcrypt and JWT, full post CRUD with embedded comments and a toggle-like system, user search by name or username, and a follow/unfollow system. Follower and following lists are resolved via MongoDB aggregation pipelines with $lookup joins. The posts query is cached in Redis and invalidated on any write mutation. On the mobile client, Apollo Client handles all data fetching with a context-based JWT auth link reading tokens from Expo SecureStore. Navigation is split between an unauthenticated stack (Login, Register) and an authenticated stack (tab bar + modal screens for PostDetail and UserProfile), gated by a React Context auth state.',
    techStack: [
      'React Native (Expo)',
      'Apollo Client 4',
      'React Navigation (Stack + Bottom Tabs)',
      'Expo SecureStore',
      'Apollo Server 5',
      'GraphQL',
      'MongoDB (native driver)',
      'Redis (ioredis)',
      'JWT (jsonwebtoken)',
      'bcryptjs',
    ],
    features: [
      'GraphQL API with a single endpoint covering all mutations and queries: register, login, posts, comments, likes, follow, user search, and profile',
      'Toggle-like system: liking an already-liked post removes the like, with per-user isLiked derived field on every post',
      'MongoDB aggregation pipelines with $lookup to resolve follower/following lists and populate comment author details on post detail',
      'Redis post cache with targeted invalidation on createPost, createComment, and createLike mutations',
      'JWT auth context injected per-request; all protected resolvers call auth() to verify the token before proceeding',
      'Expo SecureStore for token persistence; Apollo auth link reads the token asynchronously and injects it into every request header',
      'Auth-gated navigation: RootStack switches between unauthenticated and authenticated screen trees based on React Context state',
      'Follow guard preventing self-follows and duplicate follows at the model layer',
    ],
    challenges: [
      'Designing the isLiked and isFollowed computed fields — these are derived per-request based on the authenticated user, not stored in the database, requiring the resolver to enrich every post and user object after fetching',
      'Wiring Redis cache invalidation correctly across three separate mutations that all modify post state, ensuring stale data never reaches the client',
      'Setting up the Apollo auth link with Expo SecureStore, which is async, requiring setContext to await the token read before forwarding headers',
      'Building the follower/following resolution entirely through MongoDB aggregation pipelines rather than additional round-trip queries',
    ],
    architectureHighlights: [
      "GraphQL type definitions and resolvers are split into three schema modules (user, post, follow) and merged at server entry via Apollo's typeDefs/resolvers arrays",
      'Auth context is a lazy function — resolvers only call auth() when they need it, keeping public resolvers unprotected without special-casing',
      'Redis caching sits entirely inside the posts resolver: cache hit returns enriched data immediately; cache miss fetches from MongoDB, caches the raw result, then enriches',
      'Navigation architecture uses a RootStack that renders entirely different screen sets based on isSignedIn from AuthContext, with no mixed authenticated/unauthenticated routes',
      'PostItem component handles both like and comment mutations inline with refetch callbacks, keeping the home feed and post detail screen always in sync',
    ],
    screenshots: [
      {
        src: '/voca/home_feed.jpg',
        alt: 'VOCA home feed',
        label: 'Home Feed',
      },
      {
        src: '/voca/post_detail.jpg',
        alt: 'Post detail with comments',
        label: 'Post Detail',
      },
      {
        src: '/voca/user_profile.jpg',
        alt: 'User profile with followers',
        label: 'User Profile',
      },
      {
        src: '/voca/user_search.jpg',
        alt: 'User search screen',
        label: 'User Search',
      },
    ],
    liveUrl:
      'https://expo.dev/preview/update?message=server+updated&updateRuntimeVersion=1.0.0&createdAt=2026-03-07T07%3A22%3A20.085Z&slug=exp&projectId=ab66a824-9324-457d-b11f-cd4de7545a7e&group=20503038-5ad8-4974-9528-7ad89dd79d28',
    githubUrl: 'https://github.com/H8-FSJS-P3S6/gc01-indra-sanjaya.git',
    status: 'Live',
  },
];
