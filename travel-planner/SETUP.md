# Travel Planner - Setup & Execution Guide

## Quick Start (3 Steps)

```bash
# 1. Navigate to travel-planner directory
cd c:\Users\v-tianji\Desktop\ghcpd\Claude-haiku-4.5\travel-planner

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Then open http://localhost:3000 in your browser.

## Installation

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js

### Full Installation Steps

```bash
# Change to project directory
cd c:\Users\v-tianji\Desktop\ghcpd\Claude-haiku-4.5\travel-planner

# Install all dependencies (creates node_modules folder)
npm install

# This installs:
# - React 18.2.0
# - Vite 5.0.8
# - Vitest 1.0.4
# - React Testing Library 14.1.2
# - Lucide React icons
# - All other dependencies
```

**Duration**: ~2 minutes (first time, downloads ~300MB)

## Running the Application

### Development Server (with hot reload)

```bash
npm run dev
```

**Output**:
```
> travel-planner@1.0.0 dev
> vite

  VITE v5.4.21  ready in 778 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ Open http://localhost:3000 in your browser
✅ App automatically reloads when you make changes
✅ Press `q` to stop the server

### Available Features

1. **Browse Destinations**
   - 6 default destinations
   - Click ❤️ to add/remove favorites
   - Click "Create Trip" to start planning

2. **Create Trips**
   - Click "Create Trip" or navigate to Trips tab
   - Fill in trip name, destination, and dates
   - Submit to save

3. **Plan Itineraries**
   - Click "View Details" on any trip
   - Select date and enter activities
   - Click "Add" to save activities

4. **Manage Favorites**
   - Click heart icon on destinations
   - View all favorites in "Favorites" tab
   - Data persists across sessions

## Running Tests

### Run All Tests (Single Run)

```bash
npm test -- --run
```

**Expected Output**:
```
Test Files  3 passed (3)
     Tests  33 passed (33)
Duration   9.32s
```

### Run Tests in Watch Mode

```bash
npm test
```

✅ Tests re-run automatically when files change
✅ Press `q` to exit watch mode

### Test Coverage Report

```bash
npm run test:coverage
```

Generates coverage report in `coverage/` folder.

### Test UI Dashboard

```bash
npm run test:ui
```

Opens interactive test dashboard in browser.

## Building for Production

### Create Optimized Build

```bash
npm run build
```

**Output**:
```
vite v5.4.21 building for production...
✓ 1367 modules transformed.

dist/index.html              0.85 kB │ gzip:  0.51 kB
dist/assets/index-B64_JQWV.css    6.33 kB │ gzip:  1.82 kB
dist/assets/index-BfKYzDkF.js   161.01 kB │ gzip: 51.27 kB
✓ built in 22.79s
```

✅ Output in `dist/` folder
✅ Ready for deployment

### Preview Production Build

```bash
npm run preview
```

Opens production build locally at http://localhost:4173

## All Available Commands

| Command | Purpose | Duration |
|---------|---------|----------|
| `npm run dev` | Start development server | Instant |
| `npm test` | Run tests in watch mode | Instant |
| `npm test -- --run` | Run all tests once | ~9 seconds |
| `npm run test:coverage` | Generate coverage report | ~15 seconds |
| `npm run test:ui` | Open test UI | Instant |
| `npm run build` | Build for production | ~23 seconds |
| `npm run preview` | Preview production build | Instant |

## Folder Structure

```
travel-planner/
├── src/
│   ├── components/          # React components
│   ├── utils/               # Logic functions
│   ├── styles/              # CSS styling
│   ├── __tests__/           # Test files
│   ├── main.jsx             # Entry point
│   └── App.jsx              # Root component
├── dist/                    # Production build (after npm run build)
├── node_modules/            # Dependencies (after npm install)
├── index.html               # HTML template
├── package.json             # Project configuration
├── vite.config.js           # Build configuration
├── vitest.config.js         # Test configuration
├── README.md                # Full documentation
├── PROJECT_REPORT.md        # Detailed report
└── SETUP.md                 # This file
```

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is busy:

```bash
# Windows: Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3001
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir node_modules /s /q
del package-lock.json

# Reinstall
npm install
```

### Tests Failing

```bash
# Clear test cache
npx vitest --clearCache

# Run tests again
npm test -- --run
```

### Build Errors

```bash
# Clear Vite cache
rmdir .vite /s /q

# Rebuild
npm run build
```

## System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| Node.js | 16.x | 18.x or 20.x |
| npm | 7.x | 9.x or 10.x |
| RAM | 2GB | 4GB+ |
| Disk Space | 500MB | 1GB+ |
| Browser | Modern | Chrome/Firefox/Safari/Edge |

## Verification Steps

After setup, verify everything works:

```bash
# 1. Check Node.js version
node --version        # Should be v16.0.0 or higher

# 2. Check npm version
npm --version         # Should be 7.0.0 or higher

# 3. Install dependencies
npm install          # Should complete without errors

# 4. Run tests
npm test -- --run    # Should show: 33 passed

# 5. Start dev server
npm run dev          # Should start on http://localhost:3000

# 6. Open in browser
# Navigate to http://localhost:3000
# You should see the Travel Planner app with:
# - Purple gradient background
# - Navigation tabs (Destinations, Trips, Favorites)
# - 6 destination cards
# - Fully interactive UI
```

## Performance Notes

- **Dev Server Startup**: ~800ms
- **Hot Reload**: <500ms
- **Test Suite**: ~9.3 seconds
- **Production Build**: ~23 seconds
- **Bundle Size**: 161KB (uncompressed), 51KB (gzipped)

## Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build first
npm run build

# Deploy dist/ folder via Netlify dashboard
# Or use CLI: npm i -g netlify-cli && netlify deploy
```

### GitHub Pages

```bash
# Build
npm run build

# Deploy dist/ folder to GitHub Pages
```

### Traditional Hosting

```bash
# Build
npm run build

# Upload dist/ folder contents to web server
```

## Next Steps

1. **Explore Features**: Test all functionality in the browser
2. **Read README.md**: Learn about features in detail
3. **Review Tests**: Check `src/__tests__/` for code examples
4. **Customize**: Modify components and styling
5. **Extend**: Add new features and destinations

## Support & Documentation

- **Main Documentation**: See [README.md](README.md)
- **Detailed Report**: See [PROJECT_REPORT.md](PROJECT_REPORT.md)
- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Vitest Docs**: https://vitest.dev/

## Success Checklist

- [x] Node.js and npm installed
- [x] Dependencies installed (`npm install`)
- [x] Tests passing (`npm test -- --run`)
- [x] Dev server running (`npm run dev`)
- [x] App visible in browser (http://localhost:3000)
- [x] All features working
- [x] Production build created (`npm run build`)
- [x] Ready for deployment

---

**Happy Planning! 🌍✈️**
