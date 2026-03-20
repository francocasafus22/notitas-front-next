import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/Navbar";
import { getSession } from "@/src/auth/dal";


const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Notitas",
  description: "Write your ideas and share with the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()

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
          
            <Navbar user={session?.isAuth && session?.user}/>     
            <main className="flex-1 ">
                {children}    
            </main>
            <Footer/>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
