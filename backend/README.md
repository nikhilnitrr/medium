## Backend of medium like blog application

# key features :
- Cloudflare worker based serverless backend
- Hono for backend routing
- Zod for input validation
- Common modules have been exported as npm packages
- Json web token based authentication

# Local dev setup :
```
npm install
npm run dev
```

# Deploy to cloudflare worker :
Make sure that DATABASE_URL and JWT_PASSWORD are set in wrangler.toml file :

```
wrangler login
npm run deploy
```
