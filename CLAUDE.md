# Matt Gresock — Personal Portfolio · Claude Notes

## Project Overview
Personal portfolio site for Matt Gresock (Cornell ORIE & CS '29). Pure HTML/CSS/JS — no framework, no build step. Six pages. Dark navy theme.

**Live domain:** matthewgresock.com  
**GitHub repo:** mgresock/personal.portfolio (dot, not hyphen)  
**Deploy:** GitHub Pages (push to main → live)

---

## Critical Git Rule
**NEVER run `git reset --hard origin/main` or any destructive git command on this repo.** Previously this wiped all local new files by overwriting them with the old GitHub version. To push new work: `git add [specific files]` → `git commit` → `git push origin main`. Force push is fine since we own the repo.

---

## File Structure
```
index.html        — Homepage (full-screen hero, ticker, bento grid, about, skills, CTA)
experience.html   — Timeline of work, projects, leadership, activities
projects.html     — Detailed project cards (Forage + Portfolio)
education.html    — Cornell + Webster Schroeder cards with logos
about.html        — Bio, education cards, skills, interest pills
contact.html      — Contact methods + email form
styles.css        — All styles (single file, ~1400 lines)
script.js         — Scroll reveal, scramble, magnetic buttons, nav toggle, contact form
CORNELL_LOGO.png  — Transparent background Cornell logo (landscape ratio — use object-fit: cover)
SCHROEDER_LOGO.png — Webster Schroeder logo
FORAGE_LOGO.png   — Green rounded square with white plant icon — display as-is, NO CSS filters
matt-headshot.png — Profile photo used in hero + about sections
Matthew-Gresock-Resume.pdf — Needs to be added to repo separately
```

---

## Design System

### Colors (CSS custom properties)
```css
--bg:        #060b14   /* near-black navy */
--bg-2:      #0c1525
--surface:   rgba(255,255,255,0.04)
--border:    rgba(255,255,255,0.07)
--text:      #e4ecf8
--text-muted:#7b8db3
--text-dim:  #3d5070
--blue:      #5b8af0
--purple:    #8b5cf6
--green:     #10d98a
--grad:      linear-gradient(135deg, #5b8af0, #8b5cf6)
--max:       1160px   /* container max-width */
```

### Typography
- Headings: **Space Grotesk** (700 weight, tight tracking)
- Body: **Inter**
- Mono/labels: **DM Mono**

### Key CSS Patterns
- `.gradient-text` — blue→purple gradient on text
- `.reveal` + `.visible` — scroll reveal (IntersectionObserver in script.js)
- `.btn-primary` — gradient fill button
- `.btn-outline` — bordered ghost button
- `.magnetic` — JS cursor-tracking transform effect (script.js)
- `.section-label` — small mono uppercase label with leading dash
- `.section-title` — large Space Grotesk section heading

---

## Homepage Layout (index.html)

### Hero
- **Full viewport** (`min-height: 100vh`)
- **OUTSIDE the `.container` div** — hero is a direct child of `<main>`
- Two-column CSS grid: left = text panel, right = photo panel (50/50)
- Photo fills right half edge-to-edge (`position: absolute; inset: 0; object-fit: cover`)
- Photo zoomed into face: `object-position: center 10%`
- Left→right gradient on photo left edge blends into background
- Bottom gradient on photo fades into page
- Name: `clamp(4rem, 7vw, 7rem)` Space Grotesk, scramble JS effect

### Ticker
- **Full viewport width** — OUTSIDE the `.container` div, between hero and container
- Looping marquee animation (CSS `@keyframes ticker`)
- Must contain duplicated items (×2) for seamless loop

### Bento Grid (inside container)
- 3-column grid: `1.1fr 1fr 1fr`, rows: `220px 220px 220px`
- 7 cells with explicit `grid-column` / `grid-row` inline styles
- Layout: Forage (col 1, rows 1–2 tall) | Cornell wide (cols 2–3, row 1) | Eagle Scout + 3× Speech (cols 2–3, row 2) | three equal bottom row

---

## Pages

### experience.html
- Sections: Work Experience, Projects, Leadership & Organizations, Activities & Service
- Projects: Forage Nutrition + Personal Portfolio (both listed)
- Quick stats grid was DELETED — do not re-add

### education.html
- Two `.edu-card-v2` cards: Cornell + Webster Schroeder
- Cornell courses: 7 real courses with course codes (CS 2110, MATH 1920, MATH 2940, ENGRD 2700, PHYS 1112/1110, CHEM 2150, ENGRI 1120)
- WSHS: "AP Coursework — 10 courses total, selected below" + 4 listed
- Logos: 260×260px boxes, transparent background, `object-fit: cover`
- Quick stats were DELETED from this page too

### projects.html
- Two `.project-feature-card` cards with gradient top border
- Forage: FORAGE_LOGO.png, Stack = TypeScript · Python · SQL · Supabase · OpenAI API · Vercel
- Portfolio: MG gradient text mark, Stack = HTML5 · CSS3 · JavaScript · GitHub Pages
- GitHub link at top of page hero

### about.html
- Story: 5 paragraphs, personal voice, mentions family of engineers (mom, dad, grandfather)
- Joined debate as freshman, 6th NY State OO senior year
- Skills: 10 devicons + Claude Code text mark
- Interests: pill tags

### contact.html
- Contact methods (email, LinkedIn, resume) + email-prefill form

---

## Matt's Background (for content decisions)
- **School:** Cornell ORIE & CS double major, College of Engineering, Class of 2029
- **High school:** Webster Schroeder HS, Webster NY, 98.0 GPA, 10 AP courses, graduated June 2025
- **From:** Penfield, NY. Family of engineers (mom, dad, grandfather)
- **Speech & Debate:** Joined freshman year, NCFL Nationals 3×, 6th Place NY State Original Oratory 2025
- **Scouts:** Eagle Scout, Senior Patrol Leader, JASM. Led 50-person contingent at 2023 National Jamboree
- **Music:** Lead guitarist + Band Council President, Jazz & Wind Ensemble. Composed original jazz piece for senior concert
- **Service:** Founded Webster Service Scholars (Habitat for Humanity), ran 4 years as Founder & Treasurer
- **Work:** Wegmans Food Markets, cash register operator & self-checkout overseer, managed 12+ stations
- **Cornell orgs:** Kappa Theta Pi (President, Beta New Member Class) · Sigma Nu Gamma Theta (Treasurer)
- **Projects:** Forage Nutrition (foragenutrition.vercel.app) + this portfolio
- **Email:** mcgresock@gmail.com
- **LinkedIn:** linkedin.com/in/matthew-gresock

---

## Known Issues / Things NOT To Do
- Do NOT add stats cards/quick-stats grids — user specifically deleted these from experience + education pages
- Do NOT use `object-fit: contain` for logos — use `cover`
- Do NOT add CSS filters to FORAGE_LOGO.png — it's already styled correctly (green bg, white icon)
- Do NOT run `git reset --hard` — see Critical Git Rule above
- The `.reveal` class triggers via `.visible` (not `.is-visible`) — script.js uses `.visible`
- The nav CTA on contact.html says "Email me directly" (not "Get in touch")
