import { D1Database, KVNamespace } from '@cloudflare/workers-types';

interface CloudflareEnv {
  D1_DB: D1Database;
  KV_STORE: KVNamespace;
}

export class CloudflareClient {
  private env: CloudflareEnv;

  constructor(env: CloudflareEnv) {
    this.env = env;
  }

  // D1 Database methods
  async getUserData(userId: string) {
    return await this.env.D1_DB.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(userId).first();
  }

  async createUserProfile(userId: string, email: string) {
    return await this.env.D1_DB.prepare(
      'INSERT INTO users (id, email, created_at) VALUES (?, ?, ?)'
    ).bind(userId, email, new Date().toISOString()).run();
  }

  // KV Store methods
  async cacheUserPreferences(userId: string, preferences: any) {
    await this.env.KV_STORE.put(`user_prefs:${userId}`, JSON.stringify(preferences));
  }

  async getUserPreferences(userId: string) {
    const prefs = await this.env.KV_STORE.get(`user_prefs:${userId}`);
    return prefs ? JSON.parse(prefs) : null;
  }
} 