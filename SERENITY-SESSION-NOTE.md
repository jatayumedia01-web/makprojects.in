# BTR Serenity - Session Note (22 Aug 2026)

**Live:** https://makprojects.in/btr-serenity  
**Deploy:** `npm run build` → `.\deploy-ftp.ps1` (FTP_PASS env required)  
**Hard refresh:** Ctrl + Shift + R

## Done today

- Full Serenity page redesign (hero video, sticky nav, sections)
- Brochure PDF scan + gallery renders, amenities, specs, connectivity
- UI/UX fixes (overview layout, bento gallery, amenities pills, specs accordion)
- Official floor plans from `Downloads/plans` - 14 PNGs, facing selector, carpet/UDS panel
- Projects menu: Fern → Serenity → Township
- Township amenities removed from Serenity (separate Serenity-only features)
- Deployed live (212 files)

## Key files

| Area | Path |
|------|------|
| Page | `src/pages/Serenity.tsx` |
| Content | `src/data/serenityPage.ts` |
| Floor plans | `src/data/serenityPlans.ts`, `src/components/SerenityFloorPlans.tsx` |
| Media | `public/media/serenity/` |

## Repu continue cheyachu

- [ ] Serenity page final UI polish (user feedback after live review)
- [ ] Hero video / tour section tweaks if needed
- [ ] West-facing carpet values verify for plans where only one PNG exists
- [ ] `deploy-ftp.ps1` - passive mode fails sometimes; active mode + retry worked
- [ ] Any new photos/videos from client

## Git

Branch: `main` - pushed after this session commit.
