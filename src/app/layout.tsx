import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { default: "BioAuth — CMPE 492 · TED University", template: "%s | BioAuth" },
  description: "A TED University senior project researching quality- and attack-aware fusion of face verification, visual PAD and rPPG. Explore the research, reports, milestones and team.",
  icons: { icon: "/icon.svg" },
  openGraph: { title: "BioAuth — Trust through biometric evidence", description: "CMPE 492 senior project at TED University. Research, technical reports and project progress.", type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
