import "https://deno.land/x/dotenv/load.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.21.0/src/client.ts";

class DB {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  connect() {
    const client = new MongoClient();
    client.connect(this.url);
    this.client = client;
  }
  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const dbName = Deno.env.get("DATABASE_NAME") || "deno_todo";
const dbUrl = Deno.env.get("DATABASE_URL") || "mongodb://localhost:27017";

const db = new DB(dbName, dbUrl);
db.connect();

export default db;
