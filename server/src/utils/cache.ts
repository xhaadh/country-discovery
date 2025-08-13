import NodeCache from "node-cache";
import dotenv from "dotenv";
dotenv.config();

const ttl = Number(process.env.CACHE_TTL_SECONDS || 60 * 60 * 6);
export const cache = new NodeCache({ stdTTL: ttl, checkperiod: Math.max(60, Math.floor(ttl / 4)) });
