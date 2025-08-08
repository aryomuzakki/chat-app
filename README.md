# Chat App - Next JS, Clerk, Convex

## Requirement

- [ ] Clerk Account (add a new project manually)
- [ ] Convex Account (project can be created automatically with command below)

## Getting Started

1. Clone project `git clone https://github.com/aryomuzakki/chat-app.git chat-app`
2. Install dependencies `bun install`

### To run in development: 
1. Connect to your convex account  by running this command in cli: 

    ```bash
    bunx convex dev
    ```

    > you can connect existing project or auto create new one from the cli

    > CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL will be automatically created in .env.local

2. Go to clerk project dashboard, create a jwt templates > choose convex template, copy issuer url.
   > Don't change id name `convex`

3. Go to settings of your convex project dashboard, add environment variable `CLERK_JWT_ISSUER_DOMAIN` with issuer url as value
   
4. Go to convex settings, copy HTTP Actions URL in URL development credentials. 
   
   Then go to clerk project dashboard, create a webhook > paste the url, and add the path (eg. `https://convex-url-000.site/clerk-users-webhook`). Paste to or use the same path with `CLERK_WEBHOOK_PATH` in `./convex/http.ts` file.
   
   Choose user in subscribed events.

   Copy the signing secret.

5. Add additional clerk env:

    ```ini
    # get this from clerk env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxxxxxxx
    CLERK_SECRET_KEY=sk_xxxxxxxx
    # get this from clerk webhook signing secret
    CLERK_WEBHOOK_SECRET=whsec_xxxxxxxx

    # using a custom sign in page
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

    # get this from clerk jwt templates, issuer url
    NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://some-verb-00.clerk.accounts.dev
    ```

6. Run dev mode:
    ```bash
    bun run dev
    ```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
