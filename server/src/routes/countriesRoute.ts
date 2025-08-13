// server/src/routes/countriesRoute.ts
import express from "express";
import {
  getAllCountries,
  searchCountries,
  getCountriesByRegion,
  getCountryByCode
} from "../controllers/contriesController";

const router = express.Router();

/**
 * GET /countries
 * Query params:
 *   page, limit, name, capital, region, timezone, fields
 */
router.get("/", getAllCountries);

/**
 * GET /countries/search
 * Accepts name, capital, region, timezone, page, limit, fields
 */
router.get("/search", searchCountries);

/**
 * GET /countries/region/:region
 */
router.get("/region/:region", getCountriesByRegion);

/**
 * GET /countries/:code
 */
router.get("/:code", getCountryByCode);

export default router;