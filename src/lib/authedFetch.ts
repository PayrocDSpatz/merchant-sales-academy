import { auth } from "./firebase";

// POSTs JSON to one of our paid API routes with the signed-in user's Firebase
// ID token, which the route checks (see lib/apiGuard.ts).
export async function authedPost(url: string, body: unknown) {
  const token = await auth.currentUser?.getIdToken();
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
}
