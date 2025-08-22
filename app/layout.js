import './globals.css'

export const metadata = {
  title: 'Company Profile - RecruitCRM',
  description: 'Company profile page for RecruitCRM application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
