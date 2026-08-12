import type { Request } from "express";

/**
 * Best-effort client identifier for rate limiting ONLY. This is not
 * authentication, not a security boundary, and not a strong anti-abuse
 * mechanism — see the tradeoff note below.
 *
 * UNVERIFIED PRODUCTION FACT: we do not yet know how many reverse-proxy
 * hops sit between the public internet and this process on Replit, nor
 * whether Replit's proxy appends the real visitor address to
 * `X-Forwarded-For` (standard behavior for nginx-style proxies) or does
 * something else. Because of that, we deliberately do NOT call
 * `app.set('trust proxy', ...)` anywhere (that would apply the assumption
 * globally, to things far beyond rate limiting) and we deliberately do NOT
 * treat `X-Forwarded-For` as a verified, trusted value.
 *
 * Current choice and its tradeoff:
 * - If `X-Forwarded-For` is present, we take the LAST comma-separated
 *   entry. That's the entry a single well-behaved reverse proxy appends
 *   itself (proxies conventionally APPEND their observed peer rather than
 *   overwrite the header), so if Replit's setup matches the common case,
 *   this is the real visitor address. If it doesn't match — e.g. more than
 *   one hop, or a proxy that passes the header through untouched — this
 *   value can be attacker-supplied.
 * - If the header is absent, we fall back to the raw socket peer address.
 *
 * We accept that this can be spoofed by a client sophisticated enough to
 * script custom headers (not by an ordinary browser — real browsers never
 * send `X-Forwarded-For` themselves). We accept that risk deliberately:
 * for a low-volume public contact form, a scripted actor evading a 5-per-
 * 10-minute limit is a far smaller problem than the alternative failure
 * mode — relying only on the raw socket address, which behind a shared
 * proxy resolves to the SAME value for every visitor and would collapse
 * the entire site's traffic into one shared rate-limit bucket (exactly the
 * bug this replaces).
 *
 * ACTION NEEDED AFTER DEPLOYMENT: confirm, from the live Replit
 * deployment, (a) whether `X-Forwarded-For` is set at all, and (b) whether
 * its last entry is genuinely the visitor's address (e.g. by comparing it
 * against a known test client's real IP). If Replit exposes a more
 * specific trusted header (e.g. something proxy-injected that clients
 * cannot set), prefer that here instead. This is the ONLY place in the
 * codebase that needs to change once that fact is known.
 */
export function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers["x-forwarded-for"];
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

  if (forwardedValue) {
    const segments = forwardedValue.split(",").map((s) => s.trim()).filter(Boolean);
    const last = segments.at(-1);
    if (last) return last;
  }

  return req.socket.remoteAddress ?? "unknown";
}
