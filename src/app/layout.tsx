import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/layout/navbar"; // Removed unused import but wait, maybe I should just delete the line.
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";
import LoadingScreen from "@/components/ui/loading-screen";

import { AudioProvider } from "@/context/audio-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SAI DHEERAJ",
  description: "A beautiful portfolio showcasing creative projects and professional work",
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
          enableSystem={false}
          disableTransitionOnChange
        >
          <AudioProvider>
            <LoadingScreen />
            <AnimatedBackground />
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
