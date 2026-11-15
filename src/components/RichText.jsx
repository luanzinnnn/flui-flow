import React from 'react'

export default function RichText({ text, className = '' }) {
  const lines = String(text || '').split('\n')
  return (
    <span className={`rich-text ${className}`}>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>
            }
            return <React.Fragment key={i}>{part}</React.Fragment>
          })}
        </React.Fragment>
      ))}
    </span>
  )
}
