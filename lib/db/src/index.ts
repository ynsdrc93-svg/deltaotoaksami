import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// node-postgres emits 'error' on the pool for problems on idle connections
// (e.g. the database becoming unreachable) that aren't tied to any specific
// in-flight query. An EventEmitter 'error' with no listener is fatal in
// Node — it crashes the whole process instead of just failing the request
// that happens to be running. Any in-flight query still rejects normally
// and is handled by the caller; this only stops idle-connection errors from
// taking the process down.
pool.on("error", (err) => {
  console.error("Postgres pool idle client error:", err.message);
});

export const db = drizzle(pool, { schema });

export * from "./schema";

// drizzle-orm query helpers, re-exported from this exact resolved instance.
// Consumers (e.g. api-server) must import these from here rather than from
// a bare "drizzle-orm" import — a workspace with multiple packages each
// depending on drizzle-orm can end up with two distinct peer-resolved
// copies in pnpm's store, which TypeScript treats as incompatible types
// even though they're the same version.
export { sql, lt } from "drizzle-orm";
