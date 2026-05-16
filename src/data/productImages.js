import { images } from "./images"

const { robots } = images

export const productImageByTitle = {
  "Private bathroom": images.bathroom,
  "Private hotel room": robots.fleet,
  "Fully operated by robots": robots.hero,
  "Fast internet": robots.walk,
  "Great lighting": robots.clean,
  "24/7 access": robots.checkin,
  "Community area": robots.lounge,
}

/** Portrait product thumbs (4:5) — tighter crops than full-width uses */
export const productThumbObjectPosition = {
  "Private hotel room": "50% 42%",
  "Fully operated by robots": "50% 8%",
  "Fast internet": "55% 50%",
  "Great lighting": "50% 45%",
  "24/7 access": "78% 40%",
  "Community area": "50% 35%",
}

export const journeyImages = [
  robots.checkin,
  robots.automation,
  robots.lounge,
  robots.housekeeping,
  robots.logistics,
]
