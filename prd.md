# Product Requirement Document (PRD) - MermaidGen

## 1. Document Overview
* **Project Name**: MermaidGen
* **Document Version**: 1.1.0
* **Status**: Completed (Sprint 1 Core + AI Generator Extension)
* **Author**: Developer / AI Assistant
* **Date**: June 22, 2026

---

## 2. Product Description & Vision
MermaidGen is a web-based, real-time visual design utility that enables software engineers, system architects, and product managers to draft, preview, export, and automatically generate diagrams using Mermaid.js syntax. 

By combining a robust syntax-validating Code Editor with a powerful AI prompt generator, MermaidGen drastically simplifies diagramming workflows, reducing the time spent reading syntax documentation and manually formatting connectors.

---

## 3. Tech Stack & Infrastructure
* **Core Framework**: React 18.2.0 + TypeScript
* **Build System**: Vite 5.0.8
* **Styling Engine**: Tailwind CSS 3.3.5
* **Diagram Library**: Mermaid.js v11.15.0 (supporting advanced diagram syntaxes)
* **Export Libraries**: `html-to-image` (leveraging HTML5 Canvas / SVG conversion)
* **Icons**: `lucide-react`
* **AI Engine**: Google Gemini API (`gemini-2.5-flash` model endpoint)

---

## 4. Key Functional Features

### 4.1. Dual-Tab Workspace
* **📝 Code Editor Tab**: Direct hand-coded interface.
* **🤖 AI Generator Tab**: Natural language prompt interface.
* Both workspace interfaces feed into the unified live preview rendering viewport on the right side.

### 4.2. Rich Text Code Editor
* High-performance editor component supporting live state changes.
* Visual error message notification banners at the bottom of the editor, giving real-time syntax parsing status.
* Embedded **Template Selector** to immediately load structure examples.

### 4.3. Interactive Template Library
A curated dropdown containing over 20 pre-built diagrams grouped into 4 distinct areas:
1. **📊 Common Diagrams**:
   * *Flowchart (Basic)*: Standard node routes.
   * *Flowchart Shapes*: Custom nodes (Stadium, Subroutine, Hexagon, Trapezoid, Cylinders).
   * *Sequence Diagram*: Message flows and participants.
   * *Class Diagram*: OO Classes, members, and inheritance.
   * *State Diagram*: Transition flows (`stateDiagram-v2`).
   * *Pie Chart*: Visual percentage breakdowns.
2. **🏗️ Systems & Architecture**:
   * *C4 Context*: C4 Model integration for high-level software ecosystems.
   * *Entity Relationship (ER)*: Database keys and relationships.
   * *Packet Diagram*: Low-level binary packets (`packet-beta`).
   * *Architecture Blueprint*: VPC, APIs, Microservices, and Databases.
3. **📅 Planning & Process**:
   * *Gantt Chart*: Project schedules and tasks.
   * *User Journey*: Path and customer emotions.
   * *Timeline*: Historical milestones.
   * *Kanban Board*: Sprint columns and tasks (`kanban`).
   * *Wardley Map*: Strategic components evolution (`wardley-beta`).
   * *Ishikawa (Fishbone)*: Cause-and-effect problem solving (`ishikawa-beta`).
4. **🧬 Data & Advanced**:
   * *XY Chart*: Combined bar/line chart (`xychart-beta`).
   * *Sankey Diagram*: Resource distribution flows.
   * *Treemap*: Nested hierarchical proportions (`treemap-beta`).
   * *Venn Diagram*: Shared category circles (`venn-beta`).
   * *Mindmap*: Structured thoughts branching.
   * *GitGraph (Git)*: Interactive git tree commits and branches.
   * *TreeView*: Directory structural paths (`treeView-beta`).
   * *Radar Chart*: Multivariable comparative analysis (`radar-beta`).

### 4.4. AI Diagram Generator
* Harnesses Gemini 2.5 Flash to transform user instructions into correct Mermaid syntax.
* **Key Configuration Settings**:
  * Free-tier setup allowing personal API keys.
  * Local key preservation inside `localStorage` for privacy.
  * Environment variable fallback option via `VITE_GEMINI_API_KEY`.
* **Code Post-Processing**:
  * Strips markdown fences (` ```mermaid `) and trailing spaces.
  * Implements double-quote label wrapping to safeguard diagrams containing brackets, spaces, HTML breaks, or special characters.

### 4.5. Live Preview Viewport
* Real-time diagram rendering using Mermaid's renderer.
* Synced theme configurations: Diagram colors shift automatically based on the user's Dark/Light mode selection.
* Self-correcting UI: Displays clear syntax-error fallbacks if code parsing fails.

### 4.6. Multi-Format Export Options
* **Copy Image**: Encodes the diagram to PNG bytes and copies it directly to the system clipboard for immediate pasting into document suites (Microsoft Word, Google Docs, etc.).
* **Download PNG**: Triggers download of high-resolution PNG exports using a 2x pixel ratio scale for print quality.
* **Download SVG**: Triggers download of fully scalable vector graphic (SVG) files.

### 4.7. Theme & Layout Responsive Design
* Complete dark/light mode toggle with Tailwind-based dark styles.
* Two-pane layout for desktop (Left Editor, Right Preview).
* Adapts to smaller viewports for reading and editing.

---

## 5. Non-Functional Requirements
* **Performance**: Editor parsing should be debounced to guarantee fluid typing without UI stutter.
* **Privacy & Security**: Users' Google Gemini keys are stored on the client side only; no backend database is used.
* **Syntax Security**: Mermaid rendering is run with loose security configurations (`securityLevel: 'loose'`) to support full styling/HTML features, while container inputs are insulated.

---

## 6. Future Enhancements & Roadmap
### Sprint 2: Interactive Controls & Configuration
* Implement zoom and pan controls inside the preview container.
* Add option for custom diagram theme overrides (e.g. neutral, forest, dark, default) independent of the app theme.
* Add export resolution slider (1x, 2x, 3x, 4x, etc.).

### Sprint 3: Storage & Sharing
* Shareable URL generation (base64-compressed diagram codes).
* Sidebar panel containing recent diagram history.
