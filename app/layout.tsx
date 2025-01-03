import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import prismadb from "@/lib/prismadb";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const store = prismadb.store
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />  
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
