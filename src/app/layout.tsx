import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/themeContext";


export const metadata: Metadata = {
  title: "Wangari Kimani",
  description: "Pioneering cutting-edge tech solutions for tomorrow's challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-background dark:bg-background-dark text-text dark:text-text-dark overflow-x-hidden font-sans antialiased"
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
