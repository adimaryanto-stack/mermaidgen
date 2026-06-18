import { FC, useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface PreviewProps {
  code: string
  isDark: boolean
}

const Preview: FC<PreviewProps> = ({ code, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !code.trim()) return

      try {
        containerRef.current.innerHTML = ''
        const { svg } = await mermaid.render('mermaid-preview', code)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML = '<div class="text-red-500 text-center">Invalid diagram code</div>'
        }
      }
    }

    renderDiagram()
  }, [code, isDark])

  return (
    <div className="flex-1 flex flex-col">
      <label className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        👁️ Preview
      </label>
      <div
        id="mermaid-preview"
        ref={containerRef}
        className={`flex-1 rounded-lg border p-4 overflow-auto flex items-center justify-center ${
          isDark
            ? 'bg-slate-700 border-slate-600'
            : 'bg-gray-100 border-gray-300'
        }`}
      >
        <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</div>
      </div>
    </div>
  )
}

export default Preview
