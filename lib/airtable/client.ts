import Airtable from "airtable"

// Created on first use, not at import, so `next build` works without the
// Airtable env vars and a missing key shows up when a query runs.
let base: ReturnType<Airtable["base"]> | undefined

export function getBase() {
  if (!base) {
    if (!process.env.AIRTABLE_API_KEY) {
      throw new Error("AIRTABLE_API_KEY is not set")
    }
    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error("AIRTABLE_BASE_ID is not set")
    }
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    base = airtable.base(process.env.AIRTABLE_BASE_ID)
  }
  return base
}

// Helper to get a table by its env var name
// Usage: getTable("AIRTABLE_MY_TABLE_ID")
export function getTable(envVarName: string) {
  const tableId = process.env[envVarName]
  if (!tableId) {
    throw new Error(`${envVarName} is not set in environment variables`)
  }
  return getBase()(tableId)
}
