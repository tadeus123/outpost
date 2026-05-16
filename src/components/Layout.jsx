import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header key={pathname} />
      <main className="min-h-screen pt-14 md:pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
