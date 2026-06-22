import { FC, useState, useEffect } from 'react'
import { Sparkles, Key, AlertCircle } from 'lucide-react'

interface AIGeneratorProps {
  onGenerate: (code: string) => void
  isDark: boolean
}

const AIGenerator: FC<AIGeneratorProps> = ({ onGenerate, isDark }) => {
  const [prompt, setPrompt] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  // Load API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key') || ''
    const envKey = import.meta.env.VITE_GEMINI_API_KEY || ''
    setApiKey(savedKey || envKey)
  }, [])

  const handleSaveKey = (key: string) => {
    setApiKey(key)
    localStorage.setItem('gemini_api_key', key)
  }

  const cleanMermaidCode = (rawCode: string): string => {
    let clean = rawCode.trim()
    // Remove markdown code block wrapping if present (e.g. ```mermaid ... ```)
    if (clean.startsWith('```')) {
      const firstNewline = clean.indexOf('\n')
      if (firstNewline !== -1) {
        clean = clean.substring(firstNewline + 1)
      }
      if (clean.endsWith('```')) {
        clean = clean.substring(0, clean.length - 3)
      }
    }
    // Remove any leading "mermaid" label if still present
    if (clean.toLowerCase().startsWith('mermaid\n')) {
      clean = clean.substring(8)
    }
    return clean.trim()
  }

  const generateDiagram = async () => {
    setError('')
    if (!prompt.trim()) {
      setError('Please describe the diagram you want to create.')
      return
    }

    const activeKey = apiKey.trim()
    if (!activeKey) {
      setError('Gemini API Key is required to generate diagrams. Click "Settings" to enter it.')
      setShowSettings(true)
      return
    }

    setIsLoading(true)
    try {
      const systemPrompt = `You are an expert systems analyst and a Mermaid.js diagram generator. 
Convert the user's request into a clean, syntactically correct Mermaid.js diagram code.

Rules:
1. Return ONLY the raw Mermaid code block.
2. Do NOT wrap the output in markdown code blocks (do NOT use \`\`\`mermaid or \`\`\`).
3. Do NOT include any explanations, introduction, or concluding text.
4. Ensure the syntax is compatible with Mermaid v11 (e.g., use "treeView-beta" with quotes for file trees, "radar-beta" with curly braces for radar charts, "packet-beta" with quotes for packet structures).
5. Always start directly with the diagram type declaration (e.g., flowchart TD, sequenceDiagram, treeView-beta, etc.).

User request: "${prompt}"`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'text/plain',
            },
          }),
        }
      )

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData?.error?.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text

      if (!textResponse) {
        throw new Error('No response content received from Gemini.')
      }

      const mermaidCode = cleanMermaidCode(textResponse)
      onGenerate(mermaidCode)
    } catch (err: any) {
      console.error('AI Generation Error:', err)
      setError(err?.message || 'Failed to generate diagram. Please check your API key and connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Settings toggle */}
      <div className="flex justify-between items-center">
        <label className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          🤖 AI Prompt
        </label>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
            isDark
              ? 'text-gray-400 bg-slate-700 hover:bg-slate-600'
              : 'text-gray-600 bg-gray-150 hover:bg-gray-200'
          }`}
        >
          <Key size={14} />
          {showSettings ? 'Hide API Key' : 'API Key Settings'}
        </button>
      </div>

      {/* API Key Panel */}
      {showSettings && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
        }`}>
          <div className="text-xs mb-2 font-medium">
            Google Gemini API Key
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Paste your API key here..."
              value={apiKey}
              onChange={(e) => handleSaveKey(e.target.value)}
              className={`flex-1 px-3 py-1.5 text-sm rounded border ${
                isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <p className="text-[10px] mt-2 text-gray-400 leading-normal">
            Your key is saved locally in your browser. Get a free Gemini API Key from the{' '}
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Google AI Studio
            </a>
            .
          </p>
        </div>
      )}

      {/* Main Prompt Input */}
      <div className="flex-1 flex flex-col min-h-[150px]">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Create a flowchart for a user registration process with email verification, database saving, and redirecting to login..."
          className={`flex-1 p-4 rounded-lg border text-sm resize-none ${
            isDark
              ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={generateDiagram}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
          isLoading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-[0.98]'
        }`}
      >
        <Sparkles size={18} className={isLoading ? 'animate-spin' : ''} />
        {isLoading ? 'Generating Diagram...' : 'Generate Diagram'}
      </button>
    </div>
  )
}

export default AIGenerator
