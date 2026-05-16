export const brand = {
  name: "Outpost",
  headline:
    "Affordable private hotel rooms from $25/night in the world's most expensive cities.",
  pitch:
    "Clean rooms. Private bathrooms. Fast internet. Great lighting. 24/7 access. No breakfast, no fluff, no hostel bunks. Just a better-priced hotel room for the night.",
  tagline:
    "Affordable private hotel rooms from $25/night in the world's most expensive cities.",
  robotLine: "Fully operated by robots.",
  promise:
    "Private rooms. Shared energy. Hotel-level cleanliness. Hostel-level affordability.",
  robotThesis:
    "In San Francisco, London, Shenzhen, and New York, labor is the biggest line item — front desk, housekeeping, night staff, laundry. Humanoid robots run the building instead. That is how private hotel rooms get cheap.",
}

export const robots = {
  headline: "Fully operated by robots.",
  subhead:
    "Guests are people. Staff are humanoid robots. Humanoids do cleaning, laundry, patrol, and building logistics — what used to require dozens of human hotel workers.",
  roles: [
    {
      title: "Housekeeping",
      desc: "Daily room refresh while you stay, plus a full reset after checkout. Surfaces designed for fast robotic cleans.",
      imageKey: "housekeeping",
    },
    {
      title: "Laundry & logistics",
      desc: "Linens, towels, supplies — carted building-wide without manual back-of-house labor.",
      imageKey: "laundry",
    },
    {
      title: "Night patrol & inspection",
      desc: "Community areas monitored. Rooms checked. Issues flagged before guests notice.",
      imageKey: "patrol",
    },
    {
      title: "Guest-facing automation",
      desc: "Self check-in, smart locks, ID verification. No front desk. No phone calls. No exceptions that need a human.",
      imageKey: "automation",
    },
  ],
  rollout: [
    { phase: "Today", text: "Automated check-in, smart locks, robot vacuums, camera-monitored community." },
    { phase: "Next", text: "Humanoid-assisted room reset and linen logistics." },
    { phase: "Full Outpost", text: "A small fleet of humanoids per property — housekeeping, laundry, patrol — replacing most hotel labor." },
  ],
}

export const pricing = {
  launch: [
    {
      id: "solo",
      name: "Solo room",
      price: 25,
      unit: "/ person / night",
      perPerson: true,
      description:
        "Private room for one. From ¥100 in Shenzhen, €25 in Berlin, £25 in London, $35 in SF. Robot-cleaned. No front desk.",
      features: [
        "7–9 m² private room",
        "Private bathroom pod",
        "Enterprise Wi-Fi",
        "24/7 access",
        "2pm checkout",
      ],
      highlight: false,
    },
    {
      id: "duo",
      name: "Duo room",
      price: 15,
      unit: "/ person / night",
      perPerson: true,
      roomTotal: "From ¥120/night for two (Shenzhen) · $50 in SF",
      description:
        "Two guests, one private room. From ¥60/person in Shenzhen, €15 in Berlin, £15 in London, $25 in SF.",
      features: [
        "10–13 m² private room",
        "Private bathroom pod",
        "140–160 cm bed or twin compact",
        "Enterprise Wi-Fi",
        "24/7 access",
      ],
      highlight: true,
    },
  ],
  normal: {
    solo: { launch: "25–80", normal: "28–90", peak: "32–110" },
    duoPerPerson: { launch: "15–40", normal: "16–45", peak: "20–55" },
    duoTotal: { launch: "30–80", normal: "32–90", peak: "40–110" },
  },
  addons: [
    { name: "Community day pass", price: "$10–20" },
    { name: "Locker rental", price: "$3–5/day" },
    { name: "Laundry", price: "$5–8/load" },
    { name: "Late checkout until 2pm", price: "Included" },
    { name: "24/7 access", price: "Included" },
  ],
  /** Typical boutique / compact hotel with private bath in the same neighborhoods */
  marketComparison: {
    title: "What the same night usually costs nearby",
    subtitle:
      "Private room, private bathroom, central districts — compared to Outpost launch rates.",
    footnote:
      "Comparable range: median nightly rates for similar private rooms with en-suite or private bath in the neighborhoods we open (boutique & compact hotels, typical OTA pricing). Outpost rates before tax.",
    cities: [
      {
        id: "san-francisco",
        name: "San Francisco",
        areas: "SoMa · Hayes Valley · Mission Bay",
        currency: "USD",
        comparableLow: 165,
        comparableHigh: 255,
        outpostSolo: 35,
        outpostDuoPerPerson: 25,
        outpostDuoTotal: 50,
      },
      {
        id: "berlin",
        name: "Berlin",
        areas: "Mitte · Kreuzberg · Friedrichshain",
        currency: "EUR",
        comparableLow: 95,
        comparableHigh: 165,
        outpostSolo: 25,
        outpostDuoPerPerson: 15,
        outpostDuoTotal: 30,
      },
      {
        id: "london",
        name: "London",
        areas: "Shoreditch · King's Cross",
        currency: "GBP",
        comparableLow: 130,
        comparableHigh: 220,
        outpostSolo: 25,
        outpostDuoPerPerson: 15,
        outpostDuoTotal: 30,
      },
      {
        id: "shenzhen",
        name: "Shenzhen",
        areas: "Nanshan · Futian · Huaqiangbei",
        currency: "CNY",
        comparableLow: 280,
        comparableHigh: 520,
        outpostSolo: 100,
        outpostDuoPerPerson: 60,
        outpostDuoTotal: 120,
      },
    ],
  },
}

