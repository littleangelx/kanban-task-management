import Logo from "@/components/Logo";
import NavbarSteps from "@/components/NavbarSteps";
import SidebarSteps from "@/components/SidebarSteps";
import { SidebarProvider } from "@/context/sidebarWidth";
import { ThemeProvider } from "@/context/theme";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex ">
          <div className="flex flex-col">
            <Logo />
            <SidebarSteps />
          </div>
          <div className="flex flex-col  w-screen">
            <NavbarSteps />
            <div className="bg-bgColor min-h-screen flex-grow w-full">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
