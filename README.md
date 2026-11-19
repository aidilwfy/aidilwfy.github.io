# Muhammad Aidil Wafiy — Portfolio

Personal portfolio built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

In development, gold-outlined **"Config ·"** hints show what still needs to be filled in.
They never appear in production. There, unconfigured links are simply hidden.

## Where to edit things

| What | File |
| --- | --- |
| Name, headlines, About text, **email / GitHub / LinkedIn**, CV path, profile photo, education, journey | `src/data/personal.ts` |
| Skills and (optional) proficiency levels | `src/data/skills.ts` |
| Projects (case studies, links, thumbnails, status) | `src/data/projects.ts` |
| Awards | `src/data/achievements.ts` |
| Certificates tab | `src/data/certificates.ts` |
| Colours / theme tokens | `src/app/globals.css` |

### Profile picture
1. Put your photo in `public/images/profile/` (for example `aidil.jpg`, square, at least 800×800).
2. In `src/data/personal.ts`, set `profileImage: "/images/profile/aidil.jpg"`.

### Resume
The Download Resume button serves `public/files/Aidil_Wafiy_CV.pdf`. Replace that file to update it.

### Certificates
Put images in `public/images/certificates/` and set `image` on each entry in `src/data/certificates.ts`.
Entries without an image show a "coming soon" placeholder. Click a certificate to view it larger.

### Social links and contact form
In `src/data/personal.ts → contact`:
```ts
email: "you@example.com",
github: "https://github.com/your-username",
linkedin: "https://www.linkedin.com/in/your-profile",
formEndpoint: "",  // optional, e.g. "https://formspree.io/f/xxxxxxx"
```
How the contact form behaves:
- **`formEndpoint` set:** messages are POSTed as JSON, and visitors see "sent" only when the request succeeds.
- **Only `email` set:** the form opens the visitor's email app with the message filled in. It says clearly that the message has not been sent yet.
- **Neither set:** the form validates the message, then says it was **not** sent.

### Projects
Each project in `src/data/projects.ts` has a `links: { github, demo }` field. Fill in either one to show its button.
Add `thumbnail: "/images/projects/<file>"` to replace the drawn illustration with a real screenshot.

### Skill levels
No levels are shown by default. To show one, add it to a skill in `src/data/skills.ts`, for example:
`{ name: "Laravel", core: true, level: "Comfortable" }`.
The allowed values are `Learning`, `Familiar`, `Comfortable` and `Proficient`.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On https://vercel.com, choose **Add New → Project**, import the repo, and keep the defaults (Framework: Next.js).
3. Optional: if you use a custom domain, add the environment variable `NEXT_PUBLIC_SITE_URL=https://your-domain.com`.
   This sets the canonical URL, Open Graph URL and sitemap. Without it, the Vercel production URL is used automatically.
4. Deploy. Every push to the main branch redeploys the site.
