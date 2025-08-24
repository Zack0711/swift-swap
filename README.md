# SwiftSwap - HTML Syntax Converter

A modern, responsive web application that converts HTML syntax for multiple frameworks in real-time. Built with React 18+, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Conversion Engine
- **Multi-Framework Support**: Convert HTML for React/JSX, Vue.js, Angular, and Web Components
- **Rule Set Selection**: Choose framework-specific transformation rules from header dropdown
- **Real-time Conversion**: Instantly apply selected transformations to your HTML
- **Intelligent Transformations**: Context-aware attribute, tag, and syntax conversions

### User Interface
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Desktop Layout**: Side-by-side input and output panels with rule selector
- **Mobile Layout**: Tab-based interface with smooth transitions
- **Framework Icons**: Visual indicators for each supported framework

### Analytics & Statistics
- **Real-time Metrics**: Track modifications, additions, and removals line-by-line
- **Transformation Details**: Monitor attribute changes, tag modifications, comment conversions
- **Performance Insights**: View processing time and conversion accuracy
- **Interactive Dashboard**: Collapsible statistics panel with detailed breakdowns

### User Experience
- **Persistent Preferences**: Automatically saves your preferred framework selection
- **Error Handling**: Comprehensive error messages and validation
- **Loading States**: Visual feedback during conversion process
- **One-Click Clear**: Easy reset functionality
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Deployment**: GitHub Pages via GitHub Actions
- **Package Manager**: Yarn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/swift-swap.git
   cd swift-swap
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/swift-swap/
   ```

## 🏗️ Project Structure

```
swift-swap/
├── docs/specs/              # Project specifications
│   ├── v1.0.0-spec.md      # Version 1.0.0 specification  
│   └── v1.1.0-spec.md      # Version 1.1.0 specification
├── src/
│   ├── components/          # React components
│   │   ├── SyntaxConverter.tsx    # Main converter component
│   │   ├── TextAreaPanel.tsx      # Input/output text areas
│   │   ├── ConvertButton.tsx      # Conversion button
│   │   ├── TabView.tsx            # Mobile tab interface
│   │   ├── RuleSelector.tsx       # Framework rule selector
│   │   ├── StatisticsPanel.tsx    # Conversion statistics display
│   │   └── StatisticsCard.tsx     # Individual metric cards
│   ├── utils/
│   │   ├── syntaxTransform.ts     # Legacy conversion logic
│   │   ├── ruleSetManager.ts      # Multi-framework rule engine
│   │   └── statisticsCalculator.ts # Statistics calculation engine
│   ├── types/
│   │   ├── rulesets.ts            # Rule set type definitions
│   │   └── statistics.ts          # Statistics interfaces
│   ├── App.tsx              # Root component with rule selector
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .github/workflows/       # GitHub Actions
└── dist/                    # Build output
```

## 📱 Usage

### Framework Selection
1. **Choose Your Framework**: Use the dropdown in the header to select your target framework:
   - ⚛️ **React/JSX**: Convert to React JSX syntax (className, htmlFor, JSX comments)
   - 🟢 **Vue.js**: Convert to Vue template syntax (v-bind, v-on, dynamic bindings)
   - 🅰️ **Angular**: Convert to Angular template syntax (property/event binding)
   - 🧩 **Web Components**: Convert for custom elements and web standards

### Desktop Experience
1. Select your target framework from the header dropdown
2. Enter your HTML syntax in the left input panel
3. Click the "Convert" button to apply framework-specific transformations
4. View the converted syntax in the right output panel
5. Review detailed conversion statistics in the expandable panel below
6. Use "Clear All" to reset both panels

### Mobile Experience
1. Select your framework from the header dropdown
2. Use the "Input HTML" tab to enter your syntax
3. Tap "Convert" to process the conversion with selected rules
4. Automatically switches to "Converted HTML" tab to show results
5. Scroll down to view conversion statistics
6. Use the "Clear" button in the input tab to reset

### Statistics Dashboard
- **Overview**: Line-by-line changes (modified, added, removed, unchanged)
- **Transformations**: Detailed breakdown by type (attributes, tags, comments, case)
- **Details**: Processing time, accuracy percentage, character counts, active rule set

## ⚡ Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn type-check   # Run TypeScript type checking
yarn lint         # Run ESLint
```

