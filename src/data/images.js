/**
 * Image paths — rooms/cities in /images/, humanoids only in /pictures/ (your Figure screenshots).
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
  bedDetail: room,
  lighting: room,
  workspace,
  community,
  hallway: room,

  robots: {
    /** robot-hero.png is only 376px wide — too soft when cover-cropped large */
    hero: p("robot-automation.png"),
    fleet: p("robot-fleet.png"),
    housekeeping: p("robot-housekeeping.png"),
    logistics: p("robot-logistics.png"),
    patrol: p("robot-patrol.png"),
    automation: p("robot-automation.png"),
    checkin: p("robot-checkin.png"),
    walk: p("robot-walk.png"),
    laundry: p("robot-laundry.png"),
    fold: p("robot-fold.png"),
    lounge: p("robot-lounge.png"),
    clean: p("robot-clean.png"),
    gallery1: p("robot-gallery-1.png"),
    gallery2: p("robot-gallery-2.png"),
    gallery3: p("robot-gallery-3.png"),
    gallery4: p("robot-gallery-4.png"),
  },

  /** Three-shot editorial grid: pod room (main), bath vanity, rain shower */
  gallery: [room, bathAlt, bath],

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
