import { Inter, Nunito } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Vacation Homes & Condo Rentals Airbnb - Airbnb",
  description: "Join a global community of travelers and local hosts on Airbnb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
