# Deployment Guide

## Important Note on Admin Portal
The Admin Portal currently saves data to `src/data/portfolio.json` and uploads images to `public/uploads`. This works perfectly on your **Local Machine**.

However, on serverless platforms like **Vercel** or **Netlify**, the file system is **Read-Only** (or ephemeral). This means:
- You **CAN** view the site and all projects.
- You **CANNOT** use the Admin Portal to save changes or upload files *on the live site*.

### Recommended Workflow for Vercel/Netlify
1.  Run the project locally (`npm run dev`).
2.  Use the Admin Portal locally (`http://localhost:3000/admin`) to add projects, upload resumes, etc.
3.  The changes are saved to your local files (`portfolio.json` and `public/uploads`).
4.  Commit these changes to Git:
    ```bash
    git add .
    git commit -m "Update portfolio content"
    git push
    ```
5.  Vercel/Netlify will automatically rebuild and deploy your site with the new content.

## Deploying to Vercel (Recommended for Static/Hybrid)
1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  The build settings should be automatically detected:
    -   Framework: Next.js
    -   Build Command: `next build`
    -   Output Directory: `.next`

## VPS / Docker Deployment (For Live Admin Features)
If you require the Admin Portal to work *live* on the internet (not just locally), you must host this on a VPS (like DigitalOcean Droplet, EC2, or Railway) with a persistent volume, or refactor the backend to use a Database (PostgreSQL/MongoDB) and Cloud Storage (AWS S3/Uploadthing).
