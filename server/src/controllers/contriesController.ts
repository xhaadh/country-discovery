// server/src/controllers/countriesController.ts
import * as rc from "../services/restCountries";
import { Request, Response } from "express";

export const getAllCountries = async (req: Request, res: Response) => {
  const { page, limit, name, capital, region, timezone, fields } = req.query;
  
  try {
    const result = await rc.searchCountries({
      name: typeof name === "string" ? name : undefined,
      capital: typeof capital === "string" ? capital : undefined,
      region: typeof region === "string" ? region : undefined,
      timezone: typeof timezone === "string" ? timezone : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      fields: typeof fields === "string" ? fields : undefined
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchCountries = async (req: Request, res: Response) => {
  const { name, capital, region, timezone, page, limit, fields } = req.query;
  
  try {
    const result = await rc.searchCountries({
      name: typeof name === "string" ? name : undefined,
      capital: typeof capital === "string" ? capital : undefined,
      region: typeof region === "string" ? region : undefined,
      timezone: typeof timezone === "string" ? timezone : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      fields: typeof fields === "string" ? fields : undefined
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCountriesByRegion = async (req: Request, res: Response) => {
  const region = req.params.region;
  const { page, limit, fields } = req.query;
  
  try {
    const result = await rc.searchCountries({
      region,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      fields: typeof fields === "string" ? fields : undefined
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCountryByCode = async (req: Request, res: Response) => {
  const code = req.params.code;
  
  try {
    const item = await rc.fetchCountryByCode(code);
    if (!item) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};