import './globals.css'

export const metadata = {
  title: 'EntreNevados',
  description: 'Turismo en Tolima - EntreNevados',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
