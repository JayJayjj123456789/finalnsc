import { useState, useCallback } from "react";
import type { PlanRequest, PlanResponse } from "../types";
import { planTrip } from "../services/api";

interface UsePlanReturn {
  result: PlanResponse | null; loading: boolean; error: string | null;
  submitPlan: (req: PlanRequest) => Promise<void>; reset: () => void;
}

const ERROR_MSG = "เกิดข้อผิดพลาด กรุณาลองใหม่";

export function usePlan(): UsePlanReturn {
  const [result, setResult] = useState<PlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPlan = useCallback(async (req: PlanRequest) => {
    setLoading(true); setError(null); setResult(null);
    try { const res = await planTrip(req); setResult(res); }
    catch (err: any) {
      const msg = err?.response?.data?.detail || err?.message || ERROR_MSG;
      setError(msg);
    } finally { setLoading(false); }
  }, []);

  const reset = useCallback(() => {
    setResult(null); setLoading(false); setError(null);
  }, []);

  return { result, loading, error, submitPlan, reset };
}