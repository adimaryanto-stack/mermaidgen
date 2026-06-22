# MermaidGen 🎨🤖

MermaidGen is a modern, high-performance web application designed to create, preview, export, and dynamically generate Mermaid.js diagrams. It integrates a real-time syntax-validating Code Editor with a powerful AI Diagram Generator powered by Google Gemini.

---

## 🚀 Key Features

* **📝 Real-time Code Editor**: Write and edit Mermaid code with instant rendering and built-in syntax validation.
* **🤖 AI Diagram Generator**: Describe the diagram you want in natural language (e.g., *"Create a flowchart of a payment gateway session"*), and let Google Gemini generate the syntax for you.
* **📋 Extensive Template Library**: 20+ pre-built, production-ready templates grouped by categories:
  * **📊 Common**: Flowcharts, Flowchart Shapes, Sequence Diagrams, Class Diagrams, State Diagrams, Pie Charts.
  * **🏗️ Architecture**: C4 Context, Entity Relationship (ERD), Packet Diagrams (`packet-beta`), Architecture Blueprints.
  * **📅 Planning**: Gantt Charts, User Journeys, Timelines, Kanban Boards, Wardley Maps, Ishikawa (Fishbone) Diagrams.
  * **🧬 Advanced**: XY Charts, Sankey Diagrams, Treemaps, Venn Diagrams, Mindmaps, Git Graphs, TreeViews, Radar Charts.
* **💾 Multi-Format Exporting**:
  * **Copy Image**: Render and copy diagram directly to clipboard as a PNG for easy pasting into Google Docs, Word, or Slack.
  * **Download PNG**: Save high-resolution PNGs at a 2x pixel ratio.
  * **Download SVG**: Export fully scalable vector graphics.
* **🌓 Dual Themes**: Light and Dark mode options. The diagram theme dynamically updates (`default` vs `dark`) to match your workspace settings.

---

## 🛠️ Tech Stack

* **Frontend**: React 18 + TypeScript + Vite
* **Styling**: Tailwind CSS
* **Diagram Rendering**: Mermaid.js v11.15.0
* **AI Model Integration**: Google Gemini API (`gemini-2.5-flash`)
* **Export Engine**: `html-to-image`
* **Icons**: `lucide-react`

---

## 🏁 Getting Started

### Prerequisites

Ensure you have **Node.js 16+** and **npm** or **yarn** installed.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/adimaryanto-stack/mermaidgen.git
   cd mermaidgen
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env.local` file in the root folder to pre-configure your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: You can also set or change your API key directly inside the app's settings panel, which will persist it locally in your browser's local storage.*

4. **Launch the Development Server**:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

### Build for Production

To create a optimized production build:
```bash
npm run build
```

---

## 📁 Project Structure

```text
mermaidgen/
├── src/
│   ├── components/
│   │   ├── Editor.tsx           # Hand-coded text editor panel
│   │   ├── Preview.tsx          # Real-time diagram preview component
│   │   ├── ExportButtons.tsx    # Clipboard copy, PNG, and SVG downloads
│   │   ├── TemplateSelector.tsx # Categorized pre-built templates menu
│   │   └── AIGenerator.tsx      # Gemini-powered natural language prompt tab
│   ├── App.tsx                  # Application state, layout, and tab manager
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global CSS stylesheet (Tailwind & core)
│   └── App.css                  # Specific app layout styling
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🗺️ Future Enhancements

* **Zoom & Pan Control**: Smooth mouse wheel zooming and click-and-drag panning inside the preview pane.
* **Diagram Styling Overrides**: Select from specific Mermaid sub-themes (e.g. Forest, Neutral, Dark, Teal) separate from the app theme.
* **Diagram Share Links**: Compress and serialize code states into base64 URLs for easy sharing.
* **Local History Log**: Autosave recent edits locally to browse, load, or compare past versions.

---

## 📄 License & Attributions

This project is licensed under the MIT License. Diagrams are powered by [Mermaid.js](https://mermaid.js.org/).
