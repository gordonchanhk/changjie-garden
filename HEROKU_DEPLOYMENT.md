# Deploying to Heroku

This guide shows you how to deploy your Cangjie Garden Next.js app to Heroku.

## Prerequisites

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. A Heroku account (free tier works!)
3. Git installed

## Files Already Configured for Heroku

We've already set up the necessary files:

### `Procfile`
```
web: npm start
```

### `package.json` Changes
- **engines**: Specifies Node.js >=18.17.0
- **start script**: Uses `next start -p $PORT` (Heroku's dynamic port)
- **heroku-postbuild**: Automatically runs `npm run build` on deployment

### `next.config.js`
- Images set to `unoptimized: true` (good for Heroku)

## Deployment Steps

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create a New Heroku App
```bash
heroku create cangjie-garden
# or let Heroku generate a random name:
heroku create
```

### 3. Add Git Remote (if not already added)
```bash
git remote add heroku https://git.heroku.com/your-app-name.git
```

### 4. Deploy to Heroku
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Heroku deployment"

# Push to Heroku
git push heroku main
```

If your main branch is named `master`:
```bash
git push heroku master
```

### 5. Open Your App
```bash
heroku open
```

## Environment Variables (Optional)

If you need to set environment variables:

```bash
heroku config:set NODE_ENV=production
heroku config:set NEXT_PUBLIC_APP_URL=https://your-app.herokuapp.com
```

## Viewing Logs

To see what's happening on Heroku:
```bash
heroku logs --tail
```

## Common Issues & Solutions

### Issue: Build Fails with "Out of Memory"
**Solution**: Upgrade to a larger dyno or set Node.js memory limit:
```bash
heroku config:set NODE_OPTIONS="--max-old-space-size=4096"
```

### Issue: App Crashes on Startup
**Solution**: Check logs and ensure all dependencies are in `dependencies` (not `devDependencies`):
```bash
heroku logs --tail
```

### Issue: Port Already in Use
**Solution**: Ensure your `start` script uses `$PORT`:
```json
"start": "next start -p $PORT"
```
✅ Already configured!

### Issue: Images Not Loading
**Solution**: Make sure images are in `public/` directory and referenced correctly:
```javascript
// ✅ Correct
<img src="/generated_images/image.png" />

// ❌ Wrong
<img src="/public/generated_images/image.png" />
```

## Updating Your App

After making changes:

```bash
git add .
git commit -m "Your update message"
git push heroku main
```

Heroku will automatically:
1. Detect changes
2. Run `npm install`
3. Run `npm run heroku-postbuild` (which runs `npm run build`)
4. Start your app with `npm start`

## Scaling Your App

### Free Dyno
```bash
heroku ps:scale web=1
```

### Upgrade to Paid Dyno
```bash
heroku ps:type hobby
# or
heroku ps:type standard-1x
```

## Custom Domain (Optional)

### Add Your Domain
```bash
heroku domains:add www.yourdomain.com
```

### Get DNS Target
```bash
heroku domains
```

Then add a CNAME record in your DNS settings pointing to the Heroku DNS target.

## Monitoring

View app metrics:
```bash
heroku dashboard
```

Or visit: https://dashboard.heroku.com/apps/your-app-name

## Cost

- **Free Dyno**: Free (app sleeps after 30 min of inactivity)
- **Hobby Dyno**: $7/month (never sleeps)
- **Standard Dyno**: $25-50/month (better performance)

## Heroku vs Other Platforms

| Platform | Free Tier | Build Time | Best For |
|----------|-----------|------------|----------|
| **Heroku** | Limited (sleeps) | ~2-3 min | Quick deployment, hobbyists |
| **Vercel** | Generous | ~1 min | Next.js apps (best integration) |
| **Netlify** | Good | ~2 min | Static sites, JAMstack |
| **Railway** | $5 credit/month | ~2 min | Modern alternative to Heroku |

## Alternative: Use Vercel Instead?

Since this is a Next.js app, Vercel (made by Next.js creators) might be easier:

```bash
npm install -g vercel
vercel
```

Benefits:
- Optimized for Next.js
- Automatic deployments on git push
- Better performance
- More generous free tier

## Need Help?

- [Heroku Node.js Docs](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Heroku Support](https://help.heroku.com/)

## Quick Reference

```bash
# Deploy
git push heroku main

# View logs
heroku logs --tail

# Restart app
heroku restart

# Open app
heroku open

# Check status
heroku ps

# Set config
heroku config:set KEY=value

# List config
heroku config
```

---

Your app is now ready for Heroku deployment! 🚀
