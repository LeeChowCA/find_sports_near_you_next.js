"use client";

import { SessionProvider } from "next-auth/react";
import './globals.css';
import Header from "@/components/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header/>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
