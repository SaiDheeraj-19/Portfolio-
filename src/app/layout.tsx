import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/layout/navbar"; // Removed unused import but wait, maybe I should just delete the line.
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "portfolio-saidheeraj",
  description: "A beautiful portfolio showcasing creative projects and professional work",
  icons: {
    icon: "/sai_profile_color.png",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <div className="min-h-screen flex flex-col relative">

            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
