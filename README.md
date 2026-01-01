# Gentle Dental Care - Dr. Sarah Mitchell

A modern, responsive website for Dr. Sarah Mitchell's dental practice, featuring cosmetic and family dentistry services.

## Project Overview

This website showcases Dr. Sarah Mitchell's dental practice with over 15 years of expertise in cosmetic and family dentistry. The site includes information about services, patient reviews, appointment booking, and more.

## Technology Stack

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd gentle-dental-care
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
gentle-dental-care/
├── public/          # Static assets
├── src/
│   ├── components/ # React components
│   │   ├── home/   # Home page components
│   │   ├── layout/ # Layout components (Navbar, Footer)
│   │   └── ui/     # Reusable UI components
│   ├── contexts/   # React contexts (Theme)
│   ├── data/       # Static data files
│   ├── hooks/      # Custom React hooks
│   ├── lib/        # Utility functions
│   └── pages/      # Page components
├── index.html      # HTML entry point
└── vite.config.ts  # Vite configuration
```

## Features

- **Responsive Design** - Mobile-first approach with full responsiveness
- **Theme Switching** - Multiple color themes with dark mode support
- **Service Showcase** - Detailed information about dental services
- **Patient Reviews** - Testimonials and reviews section
- **Appointment Booking** - Contact form for booking appointments
- **Smooth Animations** - Elegant animations and transitions

## Building for Production

To create a production build:

```sh
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## Deployment

The built files in the `dist/` directory can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## License

Private project - All rights reserved
