import { images } from "./images"

export const productImageByTitle = {
  "Private hotel room": images.roomSingle,
  "Private bathroom": images.bathroom,
  "Fully operated by robots": images.robots.hero,
  "Fast internet": images.workspace,
  "Great lighting": images.bathroomAlt,
  "24/7 access": images.robots.checkin,
  "Community area": images.community,
}

/** Portrait product thumbs (4:5) — tighter crops than full-width uses */
export const productThumbObjectPosition = {
  "24/7 access": "92% 38%",
  "Community area": "58% 52%",
}

export const journeyImages = [
  images.roomSingle,
  images.bathroom,
  images.robots.checkin,
  images.robots.fleet,
  images.bathroomAlt,
]
