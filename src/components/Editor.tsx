import { FC } from 'react'

interface EditorProps {
  code: string
  onChange: (code: string) => void
  isDark: boolean
}

const Editor: FC<EditorProps> = ({ code, onChange, isDark }) => {
  return (
    <div className="flex-1 flex flex-col">
      <label className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        📝 Mermaid Code
      </label>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 p-4 rounded-lg border font-mono text-sm resize-none ${
          isDark
            ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder="Enter Mermaid diagram code here..."
        spellCheck="false"
      />
    </div>
  )
}

export default Editor
