<div align="center">
  <h1 align="center">Sai Dheeraj | Portfolio</h1>
  <p align="center">
    A premium, high-performance developer portfolio engineered with Next.js 14, TypeScript, and Tailwind CSS.
    <br />
    <a href="https://portfolio-saidheeraj.vercel.app/"><strong>View Live Site »</strong></a>
  </p>
</div>

---

## ✦ Overview

An executive-level digital portfolio designed to showcase production-grade web applications, backend infrastructure, and scalable mobile solutions. The architecture emphasizes a minimalist, Awwwards-winning aesthetic combined with uncompromising performance and modern web standards.

## ✦ Architecture & Tech Stack

This project is built on a bleeding-edge modern stack, ensuring optimal performance, SEO, and developer experience.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Custom Design System)
- **Animation:** Framer Motion & CSS Micro-interactions
- **Components:** Radix UI & shadcn/ui
- **Icons:** Lucide React
- **Email API:** Resend (Serverless Edge Functions)
- **State Management:** Zustand
- **Deployment:** Vercel

## ✦ Key Features

- **Premium UI/UX:** Clean, typographic-driven layout inspired by high-end design agencies.
- **Theme Awareness:** Seamless Dark/Light mode switching utilizing `next-themes` and CSS variables.
- **Dynamic Routing:** Highly optimized dedicated pages for Projects, Experience, and Certifications.
- **Serverless API Integration:** A fully functional, secure contact form powered by the Resend API that dispatches direct emails.
- **Performance Optimized:** Achieving near-perfect Core Web Vitals through aggressive image optimization, Next.js static generation, and Turbopack.
- **Responsive Geometry:** Fluid layouts that scale gracefully from ultra-wide desktop monitors to mobile viewports.

## ✦ Local Development

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaiDheeraj-19/Portfolio-.git
   cd Portfolio-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Resend API key for the contact form:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Boot the development server**
   ```bash
   npm run dev
   ```
   *Navigate to [http://localhost:3000](http://localhost:3000) to view the application.*

## ✦ Project Structure

```text
src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── about/              # Professional CV & Timeline
│   ├── api/contact/        # Resend API Serverless Route
│   ├── contact/            # Minimalist Direct Contact Interface
│   ├── experience/         # Detailed Work History
│   ├── projects/           # Curated Project Index
│   └── page.tsx            # Hero Landing Page
├── components/             # Reusable UI Architecture
│   ├── layout/             # Navigation & Footer Shells
│   ├── ui/                 # Atomic UI Components
│   └── react-bits/         # Complex Interactive Visuals
├── lib/                    # Core Utilities & Types
└── styles/                 # Global Tailwind Typography & Variables
```

## ✦ Connect

- **LinkedIn**: [sai-dheeraj-a1145830b](https://www.linkedin.com/in/sai-dheeraj-a1145830b/)
- **GitHub**: [SaiDheeraj-19](https://github.com/SaiDheeraj-19)
- **Email**: [16saidheeraj@gmail.com](mailto:16saidheeraj@gmail.com)

---
*Engineered by Sai Dheeraj.*
