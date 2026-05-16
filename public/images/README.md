# Outpost images

Replace any file here to update the site. **Keep the same filename.**

## Rooms & spaces (from `pictures/hotel/`)

Run `npm run images:hotel` to copy curated hotel photos into the slots below.

## Rooms & spaces
| File | Used for |
|------|----------|
| `hero.jpg` | Home hero |
| `room-single.jpg` | Single room |
| `room-double.jpg` | Product / doubles |
| `bathroom.jpg` | Bathroom pod |
| `community.jpg` | Lounge / pricing |
| `lighting.jpg` | Lighting |
| `checkin.jpg` | Self check-in |
| `hallway.jpg` | Corridors / journey |
| `bed-detail.jpg` | Bed close-up |
| `workspace.jpg` | Wi‑Fi / work |

## Gallery (`gallery-1.jpg` … `gallery-4.jpg`)
Home & product photo grids.

## Humanoid robots (`/pictures/` at project root)
Your Figure screenshots live in the top-level `pictures/` folder. Run:

`npm run images:sync`

This copies curated files into `public/pictures/` (robot hero, roles, gallery, check-in, etc.). The site reads only from `/pictures/*` for all humanoid imagery.

## Cities (`cities/*.jpg`)
City cards on `/cities` and `/book`.

**Setup:**
- `npm run images:hotel` — your `pictures/hotel/` picks → room slots below
- `npm run images:placeholders` — fallback Unsplash (only if hotel sync not run)
- `npm run images:sync` — Figure humanoids from `pictures/` → `public/pictures/`