## 🔄 Framework-Specific Transformations

### React/JSX Transformations
- `class="..."` → `className="..."` (JSX attribute)
- `for="..."` → `htmlFor="..."` (JSX attribute)
- `<!-- comment -->` → `{/* comment */}` (JSX comments)
- `<br>` → `<br />` (Self-closing tags)
- `<hr>` → `<hr />` (Self-closing tags)
- `<img>` → `<img />` (Self-closing tags)
- `kebab-case` → `camelCase` (Attribute names)

### Vue.js Transformations
- `class="..."` → `:class="..."` (Dynamic class binding)
- `onclick="..."` → `@click="..."` (Event binding)
- `onchange="..."` → `@change="..."` (Event binding)
- `style="..."` → `:style="..."` (Dynamic style binding)
- `v-bind:attr` → `:attr` (Shorthand binding)
- `v-on:event` → `@event` (Shorthand event)

### Angular Transformations
- `class="..."` → `[class]="..."` (Property binding)
- `onclick="..."` → `(click)="..."` (Event binding)
- `value="..."` → `[value]="..."` (Property binding)
- `disabled="..."` → `[disabled]="..."` (Property binding)
- `hidden="..."` → `[hidden]="..."` (Property binding)

### Web Components Transformations
- `onclick="..."` → `@click="..."` (Custom element events)
- `onchange="..."` → `@change="..."` (Custom element events)
- Maintains standard HTML attributes for web standards compliance

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - Automatically triggers deployment
2. **GitHub Actions** - Builds and deploys the application
3. **Live URL** - Available at `https://your-username.github.io/swift-swap/`

### Manual Deployment

```bash
yarn build        # Build the application
# Deploy the dist/ folder to your hosting platform
```

## 🎨 Customization

### Adding New Transformations

#### Method 1: Extend Existing Rule Sets
Edit `src/utils/ruleSetManager.ts` to add rules to existing frameworks:

```typescript
// Add to React rules array
{
  pattern: /your-pattern/g,
  replacement: 'your-replacement',
  type: 'attribute',
  description: 'Your transformation description'
}
```

#### Method 2: Create New Rule Set
Add a new framework by extending the RuleSetManager:

```typescript
// Add new rule set to constructor
this.ruleSets.set('yourframework', {
  id: 'yourframework',
  name: 'yourframework',
  displayName: 'Your Framework',
  description: 'Convert HTML for Your Framework',
  icon: '🔧',
  rules: yourFrameworkRules
});
```

### Styling Modifications

The project uses Tailwind CSS. Customize styles by:

1. **Utility Classes**: Modify component className props
2. **Custom Styles**: Add to `tailwind.config.js` theme.extend
3. **Global Styles**: Edit `src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Requirements

- **Node.js**: 18+ 
- **Yarn**: 1.22+
- **Modern Browser**: Chrome 88+, Firefox 85+, Safari 14+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: 
  - [v1.0.0 Specification](docs/specs/v1.0.0-spec.md) - Original implementation
  - [v1.1.0 Specification](docs/specs/v1.1.0-spec.md) - Multi-framework + statistics features
- **Issues**: [GitHub Issues](https://github.com/your-username/swift-swap/issues)
- **Live Demo**: [GitHub Pages](https://your-username.github.io/swift-swap/)

## 📝 Changelog

### v1.1.0 (Latest)
- ✨ **New**: Multi-framework support (React, Vue.js, Angular, Web Components)
- ✨ **New**: Framework rule selector in header with persistent preferences
- ✨ **New**: Real-time conversion statistics with detailed metrics
- ✨ **New**: Interactive statistics dashboard with collapsible sections
- 🎨 **Enhanced**: Mobile responsive design for new components
- 🔧 **Improved**: Type-safe architecture with comprehensive interfaces

### v1.0.0
- 🎉 Initial release with React/JSX conversion support
- 📱 Responsive design with desktop and mobile layouts
- ⚡ Real-time HTML to JSX transformation
- 🎨 Clean, modern UI with Tailwind CSS

---

Built with ❤️ using React, TypeScript, and Tailwind CSS