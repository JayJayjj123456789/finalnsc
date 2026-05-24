import os
BASE = 'E:/finalnsc/smart-travel-planner/frontend/src'

def w(rel, content):
    full = os.path.join(BASE, rel)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    print('OK', rel)

# ── Mock Data ──
w('services/mockData.ts', """import type { PlanResponse } from "../types";

const MOCK_RESPONSES = {
  "default": {
    query: "",
    generated_at: new Date().toISOString(),
    routes: [
      {
        name: "เส้นทางประหยัด ปางสะดึง-ดอยอินทนนท์",
        score: 87,
        days: 3,
        total_cost: 4200,
        co2_kg: 12.4,
        community_percentage: 72,
        carbon_saved_pct: 35,
        highlights: ["ธรรมชาติ", "วิวภูเขา", "ชุมชนท้องถิ่น", "ราคาประหยัด"],
        days_detail: [
          {
            day: 1, day_cost: 1500,
            activities: [
              { name: "ตลาดปางสะดึง", lat: 19.347, lng: 98.432, type: "ตลาด", duration_min: 90, cost_baht: 200 },
              { name: "น้ำตกแม่สอย", lat: 19.412, lng: 98.501, type: "ธรรมชาติ", duration_min: 120, cost_baht: 100 },
              { name: "อุทยานแห่งชาติดอยอินทนนท์", lat: 19.503, lng: 98.588, type: "อุทยาน", duration_min: 180, cost_baht: 300 },
              { name: "จุดชมวิว กม.42", lat: 19.487, lng: 98.612, type: "จุดชมวิว", duration_min: 60, cost_baht: 0 },
              { name: "โฮมสเตย์บ้านนา", lat: 19.450, lng: 98.550, type: "ที่พัก", duration_min: 0, cost_baht: 900 },
            ]
          },
          {
            day: 2, day_cost: 1400,
            activities: [
              { name: "ดอยอินทนนท์ยอดสูง", lat: 19.520, lng: 98.630, type: "ธรรมชาติ", duration_min: 240, cost_baht: 500 },
              { name: "สะพานควายแดง ฟาร์มชุมชน", lat: 19.398, lng: 98.520, type: "ชุมชน", duration_min: 90, cost_baht: 150 },
              { name: "วัดศรีสังวาลย์", lat: 19.450, lng: 98.480, type: "วัด", duration_min: 60, cost_baht: 0 },
              { name: "บ่อเกลือสมุทรไทย", lat: 19.420, lng: 98.505, type: "ประวัติศาสตร์", duration_min: 45, cost_baht: 50 },
              { name: "ร้านปลาแม่น้ำ", lat: 19.440, lng: 98.495, type: "ร้านอาหาร", duration_min: 60, cost_baht: 200 },
              { name: "โฮมสเตย์ปางสะดึง", lat: 19.347, lng: 98.432, type: "ที่พัก", duration_min: 0, cost_baht: 500 },
            ]
          },
          {
            day: 3, day_cost: 1300,
            activities: [
              { name: "น้ำตกแม่กลาง", lat: 19.380, lng: 98.460, type: "ธรรมชาติ", duration_min: 120, cost_baht: 100 },
              { name: "ไร่ชา 100 ปี", lat: 19.365, lng: 98.445, type: "ไร่/ฟาร์ม", duration_min: 90, cost_baht: 200 },
              { name: "ตลาดผ้าทอม้ง", lat: 19.340, lng: 98.425, type: "ตลาด", duration_min: 60, cost_baht: 300 },
              { name: "เดินทางกลับเชียงใหม่", lat: 18.788, lng: 98.985, type: "เดินทาง", duration_min: 180, cost_baht: 700 },
            ]
          },
        ]
      },
      {
        name: "เส้นทางหรู รีสอร์ทดอยอินทนนท์ + สปา",
        score: 74,
        days: 3,
        total_cost: 8900,
        co2_kg: 18.7,
        community_percentage: 45,
        carbon_saved_pct: 15,
        highlights: ["หรูหรา", "สปา", "วิวสวย", "สะดวกสบาย"],
        days_detail: [
          {
            day: 1, day_cost: 3200,
            activities: [
              { name: "เช็คอินรีสอร์ทดอยอินทนนท์", lat: 19.480, lng: 98.570, type: "ที่พัก", duration_min: 0, cost_baht: 2500 },
              { name: "ดินเนอร์ 5 ดาวภูเขา", lat: 19.482, lng: 98.572, type: "ร้านอาหาร", duration_min: 90, cost_baht: 700 },
            ]
          },
          {
            day: 2, day_cost: 3500,
            activities: [
              { name: "สปาภูเขา", lat: 19.480, lng: 98.570, type: "สปา", duration_min: 120, cost_baht: 1500 },
              { name: "ดอยอินทนนท์ Guided Tour", lat: 19.520, lng: 98.630, type: "ธรรมชาติ", duration_min: 300, cost_baht: 800 },
              { name: "เวิกร็อบคลื่นเงาะ", lat: 19.482, lng: 98.572, type: "ร้านอาหาร", duration_min: 60, cost_baht: 1200 },
            ]
          },
          {
            day: 3, day_cost: 2200,
            activities: [
              { name: "พูลยาโอย", lat: 19.480, lng: 98.570, type: "สระว่ายน้ำ", duration_min: 60, cost_baht: 0 },
              { name: "อาหารกลางวันภูเขา", lat: 19.482, lng: 98.572, type: "ร้านอาหาร", duration_min: 60, cost_baht: 600 },
              { name: "เช็คเอาท์ + เดินทางกลับ", lat: 18.788, lng: 98.985, type: "เดินทาง", duration_min: 240, cost_baht: 1600 },
            ]
          },
        ]
      },
      {
        name: "เส้นทาง Backpacker ปางสะดึง Loop",
        score: 79,
        days: 3,
        total_cost: 2800,
        co2_kg: 10.1,
        community_percentage: 85,
        carbon_saved_pct: 42,
        highlights: ["ประหยัดสุด", "ผจญภัย", "ชุมชน", "Eco-friendly"],
        days_detail: [
          {
            day: 1, day_cost: 900,
            activities: [
              { name: "ตลาดปางสะดึงเช้า", lat: 19.347, lng: 98.432, type: "ตลาด", duration_min: 60, cost_baht: 100 },
              { name: "เต็นท์ริมลำธาร", lat: 19.400, lng: 98.470, type: "ที่พัก", duration_min: 0, cost_baht: 300 },
              { name: "เดินป่าดอยล้าน", lat: 19.430, lng: 98.490, type: "ธรรมชาติ", duration_min: 180, cost_baht: 0 },
              { name: "ทำอาหารกับชาวบ้าน", lat: 19.410, lng: 98.475, type: "ชุมชน", duration_min: 120, cost_baht: 150 },
              { name: "กาแฟแฟร์เทรด", lat: 19.395, lng: 98.465, type: "คาเฟ่", duration_min: 30, cost_baht: 100 },
              { name: "ตลาดกลางคืน", lat: 19.347, lng: 98.432, type: "ตลาด", duration_min: 60, cost_baht: 250 },
            ]
          },
          {
            day: 2, day_cost: 1000,
            activities: [
              { name: "ฝึกทำขนมปัง", lat: 19.350, lng: 98.435, type: "ชุมชน", duration_min: 90, cost_baht: 100 },
              { name: "ปั่นจักรยานหมู่บ้าน", lat: 19.360, lng: 98.440, type: "กีฬา", duration_min: 120, cost_baht: 50 },
              { name: "น้ำตกมายมูล", lat: 19.420, lng: 98.510, type: "ธรรมชาติ", duration_min: 90, cost_baht: 100 },
              { name: "โฮมสเตย์ชาวกะเหรี่ยง", lat: 19.405, lng: 98.480, type: "ที่พัก", duration_min: 0, cost_baht: 400 },
              { name: "อาหารค่ำชุมชน", lat: 19.405, lng: 98.480, type: "ร้านอาหาร", duration_min: 60, cost_baht: 150 },
              { name: "ดนตรีพื้นบ้าน", lat: 19.410, lng: 98.475, type: "ชุมชน", duration_min: 90, cost_baht: 0 },
              { name: "ตลาดนัดสัปดาห์", lat: 19.340, lng: 98.425, type: "ตลาด", duration_min: 60, cost_baht: 200 },
            ]
          },
          {
            day: 3, day_cost: 900,
            activities: [
              { name: "หมอลำ", lat: 19.347, lng: 98.432, type: "ศิลปะ", duration_min: 60, cost_baht: 50 },
              { name: "วัดเจดีย์หลวง", lat: 19.450, lng: 98.480, type: "วัด", duration_min: 45, cost_baht: 0 },
              { name: "ข้าวซอยใบชา", lat: 19.440, lng: 98.495, type: "ร้านอาหาร", duration_min: 45, cost_baht: 150 },
              { name: "รถกลับเชียงใหม่", lat: 18.788, lng: 98.985, type: "เดินทาง", duration_min: 180, cost_baht: 700 },
            ]
          },
        ]
      },
    ]
  }
};

export function getMockResponse(query) {
  var response = JSON.parse(JSON.stringify(MOCK_RESPONSES["default"]));
  response.query = query;
  response.generated_at = new Date().toISOString();
  return new Promise(function(resolve) {
    setTimeout(function() { resolve(response); }, 2500);
  });
}
""")

# Updated api.ts
w('services/api.ts', """import axios from "axios";
import type { PlanRequest, PlanResponse } from "../types";
import { getMockResponse } from "./mockData";

const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:8000";
const USE_MOCK = true;

const api = axios.create({
  baseURL: API_BASE, timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export async function planTrip(request: PlanRequest): Promise<PlanResponse> {
  if (USE_MOCK) return getMockResponse(request.query);
  const { data } = await api.post<PlanResponse>("/api/plan", request);
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
""")

print('All mock files created!')