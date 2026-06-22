import { FC } from 'react'
import { Download, Copy } from 'lucide-react'
import { toPng, toSvg } from 'html-to-image'

interface ExportButtonsProps {
  previewElementId: string
  isDark: boolean
}

const ExportButtons: FC<ExportButtonsProps> = ({ previewElementId, isDark }) => {
  const exportPNG = async () => {
    try {
      const container = document.getElementById(previewElementId)
      if (!container) return

      const svgElement = container.querySelector('svg')
      if (!svgElement) {
        alert('No diagram found to export')
        return
      }

      const png = await toPng(svgElement as unknown as HTMLElement, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
      })

      const link = document.createElement('a')
      link.href = png
      link.download = `diagram-${Date.now()}.png`
      link.click()
    } catch (err) {
      console.error('Error exporting PNG:', err)
      alert('Failed to export PNG')
    }
  }

  const exportSVG = async () => {
    try {
      const container = document.getElementById(previewElementId)
      if (!container) return

      const svgElement = container.querySelector('svg')
      if (!svgElement) {
        alert('No diagram found to export')
        return
      }

      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const svgUrl = URL.createObjectURL(svgBlob)

      const link = document.createElement('a')
      link.href = svgUrl
      link.download = `diagram-${Date.now()}.svg`
      link.click()

      URL.revokeObjectURL(svgUrl)
    } catch (err) {
      console.error('Error exporting SVG:', err)
      alert('Failed to export SVG')
    }
  }

  const copyToClipboard = async () => {
    try {
      const container = document.getElementById(previewElementId)
      if (!container) return

      const svgElement = container.querySelector('svg')
      if (!svgElement) {
        alert('No diagram found to copy')
        return
      }

      const png = await toPng(svgElement as unknown as HTMLElement, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
      })

      const response = await fetch(png)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      alert('Diagram copied to clipboard!')
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      alert('Failed to copy to clipboard')
    }
  }

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isDark
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <Copy size={18} />
        Copy Image
      </button>
      <button
        onClick={exportPNG}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isDark
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        <Download size={18} />
        PNG
      </button>
      <button
        onClick={exportSVG}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isDark
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-purple-500 text-white hover:bg-purple-600'
        }`}
      >
        <Download size={18} />
        SVG
      </button>
    </div>
  )
}

export default ExportButtons
