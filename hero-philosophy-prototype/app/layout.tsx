import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hero Philosophy Prototype',
  description: 'Convergence into focus interaction model',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            background: #0a0a0a;
            color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            min-height: 100vh;
          }

          ::selection {
            background: rgba(255, 255, 255, 0.15);
          }

          /* Hide scrollbar but keep functionality */
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
