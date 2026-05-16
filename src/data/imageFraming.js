/**
 * object-position hints so vertical robot shots and room photos crop predictably.
 */
const positions = {
  "/images/room-single.jpg": "50% 38%",
  "/images/room-double.jpg": "50% 48%",
  "/images/workspace.jpg": "28% 38%",
  "/images/bathroom.jpg": "42% 48%",
  "/images/bathroom-alt.jpg": "50% 36%",
  "/images/community.jpg": "52% 48%",

  "/images/cities/shenzhen.jpg": "50% 40%",

  "/pictures/robot-hero.png": "50% 8%",
  "/pictures/robot-automation.png": "50% 30%",
  "/pictures/robot-fleet.png": "50% 42%",
  "/pictures/robot-housekeeping.png": "52% 38%",
  "/pictures/robot-logistics.png": "50% 35%",
  "/pictures/robot-patrol.png": "55% 45%",
  "/pictures/robot-checkin.png": "78% 40%",
  "/pictures/robot-gallery-1.png": "42% 40%",
  "/pictures/robot-gallery-2.png": "50% 45%",
  "/pictures/robot-gallery-3.png": "50% 40%",
  "/pictures/robot-gallery-4.png": "50% 35%",
  "/pictures/robot-walk.png": "55% 50%",
  "/pictures/robot-laundry.png": "48% 62%",
  "/pictures/robot-lounge.png": "50% 35%",
  "/pictures/robot-clean.png": "50% 45%",
  "/pictures/robot-fold.png": "50% 40%",
}

export function objectPosition(src) {
  if (!src) return "50% 50%"
  return positions[src] ?? "50% 50%"
}
