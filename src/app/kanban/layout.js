import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { SidebarProvider } from "@/context/sidebarWidth";
import { ThemeProvider } from "@/context/theme";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex ">
          <div className="flex flex-col">
            <Logo />
            <Sidebar />
          </div>
          <div className="flex flex-col  w-screen">
            <Navbar />
            <div className="bg-bgColor min-h-screen flex-grow w-full">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}