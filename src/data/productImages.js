import { images } from "./images"

const { robots } = images

export const productImageByTitle = {
  "Private bathroom": images.bathroom,
  "Private hotel room": robots.fleet,
  "Fully operated by robots": robots.walk,
  "Fast internet": images.workspace,
  "Great lighting": images.lighting,
  "24/7 access": robots.checkin,
  "Community area": robots.lounge,
}

/** Portrait product thumbs (4:5) — tighter crops than full-width uses */
export const productThumbObjectPosition = {
  "Private hotel room": "50% 42%",
  "Fully operated by robots": "55% 50%",
  "Fast internet": "28% 38%",
  "Great lighting": "50% 36%",
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
