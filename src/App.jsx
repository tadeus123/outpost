import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import PageLoader from "./components/PageLoader"
import ScrollToTop from "./components/ScrollToTop"
import { preloadBook } from "./lib/preloadBook"
import Book from "./pages/Book"
import BookSuccess from "./pages/BookSuccess"

const Home = lazy(() => import("./pages/Home"))
const Product = lazy(() => import("./pages/Product"))
const Cities = lazy(() => import("./pages/Cities"))
const Pricing = lazy(() => import("./pages/Pricing"))
const HowItWorks = lazy(() => import("./pages/HowItWorks"))

function LazyPage({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export default function App() {
  useEffect(() => {
    preloadBook()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/book" element={<Book />} />
        <Route path="/book/success" element={<BookSuccess />} />
        <Route path="/join" element={<Navigate to="/book" replace />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <LazyPage>
                <Home />
              </LazyPage>
            }
          />
          <Route
            path="/product"
            element={
              <LazyPage>
                <Product />
              </LazyPage>
            }
          />
          <Route
            path="/cities"
            element={
              <LazyPage>
                <Cities />
              </LazyPage>
            }
          />
          <Route
            path="/pricing"
            element={
              <LazyPage>
                <Pricing />
              </LazyPage>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <LazyPage>
                <HowItWorks />
              </LazyPage>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
