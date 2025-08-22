# RecruitCRM Company Profile - Next.js Application

A modern, fully functional Company Profile page for RecruitCRM built with Next.js 14, React 18, and Tailwind CSS. Features comprehensive dark mode support, responsive design, and enhanced user experience.

## 🚀 Live Demo
[View Live Application](https://recruit-crm.vercel.app/) - Deployed on Vercel

## ✨ Key Features

### 🌓 Dark Mode Support
- **Toggle Theme**: Seamless dark/light mode switching
- **System Preference**: Respects user's system theme preference
- **Consistent Theming**: Dark mode applied across all components
- **Enhanced Contrast**: Optimized text visibility and accessibility

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Layouts**: Smart sidebar behavior on mobile
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Breakpoint Optimization**: sm, md, lg, xl responsive breakpoints

### 👥 Enhanced Contact Management
- **Visual Contact Cards**: Professional avatar-based contact display
- **Complete Information**: Name, role, email, and phone clearly visible
- **Hover Interactions**: Card enlargement and enhanced visibility on hover
- **Click-to-Contact**: Direct email and phone interaction

### 🎯 Fully Functional UI Elements
- **Quick Action Buttons**: Log Call, Log Email, Add Note, Schedule Meeting
- **Job Management**: Add Job, Delete Job, View Pipeline, Filter Jobs
- **Interactive Tabs**: Jobs, Hotlists, Deals, Emails, Candidates with smooth transitions
- **Modal Systems**: Add Job modal, Activity logging modals
- **Search & Filter**: Functional search bar and filter controls
- **Real-time Updates**: State management for all interactions

### 🎨 Modern UI/UX Design
- **Lucide React Icons**: Professional, consistent icon system
- **Gradient Backgrounds**: Beautiful backdrop blur effects
- **Smooth Animations**: Transform and transition effects
- **Loading States**: Pulse animations and visual feedback
- **Custom Scrollbars**: Styled scrollbars with dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: React 18 with Hooks
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React 0.292.0
- **Deployment**: GitHub Pages
- **Development**: Hot reload with npm run dev

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/KTK69/RecruitCRM-.git
cd RecruitCRM-/nextjs-wireframe
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open in Browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-wireframe/
├── app/
│   ├── layout.js          # Root layout with metadata and fonts
│   ├── page.js            # Main company profile application (1900+ lines)
│   └── globals.css        # Global styles with Tailwind + custom scrollbars
├── public/                # Static assets and deployment files
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── next.config.js         # Next.js configuration with GitHub Pages support
└── package.json          # Dependencies and scripts
```

## 🎯 Key Improvements & Features

### � Dark Mode Implementation
- **Global Theme State**: React useState for theme management
- **Document-Level Classes**: Automatic dark class application
- **Component-Level Theming**: All components support dark mode variants
- **Enhanced Visibility**: High contrast colors for better readability
- **Custom Scrollbars**: Dark mode scrollbar styling in globals.css

### � Mobile & Responsive Design
- **Sidebar Management**: Mobile-friendly collapsible sidebars
- **Touch Interactions**: Optimized for mobile touch patterns
- **Adaptive Typography**: Responsive text sizes and spacing
- **Mobile Navigation**: Hamburger menus and overlay patterns
- **Flexible Layouts**: CSS Grid and Flexbox for all screen sizes

### 👥 Contact Section Enhancements
- **Avatar System**: Dynamic initials-based avatars
- **Complete Information Display**: Name, role, email, phone all visible
- **Hover Effects**: Card scaling and enhanced contrast on hover
- **No Truncation**: Full email addresses visible without cutoff
- **Icon Integration**: Mail and phone icons next to respective information
- **Clean Layout**: Removed duplicate action buttons for clarity

### 🎨 UI/UX Improvements
- **Gradient Backgrounds**: Subtle gradients with backdrop blur
- **Transform Animations**: Scale, translate, and shadow effects
- **Color Coding**: Status-based color schemes for jobs and activities
- **Professional Icons**: Lucide React icon system throughout
- **Consistent Spacing**: Tailwind spacing system for uniformity

## 🔧 Functional Components

### Tab System (Jobs, Hotlists, Deals, Emails, Candidates)
```javascript
// Interactive tab navigation with content switching
- Jobs: Full job management with add/delete functionality
- Hotlists: Candidate list management
- Related Deals: Sales pipeline integration  
- Related Emails: Email communication history
- Candidate Sections: Pitched and Employed candidate tracking
```

### Modal System
```javascript
// Multiple modal types with form validation
- Add Job Modal: Complete job creation form
- Activity Logging: Call, Email, Note, Meeting modals
- Backdrop Controls: Click-to-close and ESC key support
- Form State Management: Real-time validation and updates
```

### State Management
```javascript
// React hooks for application state
- Theme State: isDarkMode with localStorage persistence
- Sidebar State: Mobile sidebar visibility controls
- Form Data: Real-time form input handling
- Activity Data: Dynamic content updates and filtering
```

## 📊 Data Structure

### Company Information
- Basic company details (name, location, industry)
- Contact management with role-based organization
- Website and social media integration
- Address and geographical information

### Job Management
- Job creation with title, location, contact, owner
- Status tracking (Open, Closed, In Review)
- Pipeline metrics (candidates in pipeline, placed, total)
- Delete functionality with state updates

### Activity Tracking  
- Comprehensive activity logging (calls, tasks, meetings, files)
- Real-time activity counters and filtering
- Quick action buttons for common tasks
- Search functionality across all activities

## 🌐 Deployment

### GitHub Pages Setup
```bash
# Build and deploy to GitHub Pages
npm run build
npm run deploy
```

### Environment Configuration
- **Base Path**: Configured for GitHub Pages deployment
- **Static Export**: Next.js configured for static site generation
- **Asset Optimization**: Images and assets optimized for production

## 🔧 Browser Support & Performance

### Supported Browsers
- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Safari ✅
- Chrome Mobile ✅

### Performance Features
- **Next.js 14 App Router**: Latest routing and performance optimizations
- **Code Splitting**: Automatic code splitting for optimal loading
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size
- **Image Optimization**: Next.js built-in image optimization
- **Lazy Loading**: Modal and component lazy loading

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Focus Management**: Proper focus handling in modals and forms
- **Color Contrast**: WCAG-compliant color contrast ratios
- **Semantic HTML**: Proper heading hierarchy and semantic structure
- **Screen Reader Support**: Optimized for assistive technologies

## 🎯 User Experience Highlights

### Scanning & Navigation
- **Information Hierarchy**: Clear visual hierarchy for quick scanning
- **Quick Actions**: One-click access to common recruiting tasks
- **Search Integration**: Fast search across all content sections
- **Filter Controls**: Dynamic filtering for jobs and activities

### Task Efficiency  
- **2-Click Job Creation**: Streamlined job addition process
- **1-Click Activity Logging**: Quick activity entry with pre-filled forms
- **Instant Updates**: Real-time state updates without page refresh
- **Status Management**: Quick status changes with visual feedback

### Visual Design
- **Professional Aesthetics**: Clean, modern design language
- **Consistent Branding**: RecruitCRM color scheme and typography
- **Interactive Feedback**: Hover states, animations, and transitions
- **Loading States**: Smooth loading indicators and skeleton screens

---

## 🚀 Production Ready

This application is **fully functional and production-ready** with:
- ✅ Complete feature implementation
- ✅ Comprehensive error handling  
- ✅ Mobile-responsive design
- ✅ Dark mode support
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ Cross-browser compatibility

**Live Demo**: [https://ktk69.github.io/RecruitCRM-/](https://ktk69.github.io/RecruitCRM-/)

---

*Built with ❤️ using Next.js, and Tailwind CSS*
