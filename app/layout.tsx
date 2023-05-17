import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";

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
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
