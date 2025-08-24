# SwiftSwap - HTML Syntax Converter

A modern, responsive web application that transforms HTML tables with scrollable containers and formatting in real-time. Built with React 18+, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Conversion Engine
- **Table Transformation**: Convert HTML tables to scrollable, formatted containers
- **Smart Detection**: Automatically identifies tables that need transformation
- **Real-time Conversion**: Instantly apply table transformations to your HTML
- **Intelligent Processing**: Context-aware table wrapping and cell formatting

### User Interface
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Desktop Layout**: Side-by-side input and output panels
- **Mobile Layout**: Tab-based interface with smooth transitions
- **Clean Interface**: Focused on table transformation functionality

### Analytics & Statistics
- **Real-time Metrics**: Track modifications, additions, and removals line-by-line
- **Transformation Details**: Monitor attribute changes, tag modifications, comment conversions
- **Performance Insights**: View processing time and conversion accuracy
- **Interactive Dashboard**: Collapsible statistics panel with detailed breakdowns

### User Experience
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
│   │   ├── RuleSelector.tsx       # Rule selector (single rule set)
│   │   ├── StatisticsPanel.tsx    # Conversion statistics display
│   │   └── StatisticsCard.tsx     # Individual metric cards
│   ├── utils/
│   │   ├── syntaxTransform.ts     # Legacy conversion logic
│   │   ├── ruleSetManager.ts      # Table transformation rule engine
│   │   └── statisticsCalculator.ts # Statistics calculation engine
│   ├── types/
│   │   ├── rulesets.ts            # Rule set type definitions
│   │   └── statistics.ts          # Statistics interfaces
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .github/workflows/       # GitHub Actions
└── dist/                    # Build output
```

## 📱 Usage

### Table Transformation
1. **Automatic Processing**: The application automatically processes your HTML tables:
   - 📊 **Table Transfer**: Wraps tables with scrollable containers and formats cells

### Desktop Experience
1. Enter your HTML with tables in the left input panel
2. Click the "Convert" button to apply table transformations
3. View the converted syntax in the right output panel
4. Review detailed conversion statistics in the expandable panel below
5. Use "Clear All" to reset both panels

### Mobile Experience
1. Use the "Input HTML" tab to enter your HTML with tables
2. Tap "Convert" to process the table transformations
3. Automatically switches to "Converted HTML" tab to show results
4. Scroll down to view conversion statistics
5. Use the "Clear" button in the input tab to reset

### Statistics Dashboard
- **Overview**: Line-by-line changes (modified, added, removed, unchanged)
- **Transformations**: Detailed breakdown by type (attributes, tags, styling)
- **Details**: Processing time, accuracy percentage, character counts

## ⚡ Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn type-check   # Run TypeScript type checking
yarn lint         # Run ESLint
```

## 🔄 Table Transfer Transformations

### Table Processing Rules
- **Table Wrapping**: Wraps unwrapped tables with `<div class="table-scroll sticky-top" style="max-height:300px">`
- **Table Styling**: Sets table style to `min-width:600px; width:100%`
- **Cell Formatting**: Adds `text-nowrap text-mono` classes to all `<td>` elements
- **Responsive Design**: Creates scrollable containers for large tables
- **Skip Already Wrapped**: Ignores tables already wrapped with `table-scroll sticky-top` classes

### Example Transformation
```html
<!-- Input -->
<table>
  <tr>
    <td>Cell 1</td>
    <td class="existing">Cell 2</td>
  </tr>
</table>

<!-- Output -->
<div class="table-scroll sticky-top" style="max-height:300px">
<table style="min-width:600px; width:100%">
  <tr>
    <td class="text-nowrap text-mono">Cell 1</td>
    <td class="existing text-nowrap text-mono">Cell 2</td>
  </tr>
</table>
</div>
```

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

#### Extend Table Rules
Edit `src/utils/ruleSetManager.ts` to add more table transformation rules:

```typescript
// Add to table rules array
{
  pattern: /your-table-pattern/g,
  replacement: 'your-replacement',
  type: 'attribute',
  description: 'Your table transformation description'
}
```

#### Create Additional Rule Sets
Add new transformation types by extending the RuleSetManager:

```typescript
// Add new rule set to constructor
this.ruleSets.set('newtype', {
  id: 'newtype',
  name: 'newtype',
  displayName: 'New Transformation Type',
  description: 'Convert HTML for specific use case',
  icon: '🔧',
  rules: newTypeRules
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
- ✨ **New**: Table Transfer transformation system
- ✨ **New**: Automatic table wrapping with scrollable containers
- ✨ **New**: Real-time conversion statistics with detailed metrics
- ✨ **New**: Interactive statistics dashboard with collapsible sections
- 🎨 **Enhanced**: Mobile responsive design for new components
- 🔧 **Improved**: Type-safe architecture with comprehensive interfaces
- 🗑️ **Removed**: React, Vue.js, Angular, Web Components rule sets (focused on table transformations)

### v1.0.0
- 🎉 Initial release with React/JSX conversion support
- 📱 Responsive design with desktop and mobile layouts
- ⚡ Real-time HTML to JSX transformation
- 🎨 Clean, modern UI with Tailwind CSS

---

Built with ❤️ using React, TypeScript, and Tailwind CSS