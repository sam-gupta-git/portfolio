# Modern Portfolio Website

A beautiful, modern, and responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Modern Design**: Clean, professional design with smooth animations
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🎨 **Smooth Animations**: Powered by Framer Motion for delightful interactions
- ⚡ **Fast Performance**: Built with Next.js for optimal performance
- 🎯 **SEO Optimized**: Proper metadata and semantic HTML structure
- 🌙 **Accessibility**: Built with accessibility best practices in mind

## Sections

- **Hero**: Eye-catching introduction with animated background elements
- **About**: Personal information, skills, and experience timeline
- **Projects**: Showcase of your work with filtering capabilities
- **Contact**: Contact form and social media links

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Accessible UI components

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update the description text
   - Update social media links

2. **About Section** (`src/components/About.tsx`):
   - Update the about text
   - Modify skills array with your skills
   - Update the technologies list
   - Modify experience timeline

3. **Projects Section** (`src/components/Projects.tsx`):
   - Replace the projects array with your actual projects
   - Update project images, descriptions, and links
   - Modify technologies used

4. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information
   - Modify social media links

5. **Footer** (`src/components/Footer.tsx`):
   - Update personal information and links

6. **Layout** (`src/app/layout.tsx`):
   - Update metadata with your information
   - Change title, description, and social media handles

### Styling

The website uses Tailwind CSS for styling. You can customize:

- Colors in the `tailwind.config.js` file
- Typography in the global CSS file
- Component-specific styles in individual component files

### Adding New Sections

To add new sections:

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Add navigation link in `src/components/Navigation.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Performance Optimization

The website includes several performance optimizations:

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts and assets
- Smooth scrolling and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, feel free to open an issue or contact me directly.

---

Made with ❤️ using Next.js, Tailwind CSS, and Framer Motion