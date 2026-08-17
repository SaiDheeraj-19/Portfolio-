import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/layout/navbar"; // Removed unused import but wait, maybe I should just delete the line.
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingScreen from "@/components/ui/loading-screen";

import { AudioProvider } from "@/context/audio-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "R. Sai Dheeraj — Full-Stack Developer & AI Engineer",
  description: "Computer Science undergraduate and Full-Stack Developer building AI-powered applications, real-time systems, secure platforms, and scalable digital products.",
  icons: {
    icon: "/face-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AudioProvider>
                        <LoadingScreen />
            <LoadingScreen />
            <div className="min-h-screen flex flex-col relative">

              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
