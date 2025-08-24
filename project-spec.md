# SwiftSwap Project Specification

## Project Overview

SwiftSwap is an HTML syntax conversion tool designed specifically for travel websites, providing an intuitive web interface that allows users to input original HTML syntax and convert it to target format in real-time.

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Deployment Platform**: GitHub Pages
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS

## Project Structure

```
swift-swap/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SyntaxConverter.tsx    # Main converter component
│   │   ├── TextAreaPanel.tsx      # Text area component
│   │   ├── ConvertButton.tsx      # Convert button component
│   │   └── TabView.tsx            # Mobile tab view component
│   ├── utils/
│   │   └── syntaxTransform.ts     # Syntax transformation logic
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment config
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Core Feature Requirements

### 1. Main Interface Layout
- **Left Input Area**: 
  - Resizable textarea
  - Occupies left half of the screen
  - Syntax highlighting support (optional)
  - Placeholder to guide users to input HTML syntax

- **Right Output Area**:
  - Textarea with same height as left side
  - Occupies right half of the screen
  - Read-only mode
  - Display converted results

- **Center Convert Button**:
  - Located between two textareas
  - Click to trigger syntax conversion
  - Provide conversion status feedback (loading/success/error)

### 2. Responsive Design
- **Desktop**: Side-by-side layout with input and output areas
- **Mobile**: Tab-based interface
  - Tab 1: Input area for original syntax
  - Tab 2: Output area for converted results
  - Convert button available on both tabs
- Maintain good usability and visual effects across all devices

### 3. User Experience
- Real-time syntax validation
- Error handling and user notifications
- Conversion history (optional)
- One-click clear functionality

## Syntax Transformation Logic

The specific rules and implementation details for syntax conversion will be defined in `src/utils/syntaxTransform.ts`. This file should include:

- Transformation rule definitions
- HTML parsing logic
- Travel website-specific syntax processing
- Error handling mechanisms

## Deployment Configuration

### GitHub Actions Auto-deployment
- **Trigger Condition**: Push to main branch
- **Build Process**: 
  1. Install dependencies
  2. Execute build (`yarn build`)
  3. Deploy to GitHub Pages

### Vite Configuration Requirements
```typescript
// vite.config.ts basic configuration
export default defineConfig({
  base: '/swiftswap/', // GitHub Pages path
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  // Other configurations...
})
```

### Tailwind CSS Setup
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Development Commands

```bash
# Install dependencies
yarn install

# Development mode
yarn dev

# Build production version
yarn build

# Preview build results
yarn preview

# Type checking
yarn type-check

# Tailwind CSS utilities
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

## Quality Requirements

- **Maintainability**: Modular component design, clear code structure
- **Performance**: Large file processing optimization, avoid UI blocking
- **Accessibility**: Keyboard operation support, appropriate ARIA labels
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)

## Future Extension Considerations

- Multi-language support
- Syntax template presets
- Batch file processing
- More output format support

## Important Notes

1. All syntax conversion logic should be completed on the frontend, without relying on backend services
2. Ensure correct GitHub Pages deployment configuration, including appropriate base path
3. Consider performance handling for large HTML files
4. Provide clear error messages and usage instructions
5. Implement smooth tab transitions for mobile interface using Tailwind CSS animations
6. Ensure the convert button is accessible and functional on both mobile tabs