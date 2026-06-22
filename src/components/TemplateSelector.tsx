import { FC, useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface TemplateSelectorProps {
  onSelect: (template: string) => void
  isDark: boolean
}

interface TemplateGroup {
  category: string
  items: {
    [name: string]: string
  }
}

const TEMPLATES_GROUPED: TemplateGroup[] = [
  {
    category: '📊 Common Diagrams',
    items: {
      'Flowchart (Basic)': `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B`,
      'Flowchart Shapes': `%% Flowchart Shapes Example
%% Reference: https://mermaid.js.org/syntax/flowchart.html
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
      'Class Diagram': `classDiagram
    class Animal {
        +String name
        +int age
        +eat()
        +sleep()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`,
      'State Diagram': `stateDiagram-v2
    [*] --> Still
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
      'Pie Chart': `pie title Pets
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`
    }
  },
  {
    category: '🏗️ Systems & Architecture',
    items: {
      'C4 Context': `C4Context
    title System Context diagram for Internet Banking System
    Person(customer, "Banking Customer", "A customer of the bank")
    System(banking_system, "Internet Banking System", "Allows customers to view information")
    Rel(customer, banking_system, "Uses")`,
      'Entity Relationship (ER)': `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
      'Packet Diagram': `packet-beta
    0-15: "Source Port"
    16-31: "Destination Port"
    32-63: "Sequence Number"
    64-95: "Acknowledgment Number"`,
      'Architecture Blueprint': `flowchart TD
    Client[Web/Mobile Client] --> GW[API Gateway]
    subgraph VPC [Amazon VPC]
        GW --> Auth[Auth Service]
        GW --> Order[Order Service]
        GW --> Payment[Payment Service]
    end
    Order --> DB[(PostgreSQL)]
    Payment --> Stripe[Stripe API]`
    }
  },
  {
    category: '📅 Planning & Process',
    items: {
      'Gantt Chart': `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Development
    Design :des1, 2026-01-01, 30d
    Implementation :dev1, after dev1, 40d
    Testing :test1, after dev1, 20d`,
      'User Journey': `journey
    title My Working Day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`,
      'Timeline': `timeline
    title History of Social Media
    2004 : Facebook launched
    2006 : Twitter launched
    2010 : Instagram launched`,
      'Kanban Board': `kanban
    section To Do
      Task 1
      Task 2
    section In Progress
      Task 3
    section Done
      Task 4`,
      'Wardley Map': `wardley-beta
    title Tea Shop Value Chain
    anchor Business [0.95, 0.63]
    component Cup of Tea [0.79, 0.61]
    component Tea [0.63, 0.81]
    Business -> Cup of Tea
    Cup of Tea -> Tea
    evolve Tea 0.85`,
      'Ishikawa (Fishbone)': `ishikawa-beta
    Blurry Photo
        Equipment
            LENS
                Inappropriate lens
                Dirty lens
            SENSOR
                Damaged sensor
        User
            Shaky hands`
    }
  },
  {
    category: '🧬 Data & Advanced',
    items: {
      'XY Chart': `xychart-beta
    title "Sales Revenue"
    x-axis [Jan, Feb, Mar, Apr, May]
    y-axis "Revenue (USD)" 0 --> 5000
    bar [1200, 2500, 3100, 2800, 4200]
    line [1000, 2000, 3000, 2500, 4000]`,
      'Sankey Diagram': `sankey
    Budget, Food, 500
    Budget, Rent, 1500
    Budget, Savings, 1000
    Rent, Landlord, 1500
    Food, Groceries, 350
    Food, Dining Out, 150`,
      'Treemap': `treemap-beta
    "Root":::container
        "Group A"
            "Sub-item 1": 10
            "Sub-item 2": 20
        "Group B"
            "Sub-item 3": 15
            "Sub-item 4": 5`,
      'Venn Diagram': `venn-beta
    title "Skills Overlap"
    set Design
    set Code
    union Design,Code["Product"]`,
      'Mindmap': `mindmap
  root((Project Planning))
    Requirements
      Functional
      Non-Functional
    Design
      Architecture
      UI/UX
    Development
      Frontend
      Backend`,
      'GitGraph (Git)': `gitGraph
    commit
    branch hotfix
    checkout hotfix
    commit
    checkout main
    merge hotfix
    commit`,
      'TreeView': `treeView-beta
    "Root"
        "Folder_A"
            "File_1"
            "File_2"
        "Folder_B"
            "File_3"`,
      'Radar Chart': `radar-beta
    title "Performance Chart"
    axis speed["Speed"], quality["Quality"], cost["Cost"]
    curve productA["Product A"]{80, 90, 70}
    curve productB["Product B"]{60, 70, 90}`
    }
  }
]

const TemplateSelector: FC<TemplateSelectorProps> = ({ onSelect, isDark }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border font-medium transition-all duration-200 ${
          isDark
            ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600 shadow-md'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span className="flex items-center gap-2">
          <span>📋</span> Choose Template
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 rounded-lg border shadow-xl z-20 max-h-96 overflow-y-auto ${
            isDark
              ? 'bg-slate-700 border-slate-600'
              : 'bg-white border-gray-300'
          }`}
        >
          {TEMPLATES_GROUPED.map((group) => (
            <div key={group.category} className="border-b last:border-0 border-opacity-30 border-gray-400">
              <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider sticky top-0 backdrop-blur-sm ${
                isDark ? 'text-gray-400 bg-slate-800/90' : 'text-gray-500 bg-gray-100/90'
              }`}>
                {group.category}
              </div>
              <div className="py-1">
                {Object.entries(group.items).map(([name, template]) => (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(template)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-6 py-2 text-sm transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:bg-slate-600 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
