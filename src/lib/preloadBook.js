let bookChunk

/** Warm the /book module before navigation. */
export function preloadBook() {
  if (!bookChunk) bookChunk = import("../pages/Book")
  return bookChunk
}
