import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/context/theme";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/sidebarWidth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
