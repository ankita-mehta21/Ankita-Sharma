# Ankita Sharma - Dental Portfolio

A portfolio site for Dr. Ankita Sharma, showcasing clinical experience, education, certifications, publications, and patient reviews.

## Project Overview

This website presents Dr. Ankita Sharma's professional portfolio, including clinical roles, research publications, and a patient review submission workflow. It is designed as a personal portfolio rather than a clinic website.

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
`sh
git clone <repository-url>
cd gentle-dental-care
`

2. Install dependencies:
`sh
npm install
`

3. Start the development server:
`sh
npm run dev
`

The application will be available at http://localhost:8080

### Available Scripts

- 
pm run dev - Start development server
- 
pm run build - Build for production
- 
pm run build:dev - Build in development mode
- 
pm run preview - Preview production build
- 
pm run lint - Run ESLint

## Project Structure

`
gentle-dental-care/
|-- public/          # Static assets
|-- src/
|   |-- components/  # React components
|   |   |-- home/     # Home page components
|   |   |-- layout/   # Layout components (Navbar, Footer)
|   |   -- ui/       # Reusable UI components
|   |-- data/         # Static data files
|   |-- hooks/        # Custom React hooks
|   |-- lib/          # Utility functions
|   -- pages/        # Page components
|-- index.html        # HTML entry point
-- vite.config.ts    # Vite configuration
`

## Features

- **Portfolio Focus** - Education, experience, certifications, and publications
- **Patient Reviews** - Testimonials and a review submission form
- **Contact Form** - Inquiries and collaboration requests
- **Classic Medical Blue Theme** - Consistent, professional styling
- **Responsive Design** - Mobile-first layout with smooth animations

## Building for Production

To create a production build:

`sh
npm run build
`

The build output will be in the dist/ directory, ready for deployment to any static hosting service.

## Deployment

The built files in the dist/ directory can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## License

Private project - All rights reserved
