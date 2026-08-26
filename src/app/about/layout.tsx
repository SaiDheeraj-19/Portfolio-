import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About R. Sai Dheeraj | AI Engineer & Developer",
  description: "Learn more about R. Sai Dheeraj, an AI Engineer and Full-Stack Developer. View my career progression, background, and what drives me to build intelligent systems.",
  openGraph: {
    title: "About R. Sai Dheeraj",
    description: "Learn more about R. Sai Dheeraj, an AI Engineer and Full-Stack Developer. View my career progression, background, and what drives me to build intelligent systems.",
    url: "https://saidheeraj.co.in/about",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
