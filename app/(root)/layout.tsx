import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"


const Layout = ({children}:Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="font-work-sans">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
            <Navbar />
            {children}
            </ThemeProvider>
        </main>
    )
}
export default Layout
