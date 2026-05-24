from typing import List, Dict, Any


class FallbackDataService:
    def get_all_attractions(self) -> List[Dict]:
        return [
            {
                "id": "khao-yai-national-park",
                "name": "Khao Yai National Park",
                "name_th": "อุทยานแห่งชาติเขาใหญ่",
                "category": "nature",
                "description": "UNESCO World Heritage national park, third largest in Thailand",
                "opening_hours": "06:00-18:00",
                "entry_fee": 400,
                "duration_minutes": 360,
                "location": {"lat": 14.4397, "lng": 101.3716, "address": "Khao Yai"},
                "community_owned": False
            },
            {
                "id": "haew-narok-waterfall",
                "name": "Haew Narok Waterfall",
                "name_th": "น้ำตกห้วยนราก",
                "category": "nature",
                "description": "Largest waterfall in Khao Yai, over 80 meters high",
                "opening_hours": "06:00-17:30",
                "entry_fee": 400,
                "duration_minutes": 180,
                "location": {"lat": 14.2947, "lng": 101.4172, "address": "Khao Yai"},
                "community_owned": True
            },
            {
                "id": "haew-suwat-waterfall",
                "name": "Haew Suwat Waterfall",
                "name_th": "น้ำตกห้วยสุวรรณ",
                "category": "nature",
                "description": "Famous waterfall featured in the movie The Beach",
                "opening_hours": "06:00-18:00",
                "entry_fee": 400,
                "duration_minutes": 150,
                "location": {"lat": 14.3817, "lng": 101.3850, "address": "Khao Yai"},
                "community_owned": True
            },
            {
                "id": "khao-yai-viewpoint",
                "name": "Khao Yai Viewpoint",
                "name_th": "จุดชมวิวเขาใหญ่",
                "category": "nature",
                "description": "Scenic viewpoint overlooking the national park",
                "opening_hours": "05:00-19:00",
                "entry_fee": 0,
                "duration_minutes": 90,
                "location": {"lat": 14.4500, "lng": 101.3600, "address": "Khao Yai"},
                "community_owned": True
            },
            {
                "id": "wat-phra-yai",
                "name": "Wat Phra Yai Khao Yai",
                "name_th": "วัดไผ่พระพุทธรูปยืน พระใหญ่เขาใหญ่",
                "category": "culture",
                "description": "Large standing Buddha statue, over 50 meters",
                "opening_hours": "07:00-18:00",
                "entry_fee": 0,
                "duration_minutes": 90,
                "location": {"lat": 14.4380, "lng": 101.3800, "address": "Khao Yai"},
                "community_owned": True
            },
            {
                "id": "korat-zoo",
                "name": "Nakhon Ratchasima Zoo",
                "name_th": "สวนสัตว์นครราชสีมา",
                "category": "nature",
                "description": "Large zoo with many animal species",
                "opening_hours": "08:00-18:00",
                "entry_fee": 150,
                "duration_minutes": 240,
                "location": {"lat": 14.9200, "lng": 102.0500, "address": "Nakhon Ratchasima"},
                "community_owned": False
            },
            {
                "id": "wat-nong-wang",
                "name": "Wat Nong Wang",
                "name_th": "วัดหนองหงส์",
                "category": "culture",
                "description": "Temple with 9-spired pagoda, 127m tall, 360-degree view",
                "opening_hours": "06:00-20:00",
                "entry_fee": 0,
                "duration_minutes": 120,
                "location": {"lat": 14.9700, "lng": 102.1000, "address": "Nakhon Ratchasima"},
                "community_owned": True
            },
            {
                "id": "prasart-museum",
                "name": "Prasart Museum",
                "name_th": "พิพิธภัณฑ์ปราสาท",
                "category": "culture",
                "description": "Private museum with 300+ year old antiques",
                "opening_hours": "09:00-17:00",
                "entry_fee": 200,
                "duration_minutes": 120,
                "location": {"lat": 14.9100, "lng": 102.0600, "address": "Nakhon Ratchasima"},
                "community_owned": True
            },
            {
                "id": "chiangkan-valley",
                "name": "Chiangkan Valley",
                "name_th": "หุบเขาชี้เชียงคาน",
                "category": "nature",
                "description": "Beautiful valley with cool weather and flower fields",
                "opening_hours": "06:00-18:00",
                "entry_fee": 0,
                "duration_minutes": 180,
                "location": {"lat": 15.1300, "lng": 101.6200, "address": "Chiangkan"},
                "community_owned": True
            },
            {
                "id": "pakchong-ranch",
                "name": "Pakchong Organic Farm",
                "name_th": "ไร่อินทรีย์ปากช่อง",
                "category": "nature",
                "description": "Organic farming community, sustainable agriculture",
                "opening_hours": "08:00-17:00",
                "entry_fee": 50,
                "duration_minutes": 120,
                "location": {"lat": 14.9800, "lng": 101.6800, "address": "Pakchong"},
                "community_owned": True
            },
            {
                "id": "khao-lampang",
                "name": "Khao Lampang Viewpoint",
                "name_th": "เขาลำภารา",
                "category": "nature",
                "description": "Best sunrise viewpoint in Isan region",
                "opening_hours": "04:00-10:00",
                "entry_fee": 0,
                "duration_minutes": 240,
                "location": {"lat": 15.0500, "lng": 101.7500, "address": "Nakhon Ratchasima"},
                "community_owned": True
            },
            {
                "id": "phimai-historical-park",
                "name": "Phimai Historical Park",
                "name_th": "อุทยานประวัติศาสตร์พิมาย",
                "category": "culture",
                "description": "Ancient Khmer temple complex, similar to Angkor Wat",
                "opening_hours": "07:30-18:00",
                "entry_fee": 100,
                "duration_minutes": 180,
                "location": {"lat": 15.2200, "lng": 102.4900, "address": "Phimai"},
                "community_owned": False
            },
            {
                "id": "tham-tanot",
                "name": "Tham Tanot Cave",
                "name_th": "ถ้ำตะโนท",
                "category": "nature",
                "description": "Beautiful cave with underground river",
                "opening_hours": "08:00-16:00",
                "entry_fee": 30,
                "duration_minutes": 90,
                "location": {"lat": 14.8500, "lng": 101.8500, "address": "Nakhon Ratchasima"},
                "community_owned": True
            },
            {
                "id": "pa-sak-dam",
                "name": "Pa Sak Cholasit Dam",
                "name_th": "เขื่อนป่าสักชลสิทธิ์",
                "category": "nature",
                "description": "Large dam with scenic views and water activities",
                "opening_hours": "06:00-18:00",
                "entry_fee": 0,
                "duration_minutes": 120,
                "location": {"lat": 14.8600, "lng": 101.0300, "address": "Lopburi border"},
                "community_owned": False
            },
            {
                "id": "korat-night-bazaar",
                "name": "Korat Night Bazaar",
                "name_th": "ไนท์บาซาร์โคราช",
                "category": "food",
                "description": "Famous night market with local food and shopping",
                "opening_hours": "17:00-23:00",
                "entry_fee": 0,
                "duration_minutes": 120,
                "location": {"lat": 14.9750, "lng": 102.0750, "address": "Nakhon Ratchasima"},
                "community_owned": True
            },
        ]

    def get_all_accommodations(self) -> List[Dict]:
        return [
            {
                "id": "khao-yai-green-home",
                "name": "Khao Yai Green Home",
                "name_th": "บ้านเขาใหญ่กรีนโฮม",
                "type": "homestay",
                "price_per_night": 1200,
                "rating": 4.6,
                "location": {"lat": 14.4250, "lng": 101.3650},
                "community_owned": True
            },
            {
                "id": "mountain-pine-homestay",
                "name": "Mountain Pine Homestay",
                "name_th": "เมาเทนไพน์ โฮมสเตย์",
                "type": "homestay",
                "price_per_night": 950,
                "rating": 4.4,
                "location": {"lat": 14.4100, "lng": 101.3700},
                "community_owned": True
            },
            {
                "id": "rice-homestay-pakchong",
                "name": "Rice Field Homestay Pakchong",
                "name_th": "ไร่ข้าว โฮมสเตย์ ปากช่อง",
                "type": "homestay",
                "price_per_night": 700,
                "rating": 4.7,
                "location": {"lat": 14.9800, "lng": 101.6900},
                "community_owned": True
            },
            {
                "id": "hostel-korat",
                "name": "Korat Backpacker Hostel",
                "name_th": "โคราช แบ็คแพ็คเกอร์ โฮสเทล",
                "type": "hostel",
                "price_per_night": 350,
                "rating": 4.0,
                "location": {"lat": 14.9750, "lng": 102.0750},
                "community_owned": True
            },
            {
                "id": "tara-park-khao-yai",
                "name": "Tara Park Hotel Khao Yai",
                "name_th": "ทาราพาร์ค โฮเต็ล เขาใหญ่",
                "type": "hotel",
                "price_per_night": 2200,
                "rating": 4.2,
                "location": {"lat": 14.4350, "lng": 101.3800},
                "community_owned": False
            },
            {
                "id": "the-patio-hotel-korat",
                "name": "The Patio Hotel Korat",
                "name_th": "เดอะ พาเทียโอ โฮเต็ล โคราช",
                "type": "hotel",
                "price_per_night": 1800,
                "rating": 4.3,
                "location": {"lat": 14.9700, "lng": 102.0800},
                "community_owned": False
            },
            {
                "id": "novotel-khao-yai",
                "name": "Novotel Khao Yai Resort",
                "name_th": "โนโวเทล เขาใหญ่ รีสอร์ท",
                "type": "resort",
                "price_per_night": 4500,
                "rating": 4.5,
                "location": {"lat": 14.4400, "lng": 101.3750},
                "community_owned": False
            },
        ]

    def get_all_restaurants(self) -> List[Dict]:
        return [
            {
                "id": "khao-mankai-pakchong",
                "name": "Khao Mankai Pakchong",
                "name_th": "ข้าวมันไก่ปากช่อง ตำนานกว่า 50 ปี",
                "cuisine": "thai",
                "average_cost": 60,
                "rating": 4.6,
                "location": {"lat": 14.9750, "lng": 101.6850},
                "community_owned": True
            },
            {
                "id": "somtam-pakchong",
                "name": "Somtam Pakchong",
                "name_th": "ส้มตำปากช่อง ใต้ต้นมะขาม",
                "cuisine": "thai",
                "average_cost": 120,
                "rating": 4.5,
                "location": {"lat": 14.9780, "lng": 101.6820},
                "community_owned": True
            },
            {
                "id": "khao-soi-chiangkan",
                "name": "Khao Soi Chiangkan",
                "name_th": "ข้าวซอยเชียงคาน ร้านดัง",
                "cuisine": "thai",
                "average_cost": 80,
                "rating": 4.7,
                "location": {"lat": 15.1200, "lng": 101.6250},
                "community_owned": True
            },
            {
                "id": "ran-thip-korat",
                "name": "Ran Thip Korat",
                "name_th": "ร้านทิพย์ เสาเขาวง",
                "cuisine": "thai",
                "average_cost": 150,
                "rating": 4.5,
                "location": {"lat": 14.9550, "lng": 102.0900},
                "community_owned": True
            },
            {
                "id": "halal-korat",
                "name": "Muslim Food Korat",
                "name_th": "อาหารมุสลิม โคราช",
                "cuisine": "halal",
                "average_cost": 100,
                "rating": 4.3,
                "location": {"lat": 14.9650, "lng": 102.0700},
                "community_owned": True
            },
            {
                "id": "khao-yai-steakhouse",
                "name": "Khao Yai Steakhouse",
                "name_th": "ร้านสเต็กเขาใหญ่",
                "cuisine": "western",
                "average_cost": 400,
                "rating": 4.3,
                "location": {"lat": 14.4370, "lng": 101.3780},
                "community_owned": False
            },
            {
                "id": "pizza-khao-yai",
                "name": "Pizza & Pasta Khao Yai",
                "name_th": "พิซซ่าแอนด์พาสต้า เขาใหญ่",
                "cuisine": "italian",
                "average_cost": 350,
                "rating": 4.2,
                "location": {"lat": 14.4360, "lng": 101.3790},
                "community_owned": False
            },
            {
                "id": "cafe-korat-central",
                "name": "Cafe Central Korat",
                "name_th": "คาเฟ่เซ็นทรัล โคราช",
                "cuisine": "cafe",
                "average_cost": 150,
                "rating": 4.1,
                "location": {"lat": 14.9850, "lng": 102.0850},
                "community_owned": False
            },
        ]

    def get_all_prices(self) -> Dict[str, Any]:
        return {
            "accommodation": {
                "hotel": {"min": 1000, "max": 5000, "avg": 2500},
                "homestay": {"min": 400, "max": 1500, "avg": 800},
                "resort": {"min": 2000, "max": 10000, "avg": 4000},
                "hostel": {"min": 200, "max": 600, "avg": 350}
            },
            "food": {
                "street_food": {"min": 30, "max": 100, "avg": 60},
                "local_restaurant": {"min": 100, "max": 300, "avg": 180},
                "cafe": {"min": 80, "max": 200, "avg": 120}
            },
            "transport": {
                "car": {"per_km": 3.5},
                "bus": {"per_km": 0.5},
                "train": {"per_km": 0.3}
            },
            "activities": {
                "nature": {"min": 0, "max": 500, "avg": 200},
                "culture": {"min": 0, "max": 300, "avg": 100},
                "activity": {"min": 200, "max": 1000, "avg": 500}
            }
        }
