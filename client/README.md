# Computer Science Society (CSS) - GC University Lahore

A modern, responsive website for the Computer Science Society at GC University Lahore, showcasing the society's mission, events, team members, and announcements.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Modern Design** - Beautiful, gradient-enhanced UI with smooth animations
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Fast Performance** - Built with Vite for lightning-fast development and production builds
- **Smooth Navigation** - Intuitive navigation with smooth scrolling between sections
- **Interactive Elements** - Hover effects, animations, and engaging components
- **Brand Colors** - Custom color scheme reflecting CSS identity
- **Accessibility** - Semantic HTML and ARIA-compliant components

## Sections

### Home

- Eye-catching hero section with welcoming message
- Call-to-action buttons directing to events
- Statistics showcasing society achievements (20+ years, 500+ members, 50+ events)

### About (Mission & Vision)

- Detailed mission statement
- Core values: Creativity, Innovation, Strategy
- Five key focus areas:
     - Brand Strategy
     - Web Development
     - Digital Marketing
     - UX/UI Design
     - Analytics & Reporting

### Events

- Showcase of major society events
- Event details and dates
- Call-to-action buttons for participation
- Portfolio presentation

### Team

- Meet the creative minds behind CSS
- Team member profiles with roles
- Social media links (LinkedIn, GitHub)
- Key leadership positions displayed

### News & Announcements

- Student testimonials
- Success statistics (91% recommendation rate)
- Latest updates and achievements
- Member stories and feedback

### Contact

- Contact information (email, location, office hours)
- Social media links (Facebook, Instagram, LinkedIn, GitHub)
- Easy communication channels
- Partnership opportunities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

      ```bash
      git clone https://github.com/MAhmad25/CSS-Society-Project.git
      cd CSS-Society-Project
      ```

2. **Install dependencies**

      ```bash
      npm install
      ```

3. **Start the development server**
      ```bash
      npm run dev
      ```
      The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
CSS-Society-Project/
├── src/
│   ├── App.jsx                 # Main application component with navigation
│   ├── App.css                 # Application styles
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   ├── Home/
│   │   ├── AboutUs.jsx        # About section component
│   │   └── MissionVision.jsx   # Mission & Vision component
│   ├── Events/
│   │   └── Events.jsx          # Events showcase component
│   ├── Team/
│   │   └── Team.jsx            # Team members component
│   ├── Announcements/
│   │   └── Announcement.jsx    # News & testimonials component
│   ├── Contact/
│   │   └── Contact.jsx         # Contact information component
│   └── Squares/
│       └── Squares.jsx         # Utility component
├── public/
│   ├── images/                 # Image assets
│   └── events/                 # Event images
├── package.json                # Project dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

## Technologies Used

- **React 19.2.0** - UI library for building interactive components
- **Vite** - Next-generation frontend build tool
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **JavaScript (ES6+)** - Modern JavaScript syntax

## Customization

### Colors

Colors can be customized in `tailwind.config.js`. The project uses a color scheme with:

- Primary: Blue (`bg-blue-600`, `text-blue-900`)
- Accent: Yellow (`bg-yellow-300`)
- Neutral: Grays for text and backgrounds

### Images

Replace images in the `public/images/` directory:

- Logo: `public/images/logo.jpg`
- Team images: `public/images/{name}.webp`
- Event images: `public/events/`

### Content

Edit component files in `src/` to update:

- Text content and messaging
- Team member information
- Event details
- Contact information

## Navigation

The website features smooth scroll navigation with:

- **Floating Navigation Bar** - Fixed header with navigation links
- **Mobile Menu** - Hamburger menu for smaller screens
- **Smooth Scrolling** - Animated section transitions
- **Active State Indicator** - Shows current section in navigation

## Performance Optimizations

- Code splitting with Vite
- Optimized images with modern formats
- CSS purging with TailwindCSS
- Lazy loading for components
- Intersection Observer for animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact Information

- **Email**: css@gcu.edu.pk
- **Location**: GC University Lahore, Katchery Road
- **Office Hours**: Mon-Fri, 9AM-5PM
- **Social Media**:
     - Facebook
     - Instagram
     - LinkedIn
     - GitHub

## History

- **Founded**: 2002
- **Members**: 500+ active members
- **Events Annually**: 50+
- **Partner Companies**: 10+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Development Team

**CSS Tech Team** - Crafted with love

## Acknowledgments

- GC University Lahore for supporting the society
- All team members and contributors
- The open-source community for amazing tools and libraries

---

**Made with love by the Computer Science Society**

_Last Updated: November 2025_
