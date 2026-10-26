# Soul Sanctum — Catholic Daily Companion & Liturgical Treasury

A comprehensive Catholic web application offering daily Mass readings, Catena Aurea patristic commentary, Saint of the Day, Bible flashcards & memorization suite, Church history timeline (AD 33 – 2026), worldwide Catholic demographics infographic, catechism, sacred art gallery, audio recitations (with Ava Grace and Microsoft David), and traditional devotions.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📦 How to Push to GitHub & Make it Live

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click the **`+`** icon in the top right corner and choose **New repository**.
3. Name your repository (e.g., `soul-sanctum` or `catholic-sanctum`).
4. Set it to **Public** (or **Private**).
5. Leave "Initialize with a README" **unchecked** (we already have one).
6. Click **Create repository**.

### Step 2: Push Your Code from Your Computer
Open your terminal inside the project directory and run:

```bash
# Initialize git repository
git init

# Add all project files
git add .

# Create your first commit
git commit -m "Initial commit of Soul Sanctum Catholic App"

# Rename branch to main
git branch -M main

# Link to your new GitHub repository (replace USERNAME and REPO with yours)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push code to GitHub
git push -u origin main
```

---

## 🌐 How to Make It Live Online (Free in 2 Minutes)

Once your code is on GitHub, you can host it live on the web for free with automatic SSL:

### Option A: Vercel (Recommended — 1-Click Deploy)
1. Go to [vercel.com](https://vercel.com) and click **Sign Up** using your GitHub account.
2. Click **Add New...** → **Project**.
3. Select your `soul-sanctum` repository from the list.
4. Vercel automatically detects **Vite**. Keep the default settings (`Build Command: npm run build`, `Output Directory: dist`).
5. Click **Deploy**.
6. Within 60 seconds, your application will be live at `https://your-app-name.vercel.app`! Every time you push changes to GitHub, Vercel updates the live website automatically.

### Option B: Netlify
1. Go to [netlify.com](https://www.netlify.com) and log in with GitHub.
2. Click **Add new site** → **Import an existing project**.
3. Choose your GitHub repository.
4. Set Build command to `npm run build` and Publish directory to `dist`.
5. Click **Deploy Site**.

### Option C: GitHub Pages
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under "Build and deployment", select **GitHub Actions**.
3. Choose the static Vite deployment action to deploy automatically on every push.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Icons
- **Audio Engine**: Web Speech Synthesis API (calibrated for Ava Grace & Microsoft David)
- **Zero Database Setup Needed**: Pure client-side application with localStorage persistence.
