import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";



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
            
            
                <main className="flex items-center justify-center h-screen">
                    {children}    
                </main>
            
            </ThemeProvider>
        </body>
        </html>
    );
}
