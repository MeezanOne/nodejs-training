import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  // new async connect method
  await client.connect("mongodb://127.0.0.1:27017");
  db = client.database("deno");
}

export function getDb(): Database {
  return db;
}
