import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Reader - Interactive Learning Platform",
  description: "An interactive platform for learning and testing with AI assistance",
  keywords: ["AI", "learning", "tests", "education", "interactive"],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  themeColor: '#4299E1',
};

// initialize concrete components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
