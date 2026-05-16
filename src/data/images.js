/**
 * Image paths — rooms/cities in /images/, humanoids in /pictures/.
 * Hotel shots: one pod room + one bath suite, reused so every page feels like the same Outpost.
 */
const p = (name) => `/pictures/${name}`

const room = "/images/room-single.jpg"
const roomWide = "/images/room-double.jpg"
const workspace = "/images/workspace.jpg"
const bath = "/images/bathroom.jpg"
const bathAlt = "/images/bathroom-alt.jpg"
const community = "/images/community.jpg"

export const images = {
  hero: p("robot-fleet.png"),
  roomSingle: room,
  roomDouble: roomWide,
  bathroom: bath,
  bathroomAlt: bathAlt,
  /** Same room shot — avoids mismatched Pinterest interiors */
  bedDetail: room,
  lighting: room,
  workspace,
  community,
  hallway: room,

  robots: {
    /** JPGs in /images/robots/ — much smaller than source PNGs for fast page loads */
    hero: "/images/robots/hero.jpg",
    fleet: p("robot-fleet.png"),
    housekeeping: "/images/robots/housekeeping.jpg",
    logistics: "/images/robots/logistics.jpg",
    patrol: "/images/robots/patrol.jpg",
    automation: "/images/robots/automation.jpg",
    checkin: "/images/robots/automation.jpg",
  },

  /** Bath-first grid; robots for operations */
  gallery: [bath, bathAlt, room, "/images/robots/housekeeping.jpg"],

  cities: {
    "san-francisco": "/images/cities/san-francisco.jpg",
    "new-york": "/images/cities/new-york.jpg",
    london: "/images/cities/london.jpg",
    berlin: "/images/cities/berlin.jpg",
    paris: "/images/cities/paris.jpg",
    amsterdam: "/images/cities/amsterdam.jpg",
    brussels: "/images/cities/brussels.jpg",
    tokyo: "/images/cities/tokyo.jpg",
    munich: "/images/cities/munich.jpg",
    singapore: "/images/cities/singapore.jpg",
    shenzhen: "/images/cities/shenzhen.jpg",
    shanghai: "/images/cities/shanghai.jpg",
    "hong-kong": "/images/cities/hong-kong.jpg",
    guangzhou: "/images/cities/guangzhou.jpg",
    "las-vegas": "/images/cities/las-vegas.jpg",
  },
}
