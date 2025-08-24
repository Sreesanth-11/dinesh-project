# Evently - University Event Management System

A modern, responsive React application designed specifically for university students to discover, register for, and manage campus events. Built with mobile-first design principles and optimized for all screen sizes.

## 🌟 Features

### 🏠 Homepage
- **Hero Section** with compelling call-to-action
- **Featured Events** showcase with registration functionality
- **Search & Filter** system for easy event discovery
- **Why Choose Us** section highlighting key benefits

### 📅 Events Page
- **Advanced Filtering** by category, date, price, location, and format
- **Grid/List View** toggle for different viewing preferences
- **Sorting Options** by date, price, popularity, and recommendations
- **Pagination** for efficient browsing
- **Mobile-responsive** filter sidebar

### ℹ️ About Page
- **Mission Statement** and company values
- **Statistics Dashboard** showing platform metrics
- **Team Profiles** with member information
- **Press & Resources** section for media and documentation

### 👤 Profile Page
- **User Dashboard** with activity overview and statistics
- **Event Management** for created and registered events
- **Interactive Calendar** with event indicators
- **Recent Activity** feed
- **Tabbed Navigation** for different event categories

### 📱 Mobile-First Design
- **Responsive Layout** optimized for all screen sizes
- **Touch-friendly** buttons and interactions (44px minimum)
- **Mobile Navigation** with hamburger menu
- **Swipe-friendly** components and gestures
- **Optimized Typography** that scales appropriately

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evently-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation header
│   ├── Footer/          # Site footer
│   ├── EventCard/       # Event display component
│   ├── SearchSection/   # Search functionality
│   └── Calendar/        # Calendar component
├── pages/               # Main page components
│   ├── Home/           # Homepage
│   ├── Events/         # Events listing page
│   ├── About/          # About us page
│   └── Profile/        # User profile page
├── contexts/           # React contexts
│   └── NotificationContext.js  # Global notifications
├── App.js              # Main app component
├── App.css             # App-level styles
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: #4f46e5 (Indigo)
- **Secondary**: #f1f5f9 (Slate)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Gradients**: Purple to blue gradients for hero sections

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive scaling** for different screen sizes

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📱 Mobile Optimization

### Touch-Friendly Design
- **Minimum touch targets**: 44px x 44px
- **Adequate spacing** between interactive elements
- **Large, easy-to-tap** buttons and links

### Performance Optimizations
- **Lazy loading** for images
- **Code splitting** for faster initial load
- **Optimized bundle size** with tree shaking
- **Efficient re-renders** with React best practices

### Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast mode** support
- **Reduced motion** preferences respected

## 🔧 Key Technologies

- **React 18** - Modern React with hooks and concurrent features
- **React Router 6** - Client-side routing
- **CSS3** - Modern CSS with Grid, Flexbox, and custom properties
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Inter font family)

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📋 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality stock images
- **Font Awesome** for comprehensive icon library
- **Google Fonts** for the Inter font family
- **React Community** for excellent documentation and resources

## 📞 Support

For support, email support@evently.com or create an issue in the repository.

---

**Built with ❤️ for university students everywhere**
