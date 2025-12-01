import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the publishable key from environment variables (with fallbacks)
let publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_Z3JhbmQteWV0aS01Mi5jbGVyay5hY2NvdW50cy5kZXYk'
if (!publishableKey) {
  const ls = localStorage.getItem('VITE_CLERK_PUBLISHABLE_KEY')
  if (ls) publishableKey = ls
}

if (!publishableKey) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey}>
    <App />
  </ClerkProvider>
);
