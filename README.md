<h1 align="center">Briefify - Micro-SaaS AI</h1>

<p align="center">
  <strong>Transform long texts into consumable audio summaries in seconds.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/Stripe-6772E5?logo=stripe&logoColor=white" alt="Stripe Payments" />
  <img src="https://img.shields.io/badge/NextAuth.js-000000?logo=nextauth.js&logoColor=white" alt="NextAuth" />
  <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?logo=google&logoColor=white" alt="Gemini AI" />
</p>

---

## About the Project
Briefify is a comprehensive demonstration of a full-stack digital product. It is built to simulate real-world challenges encountered in SaaS environments, making it a perfect showcase of engineering capabilities.

It demonstrates proficiency in critical areas highly sought after by startups and fintechs:
- **Business Logic & Monetization:** Server-to-server integration with the Stripe API using Webhooks to securely validate and provision premium access.
- **Security & Authentication (OAuth 2.0):** Robust session management using NextAuth with Google and GitHub providers.
- **LLM Integration (Artificial Intelligence):** Integration with the Google Gemini API to orchestrate the processing and summarization of large text volumes.
- **Database Design:** Data modeling with Prisma ORM to manage users, sessions, and subscriptions efficiently.
- **Architecture & Clean Code:** Modular, componentized code focused on scalability (Next.js App Router) and styled with Vanilla CSS using design tokens, demonstrating a strong grasp of CSS fundamentals without relying on utility frameworks.

---

## Features

1. **Seamless Authentication** 
   - Login via Google or GitHub. We do not store passwords, delegating security responsibilities to mature OAuth providers.

2. **Paywall & Stripe Webhooks**
   - Free-tier users cannot consume the AI API and must upgrade their plan.
   - The Checkout routes users to the secure Stripe platform.
   - The backend actively listens to payment events (`checkout.session.completed` and `invoice.payment_succeeded`) via secure Webhooks (verified by cryptographic signature) to update the user's status in the database.

3. **AI-Powered Summarization**
   - Utilizes the **Gemini 2.5 Flash** model to condense articles of thousands of words into a digestible and conversational format.

4. **Native Text-to-Speech**
   - The application leverages the browser's native *Web Speech API* to synthesize the AI-generated text into natural audio, optimizing infrastructure costs without relying on paid third-party audio APIs.

---

## Technical Architecture

- **Frontend/Backend:** Next.js (App Router)
- **Database:** SQLite (Easily migratable to PostgreSQL via Prisma)
- **Styling:** Pure CSS with global variables (`globals.css`), focused on a Glassmorphism aesthetic, responsive UI, and micro-animations.
- **Code Standards:** ESLint, Prettier, TypeScript Strict Mode.

---

## How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/moisesz10/Briefify.git
cd Briefify
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and fill in the following keys:

```env
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_string_here"

# OAuth Providers (Get these from Google/GitHub developer consoles)
GOOGLE_ID="your_google_id"
GOOGLE_SECRET="your_google_secret"
GITHUB_ID="your_github_id"
GITHUB_SECRET="your_github_secret"

# Stripe (Get these from your Stripe Dashboard in "Test Mode")
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Gemini API
GEMINI_API_KEY="your_google_ai_studio_key"
```

### 4. Initialize the Database
```bash
npx prisma db push
npx prisma generate
```

### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Author

Created by [Moises](https://github.com/moisesz10). Feel free to reach out and explore my portfolio. Open to new software engineering opportunities!
