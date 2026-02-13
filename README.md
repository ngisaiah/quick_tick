# QuickTick

QuickTick is a full-stack crypto dashboard built with Node.js, Express, Handlebars, and MongoDB. Users sign in with Google, track live cryptocurrency market data, favorite coins, and keep personal notes.

## Current Features

- Google OAuth login/logout with Passport.js
- Persistent user sessions with MongoDB-backed session store
- Live cryptocurrency table (CoinMarketCap API)
- Favorites table with star toggle and persisted favorites per user
- Notes section (create + delete)
- Light/dark theme toggle with saved preference in `localStorage`
- Responsive dashboard and login page
- Custom favicon and refreshed UI styling

## Tech Stack

- Backend: Node.js, Express
- Templating: Handlebars
- Auth: Passport + `passport-google-oauth20`
- Database: MongoDB + Mongoose
- Session Store: `connect-mongo`
- Frontend: HTML, CSS, vanilla JS, Materialize, Font Awesome
- Deployment: Vercel

## Project Structure

```text
.
├─ app.js
├─ config/
│  ├─ db.js
│  └─ passport.js
├─ controllers/
│  ├─ coins.js
│  └─ todos.js
├─ middleware/
│  └─ auth.js
├─ models/
│  ├─ Todo.js
│  └─ User.js
├─ public/
│  ├─ css/style.css
│  ├─ js/main.js
│  └─ images/
├─ routes/
│  ├─ auth.js
│  ├─ coins.js
│  ├─ index.js
│  └─ todos.js
├─ views/
│  ├─ layouts/
│  │  ├─ main.hbs
│  │  └─ login.hbs
│  ├─ partials/
│  │  └─ _header.hbs
│  ├─ dashboard.hbs
│  └─ login.hbs
└─ vercel.json
```

## Environment Variables

Create `config/config.env` for local development:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
API_KEY=your_coinmarketcap_api_key
NODE_ENV=development
```

For Vercel Production, set the same variables in Project Settings and use your deployed domain for callback:

```env
GOOGLE_CALLBACK_URL=https://your-domain.vercel.app/auth/google/callback
```

Also add that exact callback URI in your Google Cloud OAuth client settings.

## Local Development

```bash
npm install
npm run dev
```

App URL: `http://localhost:5000`

## Scripts

- `npm run dev` - Start server with watch mode
- `npm start` - Start server normally

## Notes

- `vercel.json` uses modern `functions` + `routes` config (no legacy `builds`), so Vercel Project Build Settings are no longer ignored due to legacy build config.
- OAuth callback/domain mismatches can cause login to land on older deployments. Keep `GOOGLE_CALLBACK_URL` and Google OAuth redirect URIs aligned with the active domain.
