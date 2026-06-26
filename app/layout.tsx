import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataSync AI | Automated Data Pipelines",
  description: "Automate your data pipeline with premium AI tooling. Enterprise-grade reliability with intelligent data syncing.",
  keywords: "data automation, AI data pipeline, data syncing, saas",
  alternates: {
    canonical: "https://datasync.ai"
  },
  openGraph: {
    title: "DataSync AI | Automated Data Pipelines",
    description: "Automate your data pipeline with premium AI tooling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataSync AI | Automated Data Pipelines",
    description: "Automate your data pipeline with premium AI tooling.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="antialiased bg-[var(--color-oceanic)] text-[var(--color-arctic)] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
