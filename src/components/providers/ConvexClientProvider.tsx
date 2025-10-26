"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = typeof convexUrl === "string" && convexUrl.length > 0 ? new ConvexReactClient(convexUrl) : undefined;

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  // If the Convex URL is not provided, render a friendly warning instead of
  // throwing an unhandled runtime error. This is helpful in local dev when
  // the developer hasn't run `npx convex dev` or populated `.env.local` yet.
  if (!convex) {
    return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}>
        <>
          <div style={{ padding: 12, background: "#fff3cd", color: "#665c00" }}>
            Convex is not configured. To run this app locally, start the Convex
            dev server and set <code>NEXT_PUBLIC_CONVEX_URL</code> in
            <code>.env.local</code> (or add it to your environment). Run
            <code>npx convex dev</code> from the project root for local development.
          </div>
          {children}
        </>
      </ClerkProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
