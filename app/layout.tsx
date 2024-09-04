import type { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/auth"
import SessionProvider from "./components/SessionProvider"
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import NavMenu from "./components/NavMenu"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  // title: "Create Next App",
  // description: "Generated by create next app",
}

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
            <ReactQueryClientProvider>
              {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
              {session && <NavMenu />}
              <main className="flex flex-1 h-full overflow-hidden bg-gray-200 p-2">
                {children}
              </main>
              <Toaster position="bottom-center" />
            </ReactQueryClientProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export default RootLayout
