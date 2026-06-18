# MermaidGen - Mermaid Diagram Generator

🎨 A web-based tool for creating, previewing, and exporting Mermaid diagrams in PNG, SVG, and clipboard formats.

## Features (Sprint 1 - Core)

✅ **Editor** - Write/paste Mermaid code with live syntax support
✅ **Live Preview** - Diagram renders automatically as you type
✅ **Download PNG** - Export high-resolution PNG files
✅ **Download SVG** - Export vector SVG files
✅ **Copy to Clipboard** - Paste directly into Word/Google Docs
✅ **Template Library** - 6 ready-made diagram templates
✅ **Dark/Light Mode** - Toggle between themes
✅ **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** for styling
- **Mermaid.js** for diagram rendering
- **html-to-image** for PNG/SVG export
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adimaryanto-stack/mermaidgen.git
cd mermaidgen

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

1. **Start with a template** or write your own Mermaid diagram code
2. **See live preview** on the right side
3. **Export** as PNG, SVG, or copy to clipboard
4. **Paste** into Word, Google Docs, or other applications

## Project Structure

```
mermaidgen/
├── src/
│   ├── components/
│   │   ├── Editor.tsx           # Code editor
│   │   ├── Preview.tsx          # Live diagram preview
│   │   ├── ExportButtons.tsx    # Export functionality
│   │   └── TemplateSelector.tsx # Template dropdown
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Sprint 2 & 3 Roadmap

**Sprint 2 - Enhancement**
- Zoom & Pan controls
- Better error messages
- Export resolution options
- Theme selector for diagrams

**Sprint 3 - Polish**
- Share links (URL-based persistence)
- Diagram history/undo
- Smooth preview animations

## Deployment

Deploy to **Vercel** with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adimaryanto-stack/mermaidgen)

## License

MIT

## Support

For issues or feature requests, please open an [issue](https://github.com/adimaryanto-stack/mermaidgen/issues) on GitHub.
