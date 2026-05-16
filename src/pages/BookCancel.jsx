import BookLink from "../components/BookLink"

export default function BookCancel() {
  return (
    <div className="book-shell flex min-h-[80vh] items-center">
      <div className="page-narrow w-full text-center">
        <h1 className="headline-section">Checkout canceled</h1>
        <p className="lead mx-auto mt-6 max-w-sm">No charge was made. Your dates are still available.</p>
        <BookLink to="/book" className="btn mt-12">
          Continue booking
        </BookLink>
      </div>
    </div>
  )
}
