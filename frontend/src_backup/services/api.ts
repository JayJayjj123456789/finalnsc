import axios from 'axios'
import type { TravelPlanResponse, TravelPreferences } from '../types'

const API_BASE = '/api'

export const api = {
  async createPlan(
    input: string,
    preferences?: TravelPreferences
  ): Promise<TravelPlanResponse> {
    const response = await axios.post<TravelPlanResponse>(`${API_BASE}/plan`, {
      input,
      preferences,
    })
    return response.data
  },

  async healthCheck(): Promise<{ status: string; version: string }> {
    const response = await axios.get(`${API_BASE}/health`)
    return response.data
  },

  async getAttractions(category?: string) {
    const params = category ? { category } : {}
    const response = await axios.get(`${API_BASE}/attractions`, { params })
    return response.data
  },
}
