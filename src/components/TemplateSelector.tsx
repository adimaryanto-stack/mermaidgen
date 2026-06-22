import { FC, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface TemplateSelectorProps {
  onSelect: (template: string) => void
  isDark: boolean
}

const TEMPLATES = {
  'Flowchart (Basic)': `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B`,
  'Flowchart Shapes (Mermaid.js)': `%% Flowchart Shapes Example
%% Syntax Reference: https://mermaid.js.org/syntax/flowchart.html
flowchart TD
    sq[Square Shape] --> rd(Rounded Edge)
    rd --> st([Stadium Shape])
    st --> sub[[Subroutine Shape]]
    sub --> cyl[(Database / Cylinder)]
    cyl --> circ((Circle Shape))
    circ --> asym>Asymmetric Shape]
    asym --> rhomb{Decision / Rhombus}
    rhomb --> hex{{Hexagon Shape}}
    hex --> para1[/Parallelogram 1/]
    para1 --> para2[\\Parallelogram 2\\]
    para2 --> trap1[/Trapezoid 1\\]
    trap1 --> trap2[\\Trapezoid 2/]`,
  'Sequence Diagram': `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hello Alice!
    Alice->>Bob: How are you?`,
  'Pie Chart': `pie title Pets
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`,
  'Gantt Chart': `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Development
    Design :des1, 2024-01-01, 30d
    Implementation :dev1, after des1, 40d
    Testing :test1, after dev1, 20d`,
  'State Diagram': `stateDiagram-v2
    [*] --> Still
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
  'Class Diagram': `classDiagram
    class Animal
    Animal : +String name
    Animal : +int age
    Animal : +eat()
    Animal : +sleep()`,
}

const TemplateSelector: FC<TemplateSelectorProps> = ({ onSelect, isDark }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border font-medium transition-colors ${
          isDark
            ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>📋 Choose Template</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 rounded-lg border shadow-lg z-10 ${
            isDark
              ? 'bg-slate-700 border-slate-600'
              : 'bg-white border-gray-300'
          }`}
        >
          {Object.entries(TEMPLATES).map(([name, template]) => (
            <button
              key={name}
              onClick={() => {
                onSelect(template)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-opacity-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                isDark ? 'text-gray-300 hover:bg-slate-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
