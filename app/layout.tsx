import type { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/auth"
import SessionProvider from "./components/SessionProvider"
import NavMenu from "./components/NavMenu"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TheFreeWallet",
  description: "A simple and free budgeting tool",
};

//---------------------------------------------------------

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AppRouterCacheProvider>
          <SessionProvider session={session}>
            {session && <NavMenu />}
            <main className="flex flex-1 h-full overflow-hidden bg-theme-google p-2">
              {children}
            </main>
            <Toaster position="bottom-center" />
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export default RootLayout
