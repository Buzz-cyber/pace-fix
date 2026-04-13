import { MongoClient, ServerApiVersion } from 'mongodb';

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  // Connection pool: cache across hot reloads and serverless warm instances.
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export default getClientPromise;

// Helper function to get the database
export async function getDb() {
  const client = await getClientPromise();
  return client.db("pace-setter");
}

// Helper functions for collections
export async function getLikesCollection() {
  const db = await getDb();
  return db.collection("likes");
}

export async function getViewsCollection() {
  const db = await getDb();
  return db.collection("views");
}

// Custom Ad management collections
export async function getAdPositionsCollection() {
  const db = await getDb();
  return db.collection("ad_positions");
}

export async function getAdSlotsCollection() {
  const db = await getDb();
  return db.collection("ad_slots");
}

export async function getCustomAdsCollection() {
  const db = await getDb();
  return db.collection("custom_ads");
}

export async function getAdPlacementsCollection() {
  const db = await getDb();
  return db.collection("ad_placements");
}

export async function getAdPerformanceCollection() {
  const db = await getDb();
  return db.collection("ad_performance");
}

export async function getSearchLogsCollection() {
  const db = await getDb();
  return db.collection("search_logs");
}

export async function getCommentsCollection() {
  const db = await getDb();
  return db.collection("comments");
}

export async function getReactionsCollection() {
  const db = await getDb();
  return db.collection("reactions");
}
