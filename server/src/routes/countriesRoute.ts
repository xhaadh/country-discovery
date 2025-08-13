import express from "express";
import {
  getAllCountries,
  searchCountries,
  getCountriesByRegion,
  getCountryByCode
} from "../controllers/contriesController";

const router = express.Router();

router.get("/", getAllCountries);
router.get("/search", searchCountries);
router.get("/region/:region", getCountriesByRegion);
router.get("/:code", getCountryByCode);
export default router;