export const product = {
  heroTitle: "Private hotel rooms. Robot-operated.",
  heroSubtitle:
    "The best locations in the city. Humanoid robots run cleaning, logistics, patrol, and check-in — no human staff on site. That is how we keep prices low for you.",
  included: [
    { title: "Private bathroom", desc: "Walk-in rain shower, backlit mirror, stone tile and wood vanity — yours alone, not shared." },
    { title: "Private hotel room", desc: "Your own room — not a dorm. Compact, quiet, designed for sleep and work." },
    { title: "Fully operated by robots", desc: "Humanoids run daily housekeeping, laundry, and patrol — no front desk or night staff on site." },
    { title: "Fast internet", desc: "Enterprise Wi-Fi 6/7 with redundant fiber and backup." },
    { title: "Great lighting", desc: "Warm and cool modes, reading light, indirect LED." },
    { title: "24/7 access", desc: "Self check-in, smart locks. The building never closes." },
    { title: "Community area", desc: "Work tables, lounge, call booths — the space your room doesn't need." },
  ],
  excludedIntro:
    "You still get a private room, private bath, Wi‑Fi, and 24/7 access. We cut the rest — the services and square footage that mostly exist to staff and run a traditional hotel.",
  excludedSection: {
    title: "What we removed to lower the cost.",
    subtitle: "Less overhead. Same sleep.",
  },
  excluded: [
    "Breakfast and kitchen",
    "Front desk and reception",
    "Room service and bellhop",
    "Minibar restocking",
    "Lobby and concierge staff",
    "Oversized rooms and unused space",
  ],
}

export const cities = [
  { id: "san-francisco", name: "San Francisco", region: "USA", status: "flagship", areas: "SoMa, Hayes Valley, Mission Bay, Dogpatch" },
  { id: "new-york", name: "New York", region: "USA", status: "coming", areas: "LIC, Downtown Brooklyn, Lower Manhattan" },
  { id: "london", name: "London", region: "UK", status: "coming", areas: "Shoreditch, King's Cross, Southwark" },
  { id: "berlin", name: "Berlin", region: "Germany", status: "prototype", areas: "Mitte, Kreuzberg, Friedrichshain" },
  { id: "paris", name: "Paris", region: "France", status: "coming", areas: "10th/11th, Canal Saint-Martin, Bastille" },
  { id: "amsterdam", name: "Amsterdam", region: "Netherlands", status: "coming", areas: "Noord, De Pijp, Oost" },
  { id: "brussels", name: "Brussels", region: "Belgium", status: "coming", areas: "Central, EU quarter" },
  { id: "tokyo", name: "Tokyo", region: "Japan", status: "coming", areas: "Shinjuku, Shibuya, Ueno" },
  { id: "munich", name: "Munich", region: "Germany", status: "coming", areas: "Central, Schwabing" },
  { id: "singapore", name: "Singapore", region: "Singapore", status: "coming", areas: "Bugis, Tanjong Pagar, Chinatown" },
  { id: "shenzhen", name: "Shenzhen", region: "China", status: "flagship", areas: "Nanshan, Futian, Huaqiangbei" },
  { id: "shanghai", name: "Shanghai", region: "China", status: "future", areas: "Jing'an, Huangpu" },
  { id: "hong-kong", name: "Hong Kong", region: "China", status: "future", areas: "Central edge, Kowloon" },
  { id: "guangzhou", name: "Guangzhou", region: "China", status: "future", areas: "Tianhe, Haizhu" },
  { id: "las-vegas", name: "Las Vegas", region: "USA", status: "future", areas: "Convention corridor" },
  { id: "moon", name: "Outpost Moon", region: "Space", status: "joke", areas: "Sea of Tranquility" },
  { id: "mars", name: "Outpost Mars", region: "Space", status: "joke", areas: "Olympus Mons base camp" },
]

export const journey = [
  { step: "01", title: "Book online", desc: "Direct booking. No front desk, no OTA fees cutting margin on both sides." },
  { step: "02", title: "Verify & check in", desc: "ID before arrival. Door code on your phone. Kiosk if you need a key card." },
  { step: "03", title: "Stay", desc: "Private hotel room, private bathroom, fast Wi-Fi. Towels at the robot station. Community when you want it." },
  { step: "04", title: "Checkout 2pm", desc: "You leave. Humanoids reset the room between 2pm and 5pm. Next guest from 5pm." },
  { step: "05", title: "Always robotic ops", desc: "Cleaning, laundry, patrol, supply runs — no breakfast staff, no night reception, no daily knock on your door." },
]
