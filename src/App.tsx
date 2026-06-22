import { useState, useEffect } from 'react'
import { Download, Copy, Sun, Moon, HelpCircle } from 'lucide-react'
import { toPng, toSvg } from 'html-to-image'
import mermaid from 'mermaid'
import Editor from './components/Editor'
import Preview from './components/Preview'
import ExportButtons from './components/ExportButtons'
import TemplateSelector from './components/TemplateSelector'
import './App.css'

const defaultCode = `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B`

function App() {
  const [code, setCode] = useState(defaultCode)
  const [isDark, setIsDark] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: isDark ? 'dark' : 'default' })
  }, [isDark])

  useEffect(() => {
    let active = true
    const validateCode = async () => {
      if (!code.trim()) {
        if (active) setError('')
        return
      }

      try {
        await mermaid.parse(code)
        if (active) setError('')
      } catch (err: any) {
        if (active) {
          setError(err?.message || 'Invalid Mermaid syntax')
        }
      }
    }

    validateCode()

    return () => {
      active = false
    }
  }, [code])

  const handleTemplate = (template: string) => {
    setCode(template)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>MermaidGen</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="Help"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className={`w-1/2 flex flex-col border-r ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} p-6 overflow-hidden`}>
          <div className="mb-4">
            <TemplateSelector onSelect={handleTemplate} isDark={isDark} />
          </div>
          <Editor code={code} onChange={setCode} isDark={isDark} />
          {error && <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
        </div>

        {/* Right Panel - Preview */}
        <div className={`w-1/2 flex flex-col ${isDark ? 'bg-slate-900' : 'bg-white'} p-6 overflow-hidden`}>
          <Preview code={code} isDark={isDark} />
        </div>
      </div>

      {/* Footer - Export Buttons */}
      <footer className={`border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} px-6 py-4`}>
        <ExportButtons previewElementId="mermaid-preview-container" isDark={isDark} />
      </footer>
    </div>
  )
}

export default App
