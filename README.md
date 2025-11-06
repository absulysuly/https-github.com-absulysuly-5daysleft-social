# Digital Diwan – Iraqi Election Platform

Digital Diwan unifies election data, field reporting, and AI-assisted storytelling to help voters and campaign teams understand Iraq’s 2025 parliamentary race.

## Features

- **Candidate Explorer** – Filter by governorate, party, gender, and incumbency to compare priorities and biographies.
- **Governorate Dashboards** – Provincial briefings with demographic indicators and curated candidate slates.
- **Statistics Hub** – National metrics, turnout outlooks, and policy highlights compiled from trusted bulletins.
- **AI Creator Spotlight** – Server-side Gemini integration surfaces inspirational civic narratives while keeping API keys secure.

## Tech Stack

- [Next.js 14](https://nextjs.org/) App Router (TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) with PostCSS build pipeline
- Edge-ready API route for Gemini-powered spotlights

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables by creating `.env.local`:
   ```bash
   GEMINI_API_KEY=your-google-generative-ai-key
   ```
   If the key is not provided, the platform falls back to a curated spotlight response.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

Visit `http://localhost:3000` to explore the platform. The API route is available at `/api/creator-spotlight` for server-only Gemini access.

## Project Structure

```
app/
  about/            – Mission statement, partner network, contact details
  api/creator-spotlight/ – Gemini integration with secure fallback
  candidates/       – Filterable candidate explorer
  governorates/     – Provincial dashboards and detail pages
  statistics/       – National metrics and turnout projections
components/
  CreatorSpotlight  – Client spotlight widget consuming the API route
  TopNavBar         – Global navigation with active route states
data/
  candidates.ts     – Sample dataset powering the explorer
  governorates.ts   – Provincial metadata and helpers
  statistics.ts     – National statistics and turnout timeline
lib/
  utils.ts          – Utility helpers (class name merging)
```

## Deployment Notes

- Vercel automatically detects the Next.js output directory (`.next`); no custom `vercel.json` configuration is required.
- Ensure the `GEMINI_API_KEY` environment variable is added to your hosting provider for live AI spotlights.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) (if present) for details.
