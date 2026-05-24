import axios from "axios";
import type { PlanRequest, PlanResponse } from "../types";
import { getMockResponse } from "./mockData";

const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:8000";
const USE_MOCK = false;

const api = axios.create({
  baseURL: API_BASE, timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export async function planTrip(request: PlanRequest): Promise<PlanResponse> {
  if (USE_MOCK) return getMockResponse(request.query) as unknown as PlanResponse;
  const { data } = await api.post<PlanResponse>("/api/plan", { input: request.query });
  return data;
}

export async function healthCheck(): Promise<boolean> {
  try {
    if (USE_MOCK) return true;
    await api.get("/api/health");
    return true;
  } catch {
    return false;
  }
}
