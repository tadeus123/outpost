import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import PageLoader from "./components/PageLoader"
import ScrollToTop from "./components/ScrollToTop"

const Home = lazy(() => import("./pages/Home"))
const Product = lazy(() => import("./pages/Product"))
const Cities = lazy(() => import("./pages/Cities"))
const Pricing = lazy(() => import("./pages/Pricing"))
const HowItWorks = lazy(() => import("./pages/HowItWorks"))
const Book = lazy(() => import("./pages/Book"))
const BookSuccess = lazy(() => import("./pages/BookSuccess"))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/book" element={<Book />} />
          <Route path="/book/success" element={<BookSuccess />} />
          <Route path="/join" element={<Navigate to="/book" replace />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
