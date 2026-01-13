# Sai Dheeraj Portfolio

A beautiful, modern portfolio website showcasing projects and professional work. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, responsive layout with pastel color scheme
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Fully Responsive**: Optimized for all device sizes
- **Accessible**: WCAG 2.2 AA compliant with semantic HTML
- **Performance Optimized**: Fast loading with optimized assets

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── projects/          # Projects showcase
│   ├── about/             # About me page
│   ├── contact/           # Contact form
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **State**: Zustand

## 🎨 Design System

- **Primary Color**: #3B82F6 (Blue)
- **Secondary Color**: #34D399 (Green)
- **Typography**: Inter font family
- **Spacing**: Consistent 4-point grid system
- **Animations**: Ease-in-out transitions

## 📱 Pages

### Landing Page
- Hero section with call-to-action
- Featured projects preview
- Skills showcase
- Social links integration

### Projects Page
- Project gallery with filtering
- Search functionality
- Category tabs
- Live demo and code links

### About Page
- Personal story
- Experience timeline
- Education background
- Skills overview

### Contact Page
- Contact form with validation
- Multiple contact methods
- FAQ section
- Social media links

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information
Update your personal details in:
- `src/app/page.tsx` - Hero section
- `src/app/about/page.tsx` - About page
- `src/app/contact/page.tsx` - Contact information

### Projects
Add your projects in `src/app/projects/page.tsx` by updating the projects array.

### Social Links
Update social media links in:
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`

### Styling
Customize colors and themes in `src/styles/globals.css`.

## 🌟 Features Implemented

✅ Landing page with hero section  
✅ Projects showcase with filtering  
✅ About page with experience timeline  
✅ Contact page with form validation  
✅ Dark/light mode toggle  
✅ Responsive design  
✅ Smooth animations  
✅ Accessibility features  
✅ Performance optimizations  
✅ Reusable UI components  

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 📧 Contact

- **LinkedIn**: [https://www.linkedin.com/in/sai-dheeraj-a1145830b/](https://www.linkedin.com/in/sai-dheeraj-a1145830b/)
- **GitHub**: [https://github.com/SaiDheeraj-19](https://github.com/SaiDheeraj-19)
- **Email**: 16saidheeraj@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
