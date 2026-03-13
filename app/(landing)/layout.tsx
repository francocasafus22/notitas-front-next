import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/Navbar";


const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Notitas",
  description: "Write your ideas and share with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange  
        >                
          
            <Navbar user={{}} logout={{}}/>     
            <main className="flex-1 h-full items-center justify-center flex">
                {children}    
            </main>
            <Footer/>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
