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
  metadataBase: new URL("https://saidheeraj.co.in"),
  title: "R. Sai Dheeraj — Full-Stack Developer & AI Engineer",
  description: "Computer Science undergraduate and Full-Stack Developer building AI-powered applications, real-time systems, secure platforms, and scalable digital products.",
  keywords: ["Sai Dheeraj", "R. Sai Dheeraj", "Sai Dheeraj portfolio", "AI Engineer", "Full-Stack Developer", "Software Engineer portfolio"],
  icons: {
    icon: "/face-icon.png",
  },
  openGraph: {
    title: "R. Sai Dheeraj — Full-Stack Developer & AI Engineer",
    description: "Computer Science undergraduate and Full-Stack Developer building AI-powered applications, real-time systems, secure platforms, and scalable digital products.",
    url: "https://saidheeraj.co.in",
    siteName: "R. Sai Dheeraj Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "R. Sai Dheeraj Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "R. Sai Dheeraj — Full-Stack Developer & AI Engineer",
    description: "Computer Science undergraduate and Full-Stack Developer building AI-powered applications, real-time systems, secure platforms, and scalable digital products.",
    images: ["/profile.jpg"],
  },
  alternates: {
    canonical: "https://saidheeraj.co.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "R. Sai Dheeraj",
  "url": "https://saidheeraj.co.in",
  "jobTitle": "Full-Stack Developer & AI Engineer",
  "description": "Computer Science undergraduate and Full-Stack Developer building AI-powered applications, real-time systems, secure platforms, and scalable digital products.",
  "sameAs": [
    "https://github.com/SaiDheeraj-19",
    "https://www.linkedin.com/in/sai-dheeraj-r/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
